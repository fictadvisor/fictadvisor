import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateDisciplineTypeDTO } from './dto/CreateDisciplineTypeDTO';

@Injectable()
export class DisciplineTypeRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  async get (id: string) {
    return this.prisma.disciplineType.findUnique({
      where: {
        id,
      },
      include: {
        lessons: true,
        temporaryLessons: true,
        discipline: true,
        disciplineTeacherRoles: true,
      },
    });
  }

  async getType (id: string) {
    const type = await this.get(id);
    delete type.discipline;
    delete type.disciplineTeacherRoles;
    delete type.lessons;
    delete type.temporaryLessons;
    return type;
  }

  async getDiscipline (id: string) {
    const type = await this.get(id);
    return type.discipline;
  }

  async getDisciplineTeacherRoles (id: string) {
    const type = await this.get(id);
    return type.disciplineTeacherRoles;
  }

  async getLessons (id: string) {
    const type = await this.get(id);
    return type.lessons;
  }

  async create (data: CreateDisciplineTypeDTO) {
    return this.prisma.disciplineType.create({
      data,
    });
  }

  async delete (id: string) {
    return this.prisma.disciplineType.delete({
      where: {
        id,
      },
    });
  }

  async findType (data: CreateDisciplineTypeDTO) {
    return this.prisma.disciplineType.findFirst({
      where: data,
    });
  }

  async getOrCreate (body: CreateDisciplineTypeDTO) {
    let type = await this.findType(body);
    if (!type) {
      type = await this.create(body);
    }
    return type;
  }

  async deleteDisciplineTeacherRoles (disciplineTypeId: string) {
    return this.prisma.disciplineTeacherRole.deleteMany({
      where: {
        disciplineTypeId,
      },
    });
  }
}