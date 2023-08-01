import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

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
    private readonly prismaService: PrismaService,
  ) {}

  find (where: Prisma.EntrantWhereInput) {
    return this.prismaService.entrant.findFirst({
      where,
      include: this.include,
    });
  }

  create (data: Prisma.EntrantUncheckedCreateInput) {
    return this.prismaService.entrant.create({
      data,
      include: this.include,
    });
  }

  updateById (id: string, data: Prisma.EntrantUncheckedUpdateInput) {
    return this.prismaService.entrant.update({
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