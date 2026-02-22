import { Injectable } from '@nestjs/common';
import {
  QueryAllSubjectsDTO,
  CreateSubjectDTO,
  UpdateSubjectDTO,
} from '@fictadvisor/utils/requests';
import {
  MarkResponse,
  SubjectWithTeachersResponse,
  TeacherWithRolesAndCathedrasResponse,
} from '@fictadvisor/utils/responses';
import { PaginationUtil, PaginateArgs } from '../../../database/v2/pagination.util';
import { DatabaseUtils } from '../../../database/database.utils';
import { TeacherService } from '../../teacher/v2/teacher.service';
import { SubjectRepository } from '../../../database/v2/repositories/subject.repository';
import { TeacherRepository } from '../../../database/v2/repositories/teacher.repository';
import { QuestionType } from '@prisma-client/fictadvisor';
import { DbSubject } from '../../../database/v2/entities/subject.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { DbTeacher } from '../../../database/v2/entities/teacher.entity';
import { DbQuestion } from '../../../database/v2/entities/question.entity';
import { DbDisciplineTeacher } from '../../../database/v2/entities/discipline-teacher.entity';

@Injectable()
export class SubjectService {
  constructor (
    private subjectRepository: SubjectRepository,
    private teacherRepository: TeacherRepository,
    private teacherService : TeacherService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async getAll (body: QueryAllSubjectsDTO) {
    const search = DatabaseUtils.getSearch(body, 'name');
    const sort = DatabaseUtils.getSort(body, 'name');

    const data: PaginateArgs<'subject'> = {
      where: {
        ...search,
        disciplines: body.groupId ? {
          some: {
            groupId: body.groupId,
          },
        } : undefined,
      },
      ...sort,
    };
    const subjects = await PaginationUtil.paginate<'subject', DbSubject>(this.subjectRepository, body, data);

    const results = {
      data: [],
      pagination: subjects.pagination,
    };
    for (const subject of subjects.data) {
      const amount = await this.teacherRepository.count({
        disciplineTeachers: {
          some: {
            discipline: {
              subjectId: subject.id,
            },
          },
        },
      });

      results.data.push({
        id: subject.id,
        name: subject.name,
        amount,
      });
    }

    return results;
  }

  async get (id: string) {
    return await this.subjectRepository.findOne({ id });
  }

  async getTeachers (id: string): Promise<SubjectWithTeachersResponse> {
    const { name: subjectName } = await this.subjectRepository.findOne({ id });

    const dbTeachers = await this.teacherRepository.findMany({
      disciplineTeachers: {
        some: {
          discipline: {
            subjectId: id,
          },
        },
      },
    }, {
      disciplineTeachers: {
        include: {
          roles: {
            include: {
              disciplineType: true,
            },
          },
          questionAnswers: {
            where: {
              disciplineTeacher: {
                discipline: {
                  subjectId: id,
                },
              },
              question: {
                type: {
                  in: [QuestionType.SCALE, QuestionType.TOGGLE],
                },
              },
            },
            include: {
              question: true,
            },
          },
        },
      },
      cathedras: {
        include: {
          cathedra: true,
        },
      },
    });

    const teachers = [];
    for (const dbTeacher of dbTeachers) {
      const sortedQuestionsWithAnswers: DbQuestion[] = this.getSortedQuestionsWithAnswers(dbTeacher.disciplineTeachers);
      const marks = this.mapper.mapArray(sortedQuestionsWithAnswers, DbQuestion, MarkResponse);

      teachers.push({
        ...this.mapper.map(dbTeacher, DbTeacher, TeacherWithRolesAndCathedrasResponse),
        rating: this.teacherService.getRating(marks),
      });
    }

    return {
      subjectName,
      teachers,
    };
  }

  getSortedQuestionsWithAnswers (disciplineTeachers: DbDisciplineTeacher[]) {
    const sortedQuestions = [];
    for (const disciplineTeacher of disciplineTeachers) {
      for (const questionWithAnswer of disciplineTeacher.questionAnswers) {
        const { question, value } = questionWithAnswer;
        const sortedQuestion = sortedQuestions.find((q) => q.name === question.name);
        if (!sortedQuestion) {
          sortedQuestions.push({
            name: question.name,
            type: question.type,
            display: question.display,
            questionAnswers: [{
              value,
            }],
          });
        } else {
          sortedQuestion.questionAnswers.push({ value });
        }
      }
    }
    return sortedQuestions;
  }

  async create (body: CreateSubjectDTO) {
    return this.subjectRepository.create(body);
  }

  async update (id: string, body: UpdateSubjectDTO) {
    return this.subjectRepository.updateById(id, body);
  }

  async deleteSubject (id: string) {
    return await this.subjectRepository.deleteById(id);
  }
}
