import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client/fictadvisor';
import { PrismaService } from '../PrismaService';
import { DbSpeciality } from '../entities/DbSpeciality';

@Injectable()
export class SpecialityRepository {
  private include = {
    educationalPrograms: true,
  };

  constructor (
    private readonly prisma: PrismaService,
  ) {}

  async findMany (args?: Prisma.SpecialityFindManyArgs) {
    return this.prisma.speciality.findMany({
      include: this.include,
      ...args,
    }) as any as DbSpeciality[];
  }
}
