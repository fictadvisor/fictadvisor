import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { TeacherRole } from '@prisma/client';
import { CreateDisciplineTeacherRoleData } from '../../api/datas/CreateDisciplineTeacherRoleData';

@Injectable()
export class DisciplineTeacherRoleRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  async find (data: CreateDisciplineTeacherRoleData) {
    return this.prisma.disciplineTeacherRole.findFirst({
      where: data,
    });
  }

  async create (data: { role: TeacherRole; disciplineTeacherId: string; disciplineTypeId: string }) {
    return this.prisma.disciplineTeacherRole.create({
      data,
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