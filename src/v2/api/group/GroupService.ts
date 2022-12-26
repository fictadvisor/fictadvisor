import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { Group } from '@prisma/client'
import { GetDTO } from '../teacher/dto/GetDTO';
import { DatabaseUtils } from '../utils/DatabaseUtils';
import { GroupFieldsDTO } from './dto/GroupFieldsDTO';

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

  async getAll({ fields }: GetDTO) {
    const select = DatabaseUtils.getSelectObject<GroupFieldsDTO>(fields);

    return await this.prisma.group.findMany(select);
  }

  async get(id: string) {
    return await this.prisma.group.findUnique({
      where: {
        id
      }
    })
  }
}