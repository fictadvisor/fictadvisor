import { Injectable, PipeTransform } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from '../../database/repositories/UserRepository';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';


@Injectable()
export class UserByIdPipe implements PipeTransform {
  constructor (
    private userRepository: UserRepository,
  ) {}

  async transform (userId: string) {
    const user: User = await this.userRepository.findById(userId);
    if (!user) {
      throw new InvalidEntityIdException('User');
    }
    return userId;
  }
}