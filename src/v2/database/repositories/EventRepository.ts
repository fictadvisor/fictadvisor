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
    });
  }

  find (where: Prisma.EventWhereInput): Promise<DbEvent> {
    return this.prisma.event.findFirst({
      where,
      include: this.include,
    });
  }

  findById (id: string) {
    return this.find({
      id,
    });
  }

  findMany (args: Prisma.EventFindManyArgs): Promise<DbEvent[]> {
    return this.prisma.event.findMany({
      include: this.include,
      ...args,
    }) as unknown as Promise<DbEvent[]>;
  }

  update (args: Prisma.EventUpdateArgs) {
    return this.prisma.event.update({
      ...args,
      include: this.include,
    });
  }

  updateById (id: string, data: Prisma.EventUncheckedUpdateInput) {
    return this.update({
      where: {
        id,
      },
      data,
    });
  }

  updateMany (where: Prisma.EventWhereInput, data: Prisma.EventUncheckedUpdateManyInput) {
    return this.prisma.event.updateMany({
      where,
      data,
    });
  }

  delete (args: Prisma.EventDeleteArgs) {
    return this.prisma.event.delete({
      ...args,
      include: this.include,
    });
  }
  
  deleteById (id: string) {
    return this.delete({
      where: {
        id,
      },
    });
  }

  deleteMany (where: Prisma.EventWhereInput) {
    return this.prisma.event.deleteMany({
      where,
    });
  }
}
