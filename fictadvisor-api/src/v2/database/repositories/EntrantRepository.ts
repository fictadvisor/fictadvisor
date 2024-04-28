import { Injectable } from '@nestjs/common';
import { DbEntrant } from '../entities/DbEntrant';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class EntrantRepository {

  private include = {
    entrantData: true,
    representativeData: true,
    customerData: true,
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

  async findById (id: string) {
    return this.prisma.entrant.findFirst({
      where: {
        id,
      },
      include: this.include,
    }) as any as DbEntrant;
  }

  async find (where: Prisma.EntrantWhereInput) {
    return this.prisma.entrant.findFirst({
      where,
      include: this.include,
    }) as any as DbEntrant;
  }

  async create (data: Prisma.EntrantUncheckedCreateInput) {
    return this.prisma.entrant.create({
      data,
      include: this.include,
    }) as any as DbEntrant;
  }

  async updateById (id: string, data: Prisma.EntrantUncheckedUpdateInput) {
    return this.prisma.entrant.update({
      where: {
        id,
      },
      data,
      include: this.include,
    }) as any as DbEntrant;
  }

  async getOrCreate (data: { firstName: string, middleName?: string, lastName: string, specialty: string }) {
    let entrant = await this.find(data);
    if (!entrant) {
      entrant = await this.create(data);
    }
    return entrant as any as DbEntrant;
  }

  async deleteById (id: string) {
    return this.prisma.entrant.delete({
      where: {
        id,
      },
    }) as any as DbEntrant;
  }
}