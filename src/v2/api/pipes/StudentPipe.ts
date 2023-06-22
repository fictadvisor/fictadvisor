import { Injectable, PipeTransform } from '@nestjs/common';
import { StudentRepository } from '../../database/repositories/StudentRepository';
import { State } from '@prisma/client';
import { NotApprovedException } from '../../utils/exceptions/NotApprovedException';

@Injectable()
export class StudentPipe implements PipeTransform {
  constructor (
    private studentRepository: StudentRepository,
  ) {}

  async transform (userId) {

    const student = await this.studentRepository.findById(userId);

    if (student.state !== State.APPROVED) {
      throw new NotApprovedException();
    }
    return userId;
  }
}