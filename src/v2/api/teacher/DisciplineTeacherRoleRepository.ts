import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { type TeacherRole } from '@prisma/client';
import { type CreateDisciplineTeacherRoleData } from './dto/CreateDisciplineTeacherRoleData';

@Injectable()
export class DisciplineTeacherRoleRepository {
  constructor (
    private readonly prisma: PrismaService
  ) {}

  async getDisciplineTeachers (disciplineTypeId: string) {
    const roles = await this.prisma.disciplineTeacherRole.findMany({
      where: {
        disciplineTypeId,
      },
      include: {
        disciplineTeacher: true,
      },
    });

    return roles.map((r) => ({ role: r.role, ...r.disciplineTeacher }));
  }

  async getTypes (disciplineTeacherId: string) {
    const roles = await this.prisma.disciplineTeacherRole.findMany({
      where: {
        disciplineTeacherId,
      },
      include: {
        disciplineType: true,
      },
    });

    return roles.map((r) => ({ role: r.role, ...r.disciplineType }));
  }

  async find (data: CreateDisciplineTeacherRoleData) {
    return await this.prisma.disciplineTeacherRole.findFirst({
      where: data,
    });
  }

  async create (data: { role: TeacherRole, disciplineTeacherId: string, disciplineTypeId: string }) {
    return await this.prisma.disciplineTeacherRole.create({
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
