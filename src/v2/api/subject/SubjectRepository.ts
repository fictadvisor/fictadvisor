import { Injectable } from '@nestjs/common';
import { Subject } from '@prisma/client';
import { QueryAllDTO } from 'src/v2/utils/QueryAllDTO';
import { PrismaService } from '../../database/PrismaService';
import { DatabaseUtils } from '../utils/DatabaseUtils';
import { UpdateSubjectDTO } from './dto/UpdateSubjectDTO';

@Injectable()
export class SubjectRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async find(name: string) {
    return this.prisma.subject.findFirst({
      where: {
        name,
      },
    });
  }

  async create(name: string) {
    return this.prisma.subject.create({
      data: {
        name,
      },
    });
  }

  async getOrCreate(name: string) {
    let subject = await this.find(name);
    if (!subject) {
      subject = await this.create(name);
    }
    return subject;
  }

  async get(id: string) {
    return this.prisma.subject.findUnique({
      where: {
        id,
      },
      include: {
        disciplines: true,
      },
    });
  }

  async getAll(body: QueryAllDTO) {
    const search = DatabaseUtils.getSearch<Subject>(body, 'name');
    const page = DatabaseUtils.getPage(body);
    const sort = DatabaseUtils.getSort(body);

    return this.prisma.subject.findMany({
      ...page,
      ...sort,
      where: {
        ...search,
      },
    });
  }

  async getDisciplines(subjectId: string) {
    return this.prisma.discipline.findMany({
      where: {
        subjectId,
      },
      select: {
        id: true,
        isSelective: true,
        year: true,
        semester: true,
        subject: true,
        group: true,
        disciplineTeachers: {
          select: {
            id: true,
            teacher: true,
            roles: true,
          },
        },
      },
    });
  }

  async getSubject(id: string) {
    return this.prisma.subject.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdateSubjectDTO) {
    return this.prisma.subject.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.subject.delete({
      where: {
        id,
      },
    });
  }

  countTeachers(subjectId: string) {
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

  getTeachers(subjectId: string) {
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