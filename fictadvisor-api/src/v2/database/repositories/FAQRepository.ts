import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';
import { DBFAQ } from '../entities/DBFAQ';

@Injectable()
export class FAQRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  private include = {
    categories: {
      include: {
        category: true,
      },
    },
  };

  async create (data: Prisma.FAQCreateInput): Promise<DBFAQ> {
    return this.prisma.fAQ.create({
      data,
      include: this.include,
    });
  }

  async updateById (id: string, data: Prisma.FAQUpdateInput): Promise<DBFAQ> {
    return this.prisma.fAQ.update({
      where: { id },
      data,
      include: this.include,
    });
  }

  async deleteById (id: string): Promise<DBFAQ> {
    return this.prisma.fAQ.delete({
      where: { id },
      include: this.include,
    });
  }
}
