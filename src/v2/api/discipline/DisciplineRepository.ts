import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateDisciplineDTO } from './dto/CreateDisciplineDTO';
import { UpdateDisciplineDTO } from './dto/UpdateDisciplineDTO';
import { Prisma } from '@prisma/client';

@Injectable()
export class DisciplineRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  async getDiscipline (id: string) {
    return this.prisma.discipline.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        group: true,
        subject: true,
        year: true,
        semester: true,
        isSelective: true,
        evaluatingSystem: true,
        resource: true,
      },
    });
  }

  async getGroup (id: string) {
    return this.prisma.group.findFirst({
      where: {
        disciplines: {
          some: {
            id,
          },
        },
      },
    });
  }

  async getUserSelective (disciplineId: string) {
    return this.prisma.student.findMany({
      where: {
        selectiveDisciplines: {
          some: {
            disciplineId,
          },
        },
      },
      select: {
        firstName: true,
        middleName: true,
        lastName: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            telegramId: true,
            avatar: true,
          },
        },
        group: true,
      },
    });
  }

  async getDisciplineTeachers (id: string) {
    return this.prisma.disciplineTeacher.findMany({
      where: {
        discipline: {
          id,
        },
      },
      select: {
        id: true,
        teacher: {
          select: {
            id: true,
            firstName: true,
            middleName: true,
            lastName: true,
            avatar: true,
          },
        },
        roles: {
          select: {
            role: true,
          },
        },
      },
    });
  }

  async find (where: CreateDisciplineDTO) {
    return this.prisma.discipline.findFirst({
      where,
    });
  }

  async create (data: CreateDisciplineDTO) {
    return this.prisma.discipline.create({
      data,
    });
  }

  async getOrCreate (data: CreateDisciplineDTO) {
    let discipline = await this.find(data);
    if (!discipline) {
      discipline = await this.create(data);
    }
    return discipline;
  }

  async update (id: string, data: UpdateDisciplineDTO) {
    return this.prisma.discipline.update({
      where: {
        id,
      },
      data,
    });
  }

  makeSelective (data: { studentId: string; disciplineId: string }) {
    return this.prisma.selectiveDiscipline.create({
      data,
    });
  }

  async findBy (data: Prisma.DisciplineFindFirstArgs) {
    return this.prisma.discipline.findFirst({
      ...data,
      include: {
        disciplineTypes: true,
        subject: true,
        group: true,
        disciplineTeachers: {
          include: {
            roles: true,
            teacher: true,
          }
        },
      },
    });
  }

  async findById (id: string) {
    return this.prisma.discipline.findFirst({
      where: {
        id,
      },
      include: {
        disciplineTypes: true,
        subject: true,
        group: true,
      },
    });
  }
}
