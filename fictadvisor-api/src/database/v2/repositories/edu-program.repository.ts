import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbEducationalProgram } from '../entities/educational-program.entity';
import { PrismaRepository } from '../prisma.repository';

@Injectable()
export class EduProgramRepository extends PrismaRepository<'educationalPrograms', DbEducationalProgram> {
  constructor (prisma: PrismaService) {
    super(prisma.educationalPrograms, {
      speciality: true,
      groups: true,
    });
  }
}
