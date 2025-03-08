import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client/fictadvisor';
import { PrismaService } from '../PrismaService';
import { DbTelegramGroup } from '../entities/DbTelegramGroup';
import { Include, Sort, Where } from '../prisma.repository';
import { RepositoryInterface } from '../../interfaces/repository.interface';

@Injectable()
export class TelegramGroupRepository implements RepositoryInterface<DbTelegramGroup, Prisma.TelegramGroupWhereInput> {
  constructor (private prisma: PrismaService) {}

  private include= {
    group: true,
  };

  async create (data: Prisma.TelegramGroupUncheckedCreateInput) {
    return this.prisma.telegramGroup.create({
      data,
      include: this.include,
    }) as any as DbTelegramGroup;
  }

  async findUnique (groupId_telegramId: Prisma.TelegramGroupGroupIdTelegramIdCompoundUniqueInput) {
    return this.prisma.telegramGroup.findUnique({
      where: {
        groupId_telegramId,
      },
      include: this.include,
    }) as any as DbTelegramGroup;
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
    }) as any as DbTelegramGroup;
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
    }) as any as DbTelegramGroup;
  }

  async findByGroupId (groupId: string) {
    return this.prisma.telegramGroup.findMany({
      where: {
        groupId,
      },
      include: this.include,
    }) as any as DbTelegramGroup[];
  }

  async findByTelegramId (telegramId: bigint) {
    return this.prisma.telegramGroup.findMany({
      where: {
        telegramId,
      },
      include: this.include,
    }) as any as DbTelegramGroup[];
  }

  findMany (where: Where<'telegramGroup'>,
    include?: Include<'telegramGroup'>,
    page?: { take: number; skip: number },
    sort?: Sort<'telegramGroup'>): Promise<DbTelegramGroup[]> {
    const methodInclude = {
      ...this.include,
      ...include,
    };

    return this.prisma.telegramGroup.findMany({
      where,
      orderBy: sort,
      take: page?.take,
      skip: page?.skip,
      include: Object.keys(methodInclude).length ? methodInclude : undefined,
    });
  }

  count (where: Where<'telegramGroup'>): Promise<number> {
    return this.prisma.questionAnswer.count({ where });
  }
}
