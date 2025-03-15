import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client/fictadvisor';
import { PrismaService } from '../prisma.service';
import { DbSpeciality } from '../entities/speciality.entity';

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
