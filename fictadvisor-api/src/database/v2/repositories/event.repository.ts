import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-client/fictadvisor';
import { PrismaService } from '../prisma.service';
import { DbEvent } from '../entities/event.entity';
import { PrismaRepository } from '../prisma.repository';

@Injectable()
export class EventRepository extends PrismaRepository<'event', DbEvent> {
  // Relations callers need when an event is returned to a client (response
  // mappers read lessons/disciplineType + eventInfo; `group` is kept for
  // callers that assert the raw entity). Internal/parser callers that only
  // need scalars pass no include and fetch none of this.
  static readonly responseInclude: Prisma.EventInclude = {
    group: true,
    lessons: {
      include: {
        disciplineType: true,
      },
    },
    eventInfo: true,
  };

  constructor (prisma: PrismaService) {
    // No global include: callers pass only the relations they need.
    super(prisma.event);
  }
}
