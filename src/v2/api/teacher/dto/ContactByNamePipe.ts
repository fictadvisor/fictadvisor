import { Injectable, PipeTransform } from '@nestjs/common';
import { TeacherService } from '../TeacherService';
import { InvalidContactNameException } from 'src/v2/utils/exceptions/InvalidContactNameException';

@Injectable()
export class ContactByNamePipe implements PipeTransform<string[], Promise<string[]>> {
  constructor(
    private teacherService: TeacherService
  ) {}

  async transform([teacherId, name]: string[]): Promise<string[]> {
    const contact = await this.teacherService.getContact(teacherId, name);
    if (!contact) {
      throw new InvalidContactNameException();
    }
    return [teacherId, name];
  }
}