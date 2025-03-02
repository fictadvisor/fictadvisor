import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../PrismaService';

@Injectable()
export class PageTextRepository {
  constructor (
        private prisma: PrismaService,
  ) {}

  async findMany (args: Prisma.PageTextFindManyArgs) {
    return this.prisma.pageText.findMany(args);
  }

  async find (where: Prisma.PageTextWhereInput) {
    return this.prisma.pageText.findFirst({
      where,
    });
  }

  async create (data: Prisma.PageTextCreateInput) {
    return this.prisma.pageText.create({
      data,
    });
  }

  async update (key: string, data: Prisma.PageTextUpdateInput) {
    return this.prisma.pageText.update({
      where: {
        key,
      },
      data,
    });
  }

  async count (data: Prisma.PageTextCountArgs) {
    return this.prisma.pageText.count(
      data,
    );
  }
}