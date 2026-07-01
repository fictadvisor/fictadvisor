import { Injectable, PipeTransform } from '@nestjs/common';
import { TeacherRepository } from '../../database/v2/repositories/teacher.repository';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';
import { ContactRepository } from '../../database/v2/repositories/contact.repository';

@Injectable()
export class ContactByTeacherIdPipe implements PipeTransform {
  constructor (
    private teacherRepository: TeacherRepository,
    private contactRepository: ContactRepository,
  ) {}

  async transform (params: {teacherId: string, contactId: string}) {

    const { teacherId, contactId } = params;

    const teacherExists = await this.teacherRepository.exists({ id: teacherId });
    if (!teacherExists) {
      throw new InvalidEntityIdException('Teacher');
    }

    const contactExists = await this.contactRepository.exists({
      id: contactId,
      entityId: teacherId,
    });

    if (!contactExists) {
      throw new InvalidEntityIdException('Contact');
    }
    return params;
  }
}
