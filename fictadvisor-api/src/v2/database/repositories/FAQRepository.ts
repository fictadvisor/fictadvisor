import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../PrismaService';
import { DbFAQ } from '../entities/DbFAQ';

@Injectable()
export class FAQRepository {
  constructor (
    private readonly prisma: PrismaService,
  ) {}

  private include = {
    categories: {
      include: {
        category: true,
      },
    },
  };

  async create (data: Prisma.FAQCreateInput): Promise<DbFAQ> {
    return this.prisma.fAQ.create({
      data,
      include: this.include,
    });
  }

  async findMany (data: Prisma.FAQFindManyArgs): Promise<DbFAQ[]> {
    return this.prisma.fAQ.findMany({
      ...data,
      include: this.include,
    }) as unknown as DbFAQ[];
  }

  async findById (id: string): Promise<DbFAQ> {
    return this.prisma.fAQ.findFirst({
      where: { id },
      include: this.include,
    });
  }

  async updateById (id: string, data: Prisma.FAQUpdateInput): Promise<DbFAQ> {
    return this.prisma.fAQ.update({
      where: { id },
      data,
      include: this.include,
    });
  }

  async deleteById (id: string): Promise<DbFAQ> {
    return this.prisma.fAQ.delete({
      where: { id },
      include: this.include,
    });
  }

  async count (data: Prisma.FAQCountArgs): Promise<number> {
    return this.prisma.fAQ.count(data);
  }
}
