import { Injectable, PipeTransform } from '@nestjs/common';
import { TeacherRepository } from '../../database/repositories/TeacherRepository';
import { InvalidEntitySlugException } from 'src/v2/utils/exceptions/InvalidEntitySlugException';

@Injectable()
export class TeacherBySlugPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private teacherRepository: TeacherRepository
  ) {}

  async transform (slug: string): Promise<string> {
    const teacher = await this.teacherRepository.find({ slug });
    if (!teacher) {
      throw new InvalidEntitySlugException('Teacher');
    }
    return slug;
  }
}
