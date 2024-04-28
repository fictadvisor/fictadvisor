import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../PrismaService';
import { DbEducationalProgram } from '../entities/DbEducationalProgram';

@Injectable()
export class EduProgramRepository {
  private include = {
    speciality: true,
    groups: true,
  };

  constructor (
    private readonly prisma: PrismaService,
  ) {}

  findMany (args?: Prisma.EducationalProgramsFindManyArgs,) {
    return this.prisma.educationalPrograms.findMany({
      include: this.include,
      ...args,
    }) as any as Promise<DbEducationalProgram[]>;
  }
}