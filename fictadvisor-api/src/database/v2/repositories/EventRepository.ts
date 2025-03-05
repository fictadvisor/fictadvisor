import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client/fictadvisor';
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

  create (data: Prisma.EventUncheckedCreateInput): Promise<DbEvent> {
    return this.prisma.event.create({
      data,
      include: this.include,
    }) as Promise<DbEvent>;
  }

  async findOrCreate (where: Prisma.EventWhereInput, data: Prisma.EventUncheckedCreateInput) {
    const event = await this.find(where);
    if (!event) {
      return await this.create(data);
    }
    return event;
  }

  find (where: Prisma.EventWhereInput): Promise<DbEvent> {
    return this.prisma.event.findFirst({
      where,
      include: this.include,
    }) as any as Promise<DbEvent>;
  }

  findById (id: string): Promise<DbEvent> {
    return this.find({
      id,
    }) as Promise<DbEvent>;
  }

  findMany (args: Prisma.EventFindManyArgs): Promise<DbEvent[]> {
    return this.prisma.event.findMany({
      include: this.include,
      ...args,
    }) as Promise<DbEvent[]>;
  }

  updateById (id: string, data: Prisma.EventUncheckedUpdateInput): Promise<DbEvent> {
    return this.prisma.event.update({
      where: { id },
      data,
      include: this.include,
    }) as Promise<DbEvent>;
  }

  deleteById (id: string): Promise<DbEvent> {
    return this.prisma.event.delete({
      where: { id },
      include: this.include,
    }) as Promise<DbEvent>;
  }

  count (where: Prisma.EventWhereInput): Promise<number> {
    return this.prisma.event.count({
      where,
    });
  }
}
