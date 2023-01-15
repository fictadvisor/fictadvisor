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
      },
    });
  }

  async getDiscipline(id: string) {
    const discipline = await this.get(id);
    delete discipline.group;
    delete discipline.subject;
    delete discipline.disciplineTypes;
    delete discipline.selectiveDisciplines;
    return discipline;
  }

  async getSubject(id: string) {
    const discipline = await this.get(id);
    return discipline.subject;
  }

  async getGroup(id: string) {
    const discipline = await this.get(id);
    return discipline.group;
  }

  async getTypes(id: string) {
    const discipline = await this.get(id);
    return discipline.disciplineTypes;
  }

  async getSelective(id: string) {
    const discipline = await this.get(id);
    return discipline.selectiveDisciplines;
  }

  async create(data: CreateDisciplineDTO) {
    return this.prisma.discipline.create({
      data,
    });
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