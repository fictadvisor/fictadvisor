import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../PrismaService';

@Injectable()
export class TelegramGroupRepository {
  constructor (private prisma: PrismaService) {}

  private include= {
    group: true,
  };

  async create (data: Prisma.TelegramGroupUncheckedCreateInput) {
    return this.prisma.telegramGroup.create({
      data,
      include: this.include,
    });
  }

  async findUnique (groupId_telegramId: Prisma.TelegramGroupGroupIdTelegramIdCompoundUniqueInput) {
    return this.prisma.telegramGroup.findUnique({
      where: {
        groupId_telegramId,
      },
      include: this.include,
    });
  }

  async updateById (telegramId: bigint, groupId: string, data: Prisma.TelegramGroupUpdateInput) {
    return this.prisma.telegramGroup.update({
      where: {
        groupId_telegramId: {
          telegramId,
          groupId,
        },
      },
      data,
      include: this.include,
    });
  }

  async deleteById (telegramId: bigint, groupId: string) {
    return this.prisma.telegramGroup.delete({
      where: {
        groupId_telegramId: {
          telegramId,
          groupId,
        },
      },
      include: this.include,
    });
  }

  async findByGroupId (groupId: string) {
    return this.prisma.telegramGroup.findMany({
      where: {
        groupId,
      },
      include: this.include,
    });
  }

  async findByTelegramId (telegramId: bigint) {
    return this.prisma.telegramGroup.findMany({
      where: {
        telegramId,
      },
      include: this.include,
    });
  }
}
