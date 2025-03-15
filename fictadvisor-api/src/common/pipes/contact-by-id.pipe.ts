import { Injectable, PipeTransform } from '@nestjs/common';
import { TeacherRepository } from '../../database/v2/repositories/teacher.repository';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';
import { ContactRepository } from '../../database/v2/repositories/contact.repository';

@Injectable()
export class ContactByIdPipe implements PipeTransform {
  constructor (
    private teacherRepository: TeacherRepository,
    private contactRepository: ContactRepository,
  ) {}

  async transform (params: {teacherId: string, contactId: string}) {

    const { teacherId, contactId } = params;

    const teacher = await this.teacherRepository.findById(teacherId);
    if (!teacher) {
      throw new InvalidEntityIdException('Teacher');
    }

    const contact = await this.contactRepository.getContact(teacherId, contactId);
    if (!contact) {
      throw new InvalidEntityIdException('Contact');
    }
    return params;
  }
}
