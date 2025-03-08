import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { PrismaRepository } from '../prisma.repository';
import { DbSubject } from '../entities/DbSubject';

@Injectable()
export class SubjectRepository extends PrismaRepository<'subject', DbSubject> {
  constructor (prisma: PrismaService) {
    super(prisma.subject);
  }
}
