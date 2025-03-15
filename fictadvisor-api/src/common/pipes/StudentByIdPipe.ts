import { Injectable, PipeTransform } from '@nestjs/common';
import { StudentRepository } from '../../database/v2/repositories/StudentRepository';
import { InvalidEntityIdException } from '../exceptions/InvalidEntityIdException';

@Injectable()
export class StudentByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private studentRepository: StudentRepository,
  ) {}

  async transform (userId: string): Promise<string> {
    const student = await this.studentRepository.findOne({ userId });
    if (!student) {
      throw new InvalidEntityIdException('Student');
    }

    return userId;
  }
}
