import { Injectable, PipeTransform } from '@nestjs/common';
import { TelegramGroupRepository } from '../../database/repositories/TelegramGroupRepository';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';

@Injectable()
export class TelegramGroupByIdPipe implements PipeTransform<bigint, Promise<bigint>> {
  constructor (private telegramGroupRepository: TelegramGroupRepository) {}
  async transform (telegramId: bigint): Promise<bigint> {
    try {
      telegramId = BigInt(telegramId);
    } catch (e) {
      throw new InvalidEntityIdException('TelegramGroup');
    }

    const telegramGroups = await this.telegramGroupRepository.findByTelegramId(telegramId);

    if (!telegramGroups.length) {
      throw new InvalidEntityIdException('TelegramGroup');
    }
    return telegramId;
  }
}