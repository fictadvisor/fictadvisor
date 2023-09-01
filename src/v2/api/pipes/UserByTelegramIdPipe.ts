import { Injectable, PipeTransform } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from '../../database/repositories/UserRepository';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';


@Injectable()
export class UserByTelegramIdPipe implements PipeTransform<bigint, Promise<bigint>> {
  constructor (
        private userRepository: UserRepository,
  ) {}

  async transform (telegramId: bigint) {
    try {
      telegramId = BigInt(telegramId);
    } catch (e) {
      throw new InvalidEntityIdException('User');
    }

    const user: User = await this.userRepository.find({ telegramId });
    if (!user) {
      throw new InvalidEntityIdException('User');
    }
    return telegramId;
  }
}