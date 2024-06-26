import { Injectable, PipeTransform } from '@nestjs/common';
import { TeacherRepository } from '../../database/repositories/TeacherRepository';
import { InvalidEntityIdException } from 'src/v2/utils/exceptions/InvalidEntityIdException';

@Injectable()
export class TeacherByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private teacherRepository: TeacherRepository
  ) {}

  async transform (teacherId: string): Promise<string> {
    const teacher = await this.teacherRepository.findById(teacherId);
    if (!teacher) {
      throw new InvalidEntityIdException('Teacher');
    }
    return teacherId;
  }
}
