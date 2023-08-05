import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class EntrantRepository {

  private include: Prisma.EntrantInclude = {
    entrantData: true,
    representativeData: true,
    contract: true,
    priority: {
      include: {
        priorities: true,
      },
    },
  };

  constructor (
    private readonly prisma: PrismaService,
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

  async deleteById (id: string) {
    return this.prisma.entrant.delete({
      where: {
        id,
      },
    });
  }
}