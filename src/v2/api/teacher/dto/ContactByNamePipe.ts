import { Injectable, PipeTransform } from '@nestjs/common';
import { Contact } from '@prisma/client';
import { TeacherService } from '../TeacherService';
import { InvalidEntityIdException } from 'src/v2/utils/exceptions/InvalidEntityIdException';

@Injectable()
export class ContactByNamePipe implements PipeTransform<string[], Promise<string[]>> {
  constructor(
    private teacherService: TeacherService
  ) {}

  async transform([teacherId, name]: string[]): Promise<string[]> {
    const contact = await this.teacherService.getContact(teacherId, name);
    if (!contact) {
      throw new InvalidEntityIdException('contact');
    }
    return [teacherId, name];
  }
}