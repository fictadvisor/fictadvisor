import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbSpeciality } from '../entities/speciality.entity';
import { PrismaRepository } from '../prisma.repository';

@Injectable()
export class SpecialityRepository extends PrismaRepository<'speciality', DbSpeciality> {
  constructor (prisma: PrismaService) {
    super(prisma.speciality, {
      educationalPrograms: true,
    });
  }
}
