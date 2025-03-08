import { Injectable } from '@nestjs/common';
import {
  QueryAllSubjectDTO,
  CreateSubjectDTO,
  UpdateSubjectDTO,
} from '@fictadvisor/utils/requests';
import { SubjectWithTeachersResponse } from '@fictadvisor/utils/responses';
import { DatabaseUtils, PaginateArgs } from '../../../database/v2/database.utils';
import { TeacherMapper } from '../../../common/mappers/TeacherMapper';
import { QuestionMapper } from '../../../common/mappers/QuestionMapper';
import { TeacherService } from '../../teacher/v2/TeacherService';
import { SubjectRepository } from '../../../database/v2/repositories/SubjectRepository';
import { TeacherRepository } from '../../../database/v2/repositories/TeacherRepository';
import { QuestionType } from '@prisma/client/fictadvisor';
import { DbSubject } from '../../../database/v2/entities/DbSubject';

@Injectable()
export class SubjectService {
  constructor (
    private subjectRepository: SubjectRepository,
    private teacherRepository: TeacherRepository,
    private teacherMapper: TeacherMapper,
    private teacherService : TeacherService,
    private questionMapper: QuestionMapper,
  ) {}

  async getAll (body: QueryAllSubjectDTO) {
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
    const subjects = await DatabaseUtils.paginate<'subject', DbSubject>(this.subjectRepository, body, data);

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
      const sortedQuestionsWithAnswers = this.questionMapper.getSortedQuestionsWithAnswers(dbTeacher.disciplineTeachers);
      const marks = this.questionMapper.getMarks(sortedQuestionsWithAnswers);

      teachers.push({
        ...this.teacherMapper.getTeacherWithRolesAndCathedras(dbTeacher),
        rating: this.teacherService.getRating(marks),
      });
    }

    return {
      subjectName,
      teachers,
    };
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
