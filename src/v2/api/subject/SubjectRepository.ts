import { Injectable } from '@nestjs/common';
import { Subject } from '@prisma/client';
import { QueryAllSubjectDTO } from './query/QueryAllSubjectDTO';
import { PrismaService } from '../../database/PrismaService';
import { DatabaseUtils } from '../utils/DatabaseUtils';
import { UpdateSubjectData } from './data/UpdateSubjectData';
import { CreateSubjectData } from './data/CreateSubjectData';

@Injectable()
export class SubjectRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  async find (name: string) {
    return this.prisma.subject.findFirst({
      where: {
        name,
      },
    });
  }

  async create ({ name }: CreateSubjectData) {
    return this.prisma.subject.create({
      data: {
        name,
      },
    });
  }

  async getOrCreate (name: string) {
    let subject = await this.find(name);
    if (!subject) {
      subject = await this.create({ name });
    }
    return subject;
  }

  async get (id: string) {
    return this.prisma.subject.findUnique({
      where: {
        id,
      },
      include: {
        disciplines: true,
      },
    });
  }

  async getAll (body: QueryAllSubjectDTO) {
    const search = DatabaseUtils.getSearch<Subject>(body, 'name');
    const page = DatabaseUtils.getPage(body);
    const sort = DatabaseUtils.getSort(body);
    const groupId = body.group;

    return this.prisma.subject.findMany({
      ...page,
      ...sort,
      where: {
        ...search,
        disciplines: {
          some: {
            groupId,
          },
        },
      },
    });
  }

  async getSubject (id: string) {
    return this.prisma.subject.findUnique({
      where: {
        id,
      },
    });
  }

  async update (id: string, data: UpdateSubjectData) {
    return this.prisma.subject.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        name: true,
      },
    });
  }

  async delete (id: string) {
    return this.prisma.subject.delete({
      where: {
        id,
      },
    });
  }

  countTeachers (subjectId: string) {
    return this.prisma.teacher.count({
      where: {
        disciplineTeachers: {
          some: {
            discipline: {
              subjectId,
            },
          },
        },
      },
    });
  }

  getTeachers (subjectId: string) {
    return this.prisma.teacher.findMany({
      where: {
        disciplineTeachers: {
          some: {
            discipline: {
              subjectId,
            },
          },
        },
      },
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
        avatar: true,
        disciplineTeachers: {
          include: {
            roles: true,
          },
        },
      },
    });
  }
}