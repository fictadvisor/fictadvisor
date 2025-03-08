import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { DbSpeciality } from '../entities/DbSpeciality';
import { PrismaRepository } from '../prisma.repository';

@Injectable()
export class SpecialityRepository extends PrismaRepository<'speciality', DbSpeciality> {
  constructor (prisma: PrismaService) {
    super(prisma.speciality, {
      educationalPrograms: true,
    });
  }
}
