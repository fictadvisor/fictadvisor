import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client/fictadvisor';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ResourceRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  async findMany (args: Prisma.StudentResourceFindManyArgs) {
    return this.prisma.studentResource.findMany(args);
  }

  async find (where: Prisma.StudentResourceWhereInput) {
    return this.prisma.studentResource.findFirst({
      where,
    });
  }

  async findById (id: string) {
    return this.prisma.studentResource.findUnique({
      where: {
        id,
      },
    });
  }

  async create (data: Prisma.StudentResourceCreateInput) {
    return this.prisma.studentResource.create({
      data,
    });
  }

  async updateById (id: string, data: Prisma.StudentResourceUncheckedUpdateInput) {
    return this.prisma.studentResource.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteById (id: string) {
    return this.prisma.studentResource.delete({
      where: {
        id,
      },
    });
  }

  async count (data: Prisma.StudentResourceCountArgs) {
    return this.prisma.studentResource.count(
      data,
    );
  }
}
