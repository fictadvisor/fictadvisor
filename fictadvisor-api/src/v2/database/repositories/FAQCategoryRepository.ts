import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../PrismaService';
import { DbFAQCategory } from '../entities/DbFAQCategory';

@Injectable()
export class FAQCategoryRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  private include = {
    faqs: {
      include: {
        faq: true,
      },
    },
  };

  async create (data: Prisma.FAQCategoryCreateInput): Promise<DbFAQCategory> {
    return this.prisma.fAQCategory.create({
      data,
      include: this.include,
    });
  }

  async findById (id: string): Promise<DbFAQCategory> {
    return this.prisma.fAQCategory.findFirst({
      where: { id },
      include: this.include,
    });
  }

  async findByName (name: string): Promise<DbFAQCategory> {
    return this.prisma.fAQCategory.findFirst({
      where: { name },
      include: this.include,
    });
  }

  async findMany (where: Prisma.FAQCategoryWhereInput): Promise<DbFAQCategory[]> {
    return this.prisma.fAQCategory.findMany({
      where,
      include: this.include,
    });
  }

  async updateById (id: string, data: Prisma.FAQCategoryUpdateInput): Promise<DbFAQCategory> {
    return this.prisma.fAQCategory.update({
      where: { id },
      data,
      include: this.include,
    });
  }

  async deleteById (id: string): Promise<DbFAQCategory> {
    return this.prisma.fAQCategory.delete({
      where: { id },
      include: this.include,
    });
  }
}
