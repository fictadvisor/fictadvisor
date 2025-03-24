import { Injectable, PipeTransform } from '@nestjs/common';
import { User } from '@prisma/client/fictadvisor';
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

    const user: User = await this.userRepository.findOne({ telegramId });
    if (!user) {
      throw new InvalidEntityIdException('User');
    }
    return telegramId;
  }
}
