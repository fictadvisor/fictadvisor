import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { PrismaRepository } from '../prisma.repository';
import { DbStudentResource } from '../entities/DbStudentResource';

@Injectable()
export class ResourceRepository extends PrismaRepository<'studentResource', DbStudentResource>{
  constructor (prisma: PrismaService) {
    super(prisma.studentResource);
  }
}
