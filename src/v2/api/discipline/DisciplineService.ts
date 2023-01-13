import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateDisciplineDTO } from './dto/CreateDisciplineDTO';
import { DisciplineTypeEnum, User } from '@prisma/client';

@Injectable()
export class DisciplineService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(body: CreateDisciplineDTO) {
    return await this.prisma.discipline.create({
      data: body
    })
  }

  async get(id: string) {
    return await this.prisma.discipline.findUnique({
      where: {
        id,
      }
    })
  }

  async getByGroup(groupId: string) {
    return await this.prisma.discipline.findMany({
      where: {
        groupId,
      }
    })
  }

  async getTypes(disciplineId: string) {
    return await this.prisma.disciplineType.findMany({
      where: {
        disciplineId,
      }
    })
  }

  async getByType(id: string) {
    const disciplineType = await this.prisma.disciplineType.findUnique({
      where: {
        id
      },
      include: {
        discipline: true,
      }
    });

    return disciplineType.discipline;
  }

  async update(id: string, data) {
    return await this.prisma.discipline.update({
      where: {
        id
      },
      data
    })
  }

  async getOrCreateType(disciplineId: string, name: DisciplineTypeEnum) {
    let disciplineType = await this.prisma.disciplineType.findFirst({
      where: {
        disciplineId,
        name,
      }
    });
    if (!disciplineType) {
      disciplineType = await this.prisma.disciplineType.create({
        data: {
          disciplineId,
          name,
        }
      });
    }
    return disciplineType;
  }

  async getType(id: string) {
    return await this.prisma.disciplineType.findUnique({
      where: {
        id
      }
    });
  }

  async makeSelective(user: User, disciplineId: string) {
    return await this.prisma.selectiveDiscipline.create({
      data: {
        studentId: user.id,
        disciplineId,
      }
    });
  }

  async getSelective(studentId: string) {
    const selectiveDisciplines = await this.prisma.selectiveDiscipline.findMany({
      where: {
        studentId,
      },
      include: {
        discipline: true,
      }
    });

    return selectiveDisciplines.map(sd => sd.discipline);
  }
}