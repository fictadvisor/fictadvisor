import { Injectable, PipeTransform } from '@nestjs/common';
import { UserRepository } from '../../database/v2/repositories/user.repository';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';


@Injectable()
export class UserByIdPipe implements PipeTransform {
  constructor (
    private userRepository: UserRepository,
  ) {}

  async transform (id: string) {
    const exists = await this.userRepository.exists({ id });
    if (!exists) {
      throw new InvalidEntityIdException('User');
    }
    return id;
  }
}
