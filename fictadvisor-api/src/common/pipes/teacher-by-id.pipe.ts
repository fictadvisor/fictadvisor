import { Injectable, PipeTransform } from '@nestjs/common';
import { TeacherRepository } from '../../database/v2/repositories/teacher.repository';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';

@Injectable()
export class TeacherByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private teacherRepository: TeacherRepository
  ) {}

  async transform (id: string): Promise<string> {
    const teacher = await this.teacherRepository.findOne({ id });
    if (!teacher) {
      throw new InvalidEntityIdException('Teacher');
    }
    return id;
  }
}
