import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client/fictadvisor';

@Injectable()
export class DisciplineTeacherRoleRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  private include: Prisma.DisciplineTeacherRoleInclude = {
    disciplineType: true,
  };

  async find (data: Prisma.DisciplineTeacherRoleWhereInput) {
    return this.prisma.disciplineTeacherRole.findFirst({
      where: data,
      include: this.include,
    });
  }

  async create (data: Prisma.DisciplineTeacherRoleUncheckedCreateInput) {
    return this.prisma.disciplineTeacherRole.create({
      data,
      include: this.include,
    });
  }

  async getOrCreate (data: Prisma.DisciplineTeacherRoleUncheckedCreateInput) {
    let disciplineTeacherRole = await this.find(data);
    if (!disciplineTeacherRole) {
      disciplineTeacherRole = await this.create(data);
    }
    return disciplineTeacherRole;
  }

  async deleteMany (where: Prisma.DisciplineTeacherRoleWhereInput) {
    return this.prisma.disciplineTeacherRole.deleteMany({ where });
  }
}
