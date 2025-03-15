import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaRepository } from '../prisma.repository';
import { DbSubject } from '../entities/subject.entity';

@Injectable()
export class SubjectRepository extends PrismaRepository<'subject', DbSubject> {
  constructor (prisma: PrismaService) {
    super(prisma.subject);
  }
}
