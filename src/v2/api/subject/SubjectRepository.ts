import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/PrismaService';

@Injectable()
export class SubjectRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  async find (where: Prisma.SubjectWhereInput) {
    return this.prisma.subject.findFirst({
      where,
      include: {
        disciplines: true,
      },
    });
  }

  async findById (id: string) {
    return this.prisma.subject.findUnique({
      where: {
        id,
      },
      include: {
        disciplines: true,
      },
    });
  }

  async getAll (data: Prisma.SubjectFindManyArgs) {
    return this.prisma.subject.findMany({
      ...data,
      include: {
        disciplines: true,
      },
    });
  }

  async create (data: Prisma.SubjectUncheckedCreateInput) {
    return this.prisma.subject.create({
      data,
      include: {
        disciplines: true,
      },
    });
  }

  async getOrCreate (name: string) {
    let subject = await this.find({ name });
    if (!subject) {
      subject = await this.create({ name });
    }
    return subject;
  }

  async update (where: Prisma.SubjectWhereUniqueInput, data: Prisma.SubjectUncheckedUpdateInput) {
    return this.prisma.subject.update({
      where,
      data,
    });
  }

  async updateById (id: string, data: Prisma.SubjectUncheckedUpdateInput) {
    return this.prisma.subject.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteById (id: string) {
    return this.prisma.subject.delete({
      where: {
        id,
      },
    });
  }

  async delete (where: Prisma.SubjectWhereUniqueInput) {
    return this.prisma.subject.delete({
      where,
    });
  }
}