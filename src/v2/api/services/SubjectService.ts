import { Injectable } from '@nestjs/common';
import { SubjectRepository } from '../../database/repositories/SubjectRepository';
import { QueryAllSubjectDTO } from '../dtos/QueryAllSubjectDTO';
import { CreateSubjectDTO } from '../dtos/CreateSubjectDTO';
import { TeacherRepository } from '../../database/repositories/TeacherRepository';
import { Prisma, QuestionType, Subject } from '@prisma/client';
import { DatabaseUtils } from '../../database/DatabaseUtils';
import { UpdateSubjectDTO } from '../dtos/UpdateSubjectDTO';
import { TeacherMapper } from '../../mappers/TeacherMapper';
import { TeacherService } from './TeacherService';
import { DbTeacher } from '../../database/entities/DbTeacher';
import { QuestionMapper } from '../../mappers/QuestionMapper';
import { DbDisciplineTeacherWithAnswers } from '../../database/entities/DbDisciplineTeacherWithAnswers';

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
    const search = DatabaseUtils.getSearch<Subject>(body, 'name');
    const sort = DatabaseUtils.getSort(body, 'name');

    const data: Prisma.SubjectFindManyArgs = {
      where: {
        ...search,
        disciplines: body.group ? {
          some: {
            groupId: body.group,
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

  async getTeachers (id: string) {
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
            roles: true,
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
      },
    });

    const teachers = [];

    for (const dbTeacher of dbTeachers) {
      const sortedQuestionsWithAnswers = this.questionMapper.getSortedQuestionsWithAnswers(dbTeacher.disciplineTeachers as any as DbDisciplineTeacherWithAnswers[]);
      const marks = this.questionMapper.getMarks(sortedQuestionsWithAnswers);

      teachers.push({
        ...this.teacherMapper.getTeacherWithRoles(dbTeacher as DbTeacher),
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
    await this.subjectRepository.deleteById(id);
  }
}
