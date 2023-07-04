import { Injectable } from '@nestjs/common';
import { StudentResource } from '@prisma/client';
import { QueryAllDTO } from 'src/v2/utils/QueryAllDTO';
import { PrismaService } from '../PrismaService';
import { DatabaseUtils } from '../DatabaseUtils';
import { CreateResourceData } from '../../api/datas/CreateResourceData';
import { UpdateResourceData } from '../../api/datas/UpdateResourceData';

@Injectable()
export class ResourceRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  async getAll (body: QueryAllDTO) {
    const search = DatabaseUtils.getSearch<StudentResource>(body, 'name', 'link', 'icon');
    const sort = DatabaseUtils.getSort(body, 'name');

    const data = {
      ...sort,
      where: {
        ...search,
      },
    };
    return await DatabaseUtils.paginate<StudentResource>(this.prisma.studentResource, body, data);
  }

  get (id: string) {
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

  async create (data: CreateResourceData) {
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

  async update (id: string, data: UpdateResourceData) {
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

  async delete (id: string) {
    return this.prisma.studentResource.delete({
      where: {
        id,
      },
    });
  }
}