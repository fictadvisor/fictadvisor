import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../PrismaService';

@Injectable()
export class SpecialityRepository {
  private include = {
    educationalPrograms: true,
  };

  constructor (
    private readonly prisma: PrismaService,
  ) {}

  findMany (args?: Prisma.SpecialityFindManyArgs) {
    return this.prisma.speciality.findMany({
      include: this.include,
      ...args,
    });
  }
}