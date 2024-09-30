import { Injectable, PipeTransform } from '@nestjs/common';
import { StudentRepository } from '../../database/repositories/StudentRepository';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';

@Injectable()
export class StudentByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private studentRepository: StudentRepository,
  ) {}

  async transform (studentId: string): Promise<string> {

    const student = await this.studentRepository.findById(studentId);

    if (!student) {
      throw new InvalidEntityIdException('Student');
    }

    return studentId;
  }
}