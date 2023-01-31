import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/PrismaService';
import { type CreateGrantData } from '../dto/CreateRoleDTO';
import { type UpdateGrantDTO } from './dto/UpdateGrantDTO';

@Injectable()
export class GrantRepository {
  constructor (
    private readonly prisma: PrismaService
  ) {}

  async create (data: CreateGrantData) {
    return await this.prisma.grant.create({
      data,
    });
  }

  async find (where: CreateGrantData) {
    return await this.prisma.grant.findFirst({
      where,
    });
  }

  delete (id: string) {
    return this.prisma.grant.delete({
      where: {
        id,
      },
    });
  }

  async update (id: string, data: UpdateGrantDTO) {
    return await this.prisma.grant.update({
      where: {
        id,
      },
      data,
    });
  }
}
