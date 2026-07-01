import { Injectable, PipeTransform } from '@nestjs/common';
import { UserRepository } from '../../database/v2/repositories/user.repository';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';

@Injectable()
export class UserByTelegramIdPipe implements PipeTransform<bigint, Promise<bigint>> {
  constructor (private userRepository: UserRepository) {}

  async transform (telegramId: bigint) {
    try {
      telegramId = BigInt(telegramId);
    } catch (e) {
      throw new InvalidEntityIdException('User');
    }

    const exists = await this.userRepository.exists({ telegramId });
    if (!exists) {
      throw new InvalidEntityIdException('User');
    }
    return telegramId;
  }
}
