import { Injectable, PipeTransform } from '@nestjs/common';
import { ContactRepository } from '../../database/v2/repositories/contact.repository';
import { UserRepository } from '../../database/v2/repositories/user.repository';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';

@Injectable()
export class ContactByUserIdPipe implements PipeTransform {
  constructor (
    private contactRepository: ContactRepository,
    private userRepository: UserRepository,
  ) {}

  async transform (params: {userId: string, contactId: string}) {
    const { userId, contactId } = params;

    const userExists = await this.userRepository.exists({ id: userId });
    if (!userExists) {
      throw new InvalidEntityIdException('User');
    }

    const contactExists = await this.contactRepository.exists({
      id: contactId,
      entityId: userId,
    });

    if (!contactExists) {
      throw new InvalidEntityIdException('Contact');
    }

    return params;
  }
}
