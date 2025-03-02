import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../PrismaService';
import { DbCathedra } from '../entities/DbCathedra';

@Injectable()
export class CathedraRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  private include = {
    teachers: {
      include: {
        teacher: true,
      },
    },
  };

  async create (data: Prisma.CathedraCreateInput): Promise<DbCathedra> {
    return this.prisma.cathedra.create({
      data,
      include: this.include,
    });
  }

  async findById (id: string): Promise<DbCathedra> {
    return this.prisma.cathedra.findFirst({
      where: { id },
      include: this.include,
    });
  }

  async updateById (id: string, data: Prisma.CathedraUpdateInput): Promise<DbCathedra> {
    return this.prisma.cathedra.update({
      where: { id },
      data,
      include: this.include,
    });
  }

  async findMany (data: Prisma.CathedraFindManyArgs) {
    return this.prisma.cathedra.findMany({
      include: this.include,
      ...data,
    });
  }

  async count (data: Prisma.CathedraCountArgs) {
    return this.prisma.cathedra.count(
      data,
    );
  }

  async deleteById (id: string): Promise<DbCathedra> {
    return this.prisma.cathedra.delete({
      where: { id },
      include: this.include,
    });
  }
}
