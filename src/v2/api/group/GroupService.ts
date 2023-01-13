import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { Group } from '@prisma/client'
import { GetDTO } from '../teacher/dto/GetDTO';
import { DatabaseUtils } from '../utils/DatabaseUtils';

@Injectable()
export class GroupService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(code: string): Promise<Group>  {
    return await this.prisma.group.create({
      data: {
        code
      }
    });
  }

  async getAll(body: GetDTO<Group>) {
    const search = DatabaseUtils.getSearch<Group>(body, 'code');
    const page = DatabaseUtils.getPage(body);
    const sort = DatabaseUtils.getSort(body);

    return await this.prisma.group.findMany({
      ...page,
      ...sort,
      where: {
        ...search,
      },
    });
  }

  async get(id: string) {
    return await this.prisma.group.findUnique({
      where: {
        id
      }
    })
  }
}