import { Injectable } from '@nestjs/common';
import {
  QueryAllSubjectDTO,
  CreateSubjectDTO,
  UpdateSubjectDTO,
} from '@fictadvisor/utils/requests';
import { SubjectWithTeachersResponse } from '@fictadvisor/utils/responses';
import { DatabaseUtils } from '../../../database/DatabaseUtils';
import { TeacherMapper } from '../../../common/mappers/TeacherMapper';
import { QuestionMapper } from '../../../common/mappers/QuestionMapper';
import { TeacherService } from '../../teacher/v2/TeacherService';
import { DbTeacher } from '../../../database/v2/entities/DbTeacher';
import { DbDisciplineTeacherWithAnswers } from '../../../database/v2/entities/DbDisciplineTeacherWithAnswers';
import { SubjectRepository } from '../../../database/v2/repositories/SubjectRepository';
import { TeacherRepository } from '../../../database/v2/repositories/TeacherRepository';
import { Prisma, QuestionType, Subject } from '@prisma/client/fictadvisor';

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

    const data: Prisma.SubjectFindManyArgs = {
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
    const subjects = await DatabaseUtils.paginate<Subject>(this.subjectRepository, body, data);

    const results = {
      data: [],
      pagination: subjects.pagination,
    };
    for (const subject of subjects.data) {
      const amount = await this.teacherRepository.count({
        where: {
          disciplineTeachers: {
            some: {
              discipline: {
                subjectId: subject.id,
              },
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
    return await this.subjectRepository.findById(id);
  }

  async getTeachers (id: string): Promise<SubjectWithTeachersResponse> {
    const { name: subjectName } = await this.subjectRepository.findById(id);

    const dbTeachers = await this.teacherRepository.findMany({
      where: {
        disciplineTeachers: {
          some: {
            discipline: {
              subjectId: id,
            },
          },
        },
      },
      include: {
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
      },
    });

    const teachers = [];
    for (const dbTeacher of dbTeachers) {
      const sortedQuestionsWithAnswers = this.questionMapper.getSortedQuestionsWithAnswers(dbTeacher.disciplineTeachers as any as DbDisciplineTeacherWithAnswers[]);
      const marks = this.questionMapper.getMarks(sortedQuestionsWithAnswers);

      teachers.push({
        ...this.teacherMapper.getTeacherWithRolesAndCathedras(dbTeacher as DbTeacher),
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
