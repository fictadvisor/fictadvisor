import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';
import { DbRole } from '../entities/DbRole';

@Injectable()
export class RoleRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  private include = {
    grants: true,
    groupRole: true,
    userRoles: true,
  };

  create (data: Prisma.RoleUncheckedCreateInput) {
    return this.prisma.role.create({
      data,
      include: this.include,
    });
  }

  async delete (where: Prisma.RoleWhereUniqueInput) {
    return this.prisma.role.delete({
      where,
      include: this.include,
    });
  }

  async deleteById (id:string) {
    return this.prisma.role.delete({
      where: {
        id,
      },
      include: this.include,
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
      include: this.include,
    });
  }
  
  async updateById (id: string, data: Prisma.RoleUncheckedUpdateInput) {
    return this.prisma.role.update({
      where: {
        id,
      },
      data,
      include: this.include,
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
      include: this.include,
    });
  }

  findById (id: string): Promise<DbRole> {
    return this.prisma.role.findFirst({
      where: {
        id,
      },
      include: this.include,
    });
  }
  
  findMany (args?: Prisma.RoleFindManyArgs) {
    return this.prisma.role.findMany({
      ...args,
      include: this.include,
    }) as unknown as Promise<DbRole[]>;
  }
}