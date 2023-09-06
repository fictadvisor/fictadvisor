import { Injectable, PipeTransform } from '@nestjs/common';
import { ContactRepository } from '../../database/repositories/ContactRepository';
import { User } from '@prisma/client';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { UserRepository } from '../../database/repositories/UserRepository';

@Injectable()
export class ContactByUserIdPipe implements PipeTransform {
  constructor (
    private contactRepository: ContactRepository,
    private userRepository: UserRepository,
  ) {}

  async transform (params: {userId: string, contactId: string}) {
    const { userId, contactId } = params;

    const user: User = await this.userRepository.findById(userId);
    if (!user) {
      throw new InvalidEntityIdException('User');
    }

    const contact = this.contactRepository.getContact(userId, contactId);
    if (!contact) {
      throw new InvalidEntityIdException('Contact');
    }

    return params;
  }
}