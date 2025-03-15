import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaRepository } from '../prisma.repository';
import { DbStudentResource } from '../entities/student-resource.entity';

@Injectable()
export class ResourceRepository extends PrismaRepository<'studentResource', DbStudentResource>{
  constructor (prisma: PrismaService) {
    super(prisma.studentResource);
  }
}
