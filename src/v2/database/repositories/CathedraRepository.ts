import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class CathedraRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  private include = {
    teachers: true,
  };

  async create (data: Prisma.CathedraUncheckedCreateInput) {
    return this.prisma.cathedra.create({
      data,
      include: this.include,
    });
  }

  async findById (id: string) {
    return this.prisma.cathedra.findFirst({
      where: { id },
      include: this.include,
    });
  }
}
