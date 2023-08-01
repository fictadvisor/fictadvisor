import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../PrismaService';

@Injectable()
export class EntrantRepository {

  private include: Prisma.EntrantInclude = {
    entrantData: true,
    contract: true,
    priority: {
      include: {
        priorities: true,
      },
    },
  };

  constructor (
    private prisma: PrismaService,
  ) {}

  find (where: Prisma.EntrantWhereInput) {
    return this.prisma.entrant.findFirst({
      where,
      include: this.include,
    });
  }

  create (data: Prisma.EntrantUncheckedCreateInput) {
    return this.prisma.entrant.create({
      data,
      include: this.include,
    });
  }

  updateById (id: string, data: Prisma.EntrantUncheckedUpdateInput) {
    return this.prisma.entrant.update({
      where: {
        id,
      },
      data,
      include: this.include,
    });
  }

  async getOrCreate (data: { firstName: string, middleName?: string, lastName: string, specialty: string }) {
    let entrant = await this.find(data);
    if (!entrant) {
      entrant = await this.create(data);
    }
    return entrant;
  }
}