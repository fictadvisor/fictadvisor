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
    const discipline = await this.get(id);
    return discipline.subject;
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
    const discipline = await this.get(id);
    return discipline.disciplineTypes;
  }

  async getSelective(id: string) {
    const discipline = await this.get(id);
    return discipline.selectiveDisciplines;
  }

  async getDisciplineTeachers(id: string) {
    const discipline = await this.get(id);
    return discipline.disciplineTeachers;
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