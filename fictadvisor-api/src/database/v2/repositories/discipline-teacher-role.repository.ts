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

  private include = {
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
    // A null discipline type cannot be upserted on: Postgres treats NULLs as
    // distinct, so the compound unique would never match and every call would
    // insert. Those rows are not reachable from any caller today, and the
    // find-then-create they fall back to is what this always did.
    if (data.disciplineTypeId == null) {
      return await this.find(data) ?? this.create(data);
    }

    return this.prisma.disciplineTeacherRole.upsert({
      where: {
        disciplineTeacherId_disciplineTypeId: {
          disciplineTeacherId: data.disciplineTeacherId,
          disciplineTypeId: data.disciplineTypeId,
        },
      },
      create: data,
      update: {},
      include: this.include,
    });
  }

  async deleteMany (where: Prisma.DisciplineTeacherRoleWhereInput) {
    return this.prisma.disciplineTeacherRole.deleteMany({ where });
  }

  findMany<T = DbDisciplineTeacherRole> (where: Where<'disciplineTeacherRole'>,
    include?: Include<'disciplineTeacherRole'>,
    page?: { take: number; skip: number },
    sort?: Sort<'disciplineTeacherRole'>): Promise<T[]> {
    const methodInclude = {
      ...this.include,
      ...include,
    };

    return this.prisma.disciplineTeacherRole.findMany({
      where,
      orderBy: sort,
      take: page?.take,
      skip: page?.skip,
      include: methodInclude,
    }) as unknown as Promise<T[]>;
  }

  count (where: Where<'disciplineTeacherRole'>): Promise<number> {
    return this.prisma.disciplineTeacherRole.count({ where });
  }
}
