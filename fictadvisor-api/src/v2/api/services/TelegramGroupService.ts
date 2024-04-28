import { Injectable } from '@nestjs/common';
import {
  CreateTelegramGroupDTO,
  UpdateTelegramGroupDTO,
} from '@fictadvisor/utils/requests';
import { TelegramGroupRepository } from '../../database/repositories/TelegramGroupRepository';
import { DataNotFoundException } from '../../utils/exceptions/DataNotFoundException';
import { AlreadyExistException } from '../../utils/exceptions/AlreadyExistException';
import { ObjectIsRequiredException } from '../../utils/exceptions/ObjectIsRequiredException';
import { TelegramSource } from '@prisma/client';

@Injectable()
export class TelegramGroupService {
  constructor (private telegramGroupRepository: TelegramGroupRepository) {}

  async create (groupId: string, body: CreateTelegramGroupDTO) {
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

  async update (telegramId: bigint, groupId: string, body: UpdateTelegramGroupDTO) {
    await this.checkTelegramGroup(telegramId, groupId);
    return this.telegramGroupRepository.updateById(telegramId, groupId, body);
  }

  async delete (telegramId: bigint, groupId: string) {
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

  async getAll (groupId: string) {
    const telegramGroups = await this.telegramGroupRepository.findByGroupId(groupId);
    if (!telegramGroups.length) {
      throw new DataNotFoundException();
    }
    return telegramGroups;
  }

  async getGroupByTelegramId (telegramId: bigint) {
    return this.telegramGroupRepository.findByTelegramId(telegramId);
  }
}
