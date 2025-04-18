import { Injectable } from '@nestjs/common';
import {
  CreateTelegramGroupDTO,
  UpdateTelegramGroupDTO,
} from '@fictadvisor/utils/requests';
import { TelegramGroupRepository } from '../../../database/v2/repositories/telegram-group.repository';
import { DataNotFoundException } from '../../../common/exceptions/data-not-found.exception';
import { AlreadyExistException } from '../../../common/exceptions/already-exist.exception';
import { ObjectIsRequiredException } from '../../../common/exceptions/object-is-required.exception';
import { TelegramSource } from '@prisma/client/fictadvisor';
import { DbTelegramGroup } from '../../../database/v2/entities/telegram-group.entity';

@Injectable()
export class TelegramGroupService {
  constructor (private telegramGroupRepository: TelegramGroupRepository) {}

  async create (groupId: string, body: CreateTelegramGroupDTO)
    : Promise<DbTelegramGroup> {
    if (body.source === TelegramSource.CHAT_WITH_THREADS && !body.threadId) {
      throw new ObjectIsRequiredException('Thread ID');
    }

    const telegramGroup = await this.telegramGroupRepository.findUnique({
      telegramId: body.telegramId,
      groupId,
    });
    if (telegramGroup) {
      throw new AlreadyExistException('TelegramGroup');
    }

    return this.telegramGroupRepository.create({
      ...body,
      groupId,
    });
  }

  async update (telegramId: bigint, groupId: string, body: UpdateTelegramGroupDTO)
    : Promise<DbTelegramGroup> {
    await this.checkTelegramGroup(telegramId, groupId);
    return this.telegramGroupRepository.updateById(telegramId, groupId, body);
  }

  async delete (telegramId: bigint, groupId: string) : Promise<DbTelegramGroup> {
    await this.checkTelegramGroup(telegramId, groupId);
    return this.telegramGroupRepository.deleteById(telegramId, groupId);
  }

  async checkTelegramGroup (telegramId: bigint, groupId: string): Promise<void> {
    const telegramGroup = await this.telegramGroupRepository.findUnique({
      telegramId,
      groupId,
    });
    if (!telegramGroup) {
      throw new DataNotFoundException();
    }
  }

  async getAll (groupId: string): Promise<DbTelegramGroup[]> {
    const telegramGroups = await this.telegramGroupRepository.findByGroupId(groupId);
    if (!telegramGroups.length) {
      throw new DataNotFoundException();
    }
    return telegramGroups;
  }

  async getGroupByTelegramId (telegramId: bigint): Promise<DbTelegramGroup[]> {
    return this.telegramGroupRepository.findByTelegramId(telegramId);
  }
}
