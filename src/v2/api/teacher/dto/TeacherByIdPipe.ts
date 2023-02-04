import { Injectable, PipeTransform } from '@nestjs/common';
import { Teacher } from '@prisma/client';
import { TeacherService } from '../TeacherService';
import { InvalidEntityIdException } from 'src/v2/utils/exceptions/InvalidEntityIdException';

@Injectable()
export class TeacherByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private teacherService: TeacherService
  ) {}

  async transform (teacherId: string): Promise<string> {
    const teacher: Teacher = await this.teacherService.getTeacher(teacherId);
    if (!teacher) {
      throw new InvalidEntityIdException('teacher');
    }
    return teacherId;
  }
}