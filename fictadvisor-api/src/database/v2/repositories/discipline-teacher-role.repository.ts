import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma-client/fictadvisor';
import { RepositoryInterface } from '../../interfaces/repository.interface';
import { DbDisciplineTeacherRole } from '../entities/discipline-teacher-role.entity';
import { Include, Sort, Where } from '../prisma.repository';

@Injectable()
export class DisciplineTeacherRoleRepository implements RepositoryInterface<DbDisciplineTeacherRole, Prisma.DisciplineTeacherRoleWhereInput> {
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

  findMany (where: Where<'disciplineTeacherRole'>,
    include?: Include<'disciplineTeacherRole'>,
    page?: { take: number; skip: number },
    sort?: Sort<'disciplineTeacherRole'>): Promise<DbDisciplineTeacherRole[]> {
    const methodInclude = {
      ...this.include,
      ...include,
    };

    return this.prisma.disciplineTeacherRole.findMany({
      where,
      orderBy: sort,
      take: page?.take,
      skip: page?.skip,
      include: Object.keys(methodInclude).length ? methodInclude : undefined,
    });
  }

  count (where: Where<'disciplineTeacherRole'>): Promise<number> {
    return this.prisma.disciplineTeacherRole.count({ where });
  }
}
