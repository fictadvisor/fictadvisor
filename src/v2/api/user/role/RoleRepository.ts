import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/PrismaService';
import {
  CreateGrantInRoleData,
  CreateRoleData,
  CreateRoleDTO,
} from '../dto/CreateRoleDTO';
import { UpdateRoleDTO } from './dto/UpdateRoleDTO';

@Injectable()
export class RoleRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  create(data: CreateRoleDTO) {
    return this.prisma.role.create({
      data,
    });
  }

  createWithGrants(role: CreateRoleData, grants: CreateGrantInRoleData[]) {
    return this.prisma.role.create({
      data: {
        ...role,
        grants: {
          create: grants,
        },
      },
    });
  }

  async getGrants(id: string) {
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

  async delete(id: string) {
    return this.prisma.role.delete({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdateRoleDTO) {
    return this.prisma.role.update({
      where: {
        id,
      },
      data,
    });
  }

  get(id: string) {
    return this.prisma.role.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        weight: true,
        grants: {
          select: {
            id: true,
            set: true,
            permission: true,
          },
        },
      },
    });
  }

  getAll() {
    return this.prisma.role.findMany({
      select: {
        id: true,
        name: true,
        weight: true,
        grants: {
          select: {
            id: true,
            set: true,
            permission: true,
          },
        },
      },
    });
  }
}