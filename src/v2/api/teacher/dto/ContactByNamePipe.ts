import { Injectable, type PipeTransform } from '@nestjs/common';
import { TeacherService } from '../TeacherService';
import { type Teacher } from '@prisma/client';
import { InvalidEntityIdException } from 'src/v2/utils/exceptions/InvalidEntityIdException';
import { InvalidContactNameException } from 'src/v2/utils/exceptions/InvalidContactNameException';

@Injectable()
export class ContactByNamePipe implements PipeTransform<string[], Promise<string[]>> {
  constructor (
    private readonly teacherService: TeacherService
  ) {}

  async transform ([teacherId, name]: string[]): Promise<string[]> {
    const teacher: Teacher = await this.teacherService.getTeacher(teacherId);
    if (!teacher) {
      throw new InvalidEntityIdException('teacher');
    }

    const contact = await this.teacherService.getContact(teacherId, name);
    if (!contact) {
      throw new InvalidContactNameException();
    }
    return [teacherId, name];
  }
}
