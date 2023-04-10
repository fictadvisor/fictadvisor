import { Injectable, PipeTransform } from '@nestjs/common';
import { ContactRepository } from './ContactRepository';
import { InvalidContactNameException } from '../../utils/exceptions/InvalidContactNameException';
import { User } from '@prisma/client';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { UserRepository } from './UserRepository';

@Injectable()
export class ContactByUserIdPipe implements PipeTransform {
  constructor (
    private contactRepository: ContactRepository,
    private userRepository: UserRepository,
  ) {}

  async transform (params: {userId: string, name: string}) {
    const { userId, name } = params;

    const user: User = await this.userRepository.findById(userId);
    if (!user) {
      throw new InvalidEntityIdException('user');
    }

    const contactName = this.contactRepository.getContact(userId, name);
    if (!contactName) {
      throw new InvalidContactNameException();
    }

    return params;
  }
}