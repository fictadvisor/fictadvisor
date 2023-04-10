import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/PrismaService';
import { CreateRoleDTO } from '../dto/CreateRoleDTO';
import { UpdateRoleDTO } from './dto/UpdateRoleDTO';
import { CreateRoleData } from '../data/CreateRoleData';
import { CreateGrantInRoleData } from '../data/CreateGrantInRoleData';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  create (data: CreateRoleDTO) {
    return this.prisma.role.create({
      data,
    });
  }

  createWithGrants (role: CreateRoleData, grants: CreateGrantInRoleData[]) {
    return this.prisma.role.create({
      data: {
        ...role,
        grants: {
          create: grants,
        },
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

  async getGrants (roleId: string) {
    return this.prisma.grant.findMany({
      where: {
        roleId,
      },
      select: {
        id: true,
        set: true,
        permission: true,
      },
    });
  }

  async delete (where: Prisma.RoleWhereUniqueInput) {
    return this.prisma.role.delete({
      where,
    });
  }

  async deleteMany (where: Prisma.RoleWhereInput) {
    return this.prisma.role.deleteMany({
      where,
    });
  }

  async update (id: string, data: UpdateRoleDTO) {
    return this.prisma.role.update({
      where: {
        id,
      },
      data,
    });
  }

  get (id: string) {
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

  getAll () {
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