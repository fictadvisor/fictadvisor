import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { Group } from '@prisma/client'

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
}