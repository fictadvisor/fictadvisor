import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../PrismaService';
import { DbGoogleUser } from '../entities/DbGoogleUser';

@Injectable()
export class GoogleUserRepository {
  constructor (
    private prisma: PrismaService,
  ) {}

  async findById (googleId: string): Promise<DbGoogleUser> {
    return this.prisma.googleUser.findUnique({
      where: {
        googleId,
      },
    });
  }

  async create (data: Prisma.GoogleUserUncheckedCreateInput): Promise<DbGoogleUser> {
    return this.prisma.googleUser.create({
      data,
    });
  }

  async updateById (googleId: string, data: Prisma.GoogleUserUncheckedUpdateInput): Promise<DbGoogleUser> {
    return this.prisma.googleUser.update({
      where: {
        googleId,
      },
      data,
    });
  }

  async deleteById (googleId): Promise<DbGoogleUser> {
    return this.prisma.googleUser.delete({
      where: {
        googleId,
      },
    });
  }
}
