import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client/fictadvisor';
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

  async create (data: Prisma.RoleUncheckedCreateInput) {
    return this.prisma.role.create({
      data,
      include: this.include,
    }) as any as DbRole;
  }

  async delete (where: Prisma.RoleWhereUniqueInput) {
    return this.prisma.role.delete({
      where,
      include: this.include,
    }) as any as DbRole;
  }

  async deleteById (id:string) {
    return this.prisma.role.delete({
      where: {
        id,
      },
      include: this.include,
    }) as any as DbRole;
  }

  async deleteMany (where: Prisma.RoleWhereInput) {
    return this.prisma.role.deleteMany({
      where,
    }) as any as DbRole[];
  }
  
  async update (where: Prisma.RoleWhereUniqueInput, data: Prisma.RoleUncheckedUpdateInput) {
    return this.prisma.role.update({
      where,
      data,
      include: this.include,
    }) as any as DbRole;
  }
  
  async updateById (id: string, data: Prisma.RoleUncheckedUpdateInput) {
    return this.prisma.role.update({
      where: {
        id,
      },
      data,
      include: this.include,
    }) as any as DbRole;
  }

  async updateMany (where: Prisma.RoleWhereInput, data: Prisma.RoleUncheckedUpdateInput) {
    return this.prisma.role.updateMany({
      where,
      data,
    }) as any as DbRole[];
  }

  async find (where: Prisma.RoleWhereInput) {
    return this.prisma.role.findFirst({
      where,
      include: this.include,
    }) as any as DbRole;
  }

  async findById (id: string): Promise<DbRole> {
    return this.prisma.role.findFirst({
      where: {
        id,
      },
      include: this.include,
    }) as any as DbRole;
  }
  
  async findMany (args?: Prisma.RoleFindManyArgs) {
    return this.prisma.role.findMany({
      include: this.include,
      ...args,
    }) as any as DbRole[];
  }

  async count (data: Prisma.RoleCountArgs) {
    return this.prisma.role.count(
      data,
    );
  }
}
