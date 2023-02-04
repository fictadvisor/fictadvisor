import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateUserData } from './dto/CreateUserData';
import { UniqueUserDTO } from './dto/UniqueUserDTO';
import { DatabaseUtils } from '../utils/DatabaseUtils';
import { UpdateUserData } from './dto/UpdateUserData';

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
        student: true,
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
    this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async update (id: string, data: UpdateUserData) {
    this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }
}
