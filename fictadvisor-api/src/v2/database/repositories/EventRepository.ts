import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';
import { DbEvent } from '../entities/DbEvent';

@Injectable()
export class EventRepository {

  private include = {
    group: true,
    eventInfo: true,
    lessons: {
      include: {
        disciplineType: true,
      },
    },
  };

  constructor (private prisma: PrismaService) {}

  create (data: Prisma.EventUncheckedCreateInput) {
    return this.prisma.event.create({
      data,
      include: this.include,
    }) as any as Promise<DbEvent>;
  }

  find (where: Prisma.EventWhereInput): Promise<DbEvent> {
    return this.prisma.event.findFirst({
      where,
      include: this.include,
    }) as any as Promise<DbEvent>;
  }


  findById (id: string) {
    return this.find({
      id,
    }) as any as Promise<DbEvent>;
  }

  findMany (args: Prisma.EventFindManyArgs): Promise<DbEvent[]> {
    return this.prisma.event.findMany({
      include: this.include,
      ...args,
    }) as unknown as Promise<DbEvent[]>;
  }

  updateById (id: string, data: Prisma.EventUncheckedUpdateInput): Promise<DbEvent> {
    return this.prisma.event.update({
      where: { id },
      data,
      include: this.include,
    }) as any as Promise<DbEvent>;
  }
  
  deleteById (id: string): Promise<DbEvent> {
    return this.prisma.event.delete({
      where: { id },
      include: this.include,
    }) as any as Promise<DbEvent>;
  }

  deleteMany (where: Prisma.EventWhereInput) {
    return this.prisma.event.deleteMany({
      where,
    }) as any as Promise<DbEvent[]>;
  }

  count (where: Prisma.EventWhereInput) {
    return this.prisma.event.count({
      where,
    });
  }
}
