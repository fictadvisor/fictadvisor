import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbEvent } from '../entities/event.entity';
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
