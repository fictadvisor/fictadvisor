import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/PrismaService';
import { type CreateRoleDTO } from '../dto/CreateRoleDTO';
import { type UpdateRoleDTO } from './dto/UpdateRoleDTO';

@Injectable()
export class RoleRepository {
  constructor (
    private readonly prisma: PrismaService
  ) {}

  create (data: CreateRoleDTO) {
    return this.prisma.role.create({
      data,
    });
  }

  async getGrants (id: string) {
    const role = await this.prisma.role.findUnique({
      where: {
        id,
      },
      include: {
        grants: true,
      },
    });

    return role.grants;
  }

  async delete (id: string) {
    return await this.prisma.role.delete({
      where: {
        id,
      },
    });
  }

  async update (id: string, data: UpdateRoleDTO) {
    return await this.prisma.role.update({
      where: {
        id,
      },
      data,
    });
  }
}
