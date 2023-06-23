import { Injectable } from '@nestjs/common';
import { SubjectRepository } from '../../database/repositories/SubjectRepository';
import { QueryAllSubjectDTO } from '../dtos/QueryAllSubjectDTO';
import { CreateSubjectDTO } from '../dtos/CreateSubjectDTO';
import { TeacherRepository } from '../../database/repositories/TeacherRepository';
import { Prisma, Subject } from '@prisma/client';
import { DatabaseUtils } from '../../database/DatabaseUtils';
import { UpdateSubjectDTO } from '../dtos/UpdateSubjectDTO';
import { TeacherMapper } from '../../mappers/TeacherMapper';
import { TeacherService } from './TeacherService';

@Injectable()
export class SubjectService {
  constructor (
    private subjectRepository: SubjectRepository,
    private teacherRepository: TeacherRepository,
    private teacherMapper: TeacherMapper,
    private teacherService : TeacherService,
  ) {}

  async getAll (body: QueryAllSubjectDTO) {
    const search = DatabaseUtils.getSearch<Subject>(body, 'name');
    const page = DatabaseUtils.getPage(body);
    const sort = DatabaseUtils.getSort(body);

    const data: Prisma.SubjectFindManyArgs = {
      where: {
        ...search,
        disciplines: {
          some: {
            groupId: body.group,
          },
        },
      },
      ...page,
      ...sort,
    };
    const subjects = await this.subjectRepository.getAll(data);

    const results = [];
    for (const subject of subjects) {

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

      results.push({
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
    });

    const teachers = [];
    const data = {
      subjectId: id,
    };

    for (const dbTeacher of dbTeachers) {
      teachers.push({
        ...this.teacherMapper.getTeacherWithRoles(dbTeacher),
        rating: await this.teacherService.getRating(dbTeacher.id, data),
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
