import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { DbEducationalProgram } from '../entities/DbEducationalProgram';
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
