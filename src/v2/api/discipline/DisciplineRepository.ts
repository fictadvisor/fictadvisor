import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateDisciplineDTO } from './dto/CreateDisciplineDTO';
import { UpdateDisciplineDTO } from './dto/UpdateDisciplineDTO';

@Injectable()
export class DisciplineRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async get(id: string) {
    return this.prisma.discipline.findUnique({
      where: {
        id,
      },
      include: {
        group: true,
        disciplineTypes: true,
        selectiveDisciplines: true,
        subject: true,
        disciplineTeachers: true,
      },
    });
  }

  async getDiscipline(id: string) {
    const discipline = await this.get(id);
    delete discipline.group;
    delete discipline.subject;
    delete discipline.disciplineTypes;
    delete discipline.selectiveDisciplines;
    delete discipline.disciplineTeachers;
    return discipline;
  }

  async getSubject(id: string) {
    return this.prisma.subject.findFirst({
      where: {
        disciplines: {
          some: {
            id,
          },
        },
      },
    });
  }

  async getGroup(id: string) {
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

  async getTypes(id: string) {
    return this.prisma.disciplineType.findMany({
      where: {
        discipline: {
          id,
        },
      },
    });
  }

  async getUserSelective(disciplineId: string) {
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

  async getDisciplineTeachers(id: string) {
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

  async find(where: CreateDisciplineDTO) {
    return this.prisma.discipline.findFirst({
      where,
    });
  }

  async create(data: CreateDisciplineDTO) {
    return this.prisma.discipline.create({
      data,
    });
  }

  async getOrCreate(data: CreateDisciplineDTO) {
    let discipline = await this.find(data);
    if (!discipline) {
      discipline = await this.create(data);
    }
    return discipline;
  }

  async update(id: string, data: UpdateDisciplineDTO) {
    return this.prisma.discipline.update({
      where: {
        id,
      },
      data,
    });
  }
}