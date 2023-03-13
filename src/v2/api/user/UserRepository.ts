import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateUserData } from './data/CreateUserData';
import { UniqueUserDTO } from './dto/UniqueUserDTO';
import { DatabaseUtils } from '../utils/DatabaseUtils';
import { UpdateUserData } from './data/UpdateUserData';
import { RoleName } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor (private prisma: PrismaService) {}

  async create (data: CreateUserData) {
    return this.prisma.user.create({
      data,
    });
  }

  async get (id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        student: {
          include: {
            group: true,
          },
        },
      },
    });
  }

  async updateByEmail (email: string, data: UpdateUserData) {
    return this.prisma.user.update({
      where: {
        email,
      },
      data,
    });
  }

  async deleteByEmail (email: string) {
    return this.prisma.user.delete({
      where: {
        email,
      },
    });
  }

  async getByUnique (data: UniqueUserDTO) {
    return this.prisma.user.findFirst({
      where: {
        OR: Object.keys(data).map((k) => ({ [k]: data[k] })),
      },
    });
  }

  async updateByUnique (search: UniqueUserDTO, data: UpdateUserData) {
    const where = DatabaseUtils.getWhere(search);

    return this.prisma.user.updateMany({
      where,
      data,
    });
  }

  async delete (id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async update (id: string, data: UpdateUserData) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        telegramId: true,
      },
    });
  }

  async deleteRole (studentId: string) {
    return this.prisma.role.deleteMany({
      where: {
        name: RoleName.USER,
        userRoles: {
          some: {
            studentId,
          },
        },
      },
    });
  }
}
