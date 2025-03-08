import { Injectable, PipeTransform } from '@nestjs/common';
import { User } from '@prisma/client/fictadvisor';
import { UserRepository } from '../../database/v2/repositories/UserRepository';
import { InvalidEntityIdException } from '../exceptions/InvalidEntityIdException';


@Injectable()
export class UserByIdPipe implements PipeTransform {
  constructor (
    private userRepository: UserRepository,
  ) {}

  async transform (id: string) {
    const user: User = await this.userRepository.findOne({ id });
    if (!user) {
      throw new InvalidEntityIdException('User');
    }
    return id;
  }
}
