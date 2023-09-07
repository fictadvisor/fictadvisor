import { Injectable } from '@nestjs/common';
import { TelegramGroupRepository } from '../../database/repositories/TelegramGroupRepository';
import { CreateTelegramGroupDTO } from '../dtos/CreateTelegramGroupDTO';
import { UpdateTelegramGroupDTO } from '../dtos/UpdateTelegramGroupDTO';
import { DataNotFoundException } from '../../utils/exceptions/DataNotFoundException';
import { AlreadyExistException } from '../../utils/exceptions/AlreadyExistException';

@Injectable()
export class TelegramGroupService {
  constructor (private telegramGroupRepository: TelegramGroupRepository) {}

  async create (groupId: string, body: CreateTelegramGroupDTO) {
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
    return this.telegramGroupRepository.updateById(telegramId, groupId, body);
  }

  async delete (telegramId: bigint, groupId: string) {
    return this.telegramGroupRepository.deleteById(telegramId, groupId);
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
