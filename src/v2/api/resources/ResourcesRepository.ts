import { Injectable } from '@nestjs/common';
import { StudentResource } from '@prisma/client';
import { QueryAllDTO } from 'src/v2/utils/QueryAllDTO';
import { PrismaService } from '../../database/PrismaService';
import { DatabaseUtils } from '../utils/DatabaseUtils';
import { CreateResourceDTO } from './dto/CreateResourceDTO';
import { UpdateResourceDTO } from './dto/UpdateResourceDTO';

@Injectable()
export class ResourceRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getAll(body: QueryAllDTO) {
    const search = DatabaseUtils.getSearch<StudentResource>(body, 'name', 'link', 'icon');
    const page = DatabaseUtils.getPage(body);
    const sort = DatabaseUtils.getSort(body);

    return this.prisma.studentResource.findMany({
      ...page,
      ...sort,
      where: {
        ...search,
      },
    });
  }

  async get(id: string) {
    return this.prisma.studentResource.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateResourceDTO) {
    return this.prisma.studentResource.create({
      data,
    });
  }

  async update(id: string, data: UpdateResourceDTO) {
    return this.prisma.studentResource.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        name: true,
        link: true,
        icon: true,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.studentResource.delete({
      where: {
        id,
      },
    });
  }
}