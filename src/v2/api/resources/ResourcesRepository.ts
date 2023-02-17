import { Injectable } from '@nestjs/common';
import { StudentResource } from '@prisma/client';
import { QueryAllDTO } from 'src/v2/utils/QueryAllDTO';
import { PrismaService } from '../../database/PrismaService';
import { DatabaseUtils } from '../utils/DatabaseUtils';
import { UpdateResourceData } from './data/UpdateResourceData';

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

  get(id: string) {
    return this.prisma.studentResource.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        icon: true,
        link: true,
        name: true,
      },
    });
  }

  async create(data: UpdateResourceData) {
    return this.prisma.studentResource.create({
      data,
      select: {
        id: true,
        icon: true,
        link: true,
        name: true,     
      },
    });
  }

  async update(id: string, data: UpdateResourceData) {
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