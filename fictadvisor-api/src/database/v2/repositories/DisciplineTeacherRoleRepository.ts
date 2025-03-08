import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { PrismaRepository } from '../prisma.repository';
import { DbDisciplineTeacherRole } from '../entities/DbDisciplineTeacherRole';

@Injectable()
export class DisciplineTeacherRoleRepository extends PrismaRepository <'disciplineTeacherRole', DbDisciplineTeacherRole> {
  constructor (prisma: PrismaService) {
    super(prisma.disciplineTeacherRole, {
      disciplineType: true,
    });
  }
}
