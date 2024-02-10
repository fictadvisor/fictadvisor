import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { CreateDisciplineTeacherRoleData } from '../../api/datas/CreateDisciplineTeacherRoleData';
import { Prisma } from '@prisma/client';

@Injectable()
export class DisciplineTeacherRoleRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  private include: Prisma.DisciplineTeacherRoleInclude = {
    disciplineType: true,
  };

  async find (data: CreateDisciplineTeacherRoleData) {
    return this.prisma.disciplineTeacherRole.findFirst({
      where: data,
      include: this.include,
    });
  }

  async create (data: { disciplineTeacherId: string; disciplineTypeId: string }) {
    return this.prisma.disciplineTeacherRole.create({
      data,
      include: this.include,
    });
  }

  async getOrCreate (data: CreateDisciplineTeacherRoleData) {
    let disciplineTeacherRole = await this.find(data);
    if (!disciplineTeacherRole) {
      disciplineTeacherRole = await this.create(data);
    }
    return disciplineTeacherRole;
  }
}
