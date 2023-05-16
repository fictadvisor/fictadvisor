import { Injectable, PipeTransform } from '@nestjs/common';
import { TeacherService } from '../TeacherService';
import { InvalidEntityIdException } from 'src/v2/utils/exceptions/InvalidEntityIdException';
import { InvalidContactNameException } from 'src/v2/utils/exceptions/InvalidContactNameException';
import { TeacherRepository } from '../TeacherRepository';

@Injectable()
export class ContactByNamePipe implements PipeTransform {
  constructor (
    private teacherRepository: TeacherRepository,
    private teacherService: TeacherService
  ) {}

  async transform (params: {teacherId: string, name: string}) {

    const { teacherId, name } = params;

    const teacher = await this.teacherRepository.getTeacher(teacherId);
    if (!teacher) {
      throw new InvalidEntityIdException('teacher');
    }
    
    const contact = await this.teacherService.getContact(teacherId, name);
    if (!contact) {
      throw new InvalidContactNameException();
    }
    return params;
  }
}