import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { DbEvent } from '../entities/DbEvent';
import { PrismaRepository } from '../prisma.repository';

@Injectable()
export class EventRepository extends PrismaRepository<'event', DbEvent> {
  constructor (prisma: PrismaService) {
    super(prisma.event, {
      group: true,
      eventInfo: true,
      lessons: {
        include: {
          disciplineType: true,
        },
      },
    });
  }
}
