import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  create (data: Prisma.RoleUncheckedCreateInput) {
    return this.prisma.role.create({
      data,
      include: {
        groupRole: true,
        userRoles: true,
        grants: true,
      },
    });
  }

  async delete (where: Prisma.RoleWhereUniqueInput) {
    return this.prisma.role.delete({
      where,
      include: {
        grants: true,
        groupRole: true,
        userRoles: true,
      },
    });
  }

  async deleteById (id:string) {
    return this.prisma.role.delete({
      where: {
        id,
      },
      include: {
        grants: true,
        groupRole: true,
        userRoles: true,
      },
    });
  }

  async deleteMany (where: Prisma.RoleWhereInput) {
    return this.prisma.role.deleteMany({
      where,
    });
  }
  
  async update (where: Prisma.RoleWhereUniqueInput, data: Prisma.RoleUncheckedUpdateInput) {
    return this.prisma.role.update({
      where,
      data,
      include: {
        grants: true,
        groupRole: true,
        userRoles: true,
      },
    });
  }
  
  async updateById (id: string, data: Prisma.RoleUncheckedUpdateInput) {
    return this.prisma.role.update({
      where: {
        id,
      },
      data,
      include: {
        grants: true,
        groupRole: true,
        userRoles: true,
      },
    });
  }

  async updateMany (where: Prisma.RoleWhereInput, data: Prisma.RoleUncheckedUpdateInput) {
    return this.prisma.role.updateMany({
      where,
      data,
    });
  }

  find (where: Prisma.RoleWhereInput) {
    return this.prisma.role.findFirst({
      where,
      include: {
        grants: true,
        groupRole: true,
        userRoles: true,
      },
    });
  }

  findById (id: string) {
    return this.prisma.role.findFirst({
      where: {
        id,
      },
      include: {
        grants: true,
        groupRole: true,
        userRoles: true,
      },
    });
  }
  
  findMany (where?: Prisma.RoleWhereInput) {
    return this.prisma.role.findMany({
      where,
      include: {
        grants: true,
        groupRole: true,
        userRoles: true,
      },
    });
  }
}