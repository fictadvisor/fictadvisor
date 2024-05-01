import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';
import { DbDisciplineResource } from '../entities/DbDisciplineResource';

@Injectable()
export class DisciplineResourceRepository {
  
  constructor (
    private prisma: PrismaService,
  ) {}

  private include = {
    categories: {
      include: {
        category: true,
      },
    },
    subject: true,
    teacher: true,
  }

  async findMany (data: Prisma.ResourceFindManyArgs): Promise<DbDisciplineResource[]> {
    return this.prisma.resource.findMany({
      ...data,
      include: this.include,
    }) as any as DbDisciplineResource[];
  }

  async findById (id: string): Promise<DbDisciplineResource> {
    return this.prisma.resource.findUnique({
      where: { id },
      include: this.include,
    });
  }

  async create (data: Prisma.ResourceUncheckedCreateInput): Promise<DbDisciplineResource> {
    return this.prisma.resource.create({
      data,
      include: this.include,
    });
  }

  async updateById (id: string, data: Prisma.ResourceUncheckedUpdateInput): Promise<DbDisciplineResource> {
    return this.prisma.resource.update({
      where: { id },
      data,
      include: this.include,
    });
  }

  async deleteById (id: string): Promise<DbDisciplineResource> {
    return this.prisma.resource.delete({
      where: { id },
      include: this.include,
    });
  }

  async count (data: Prisma.ResourceCountArgs): Promise<number> {
    return this.prisma.resource.count(
      data,
    );
  }
}