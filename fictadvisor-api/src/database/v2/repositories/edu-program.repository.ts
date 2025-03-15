import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client/fictadvisor';
import { PrismaService } from '../prisma.service';
import { DbEducationalProgram } from '../entities/educational-program.entity';

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

  findById (id: string): Promise<DbEducationalProgram> {
    return this.prisma.educationalPrograms.findFirst({
      where: { id },
    }) as any as Promise<DbEducationalProgram>;
  }
}
