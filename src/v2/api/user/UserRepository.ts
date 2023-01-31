import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { type UpdateUserDTO } from './dto/UpdateUserDTO';
import { type CreateUserData } from './dto/CreateUserData';

@Injectable()
export class UserRepository {
  constructor (
    private readonly prisma: PrismaService
  ) {}

  async create (data: CreateUserData) {
    return await this.prisma.user.create({
      data,
    });
  }

  async get (id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        student: true,
      },
    });
  }

  async updateByEmail (
    email: string,
    data: UpdateUserDTO
  ) {
    return await this.prisma.user.update({
      where: {
        email,
      },
      data,
    });
  }

  async deleteByEmail (
    email: string
  ) {
    return await this.prisma.user.delete({
      where: {
        email,
      },
    });
  }
}
