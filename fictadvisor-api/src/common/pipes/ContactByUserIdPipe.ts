import { Injectable, PipeTransform } from '@nestjs/common';
import { ContactRepository } from '../../database/v2/repositories/ContactRepository';
import { UserRepository } from '../../database/v2/repositories/UserRepository';
import { User } from '@prisma/client/fictadvisor';
import { InvalidEntityIdException } from '../exceptions/InvalidEntityIdException';

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

    const contact = await this.contactRepository.getContact(userId, contactId);
    if (!contact) {
      throw new InvalidEntityIdException('Contact');
    }

    return params;
  }
}
