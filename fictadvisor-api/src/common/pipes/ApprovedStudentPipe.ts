import { Injectable, PipeTransform } from '@nestjs/common';
import { StudentRepository } from '../../database/v2/repositories/StudentRepository';
import { NotApprovedException } from '../exceptions/NotApprovedException';
import { State } from '@prisma/client';

@Injectable()
export class ApprovedStudentPipe implements PipeTransform {
  constructor (
    private studentRepository: StudentRepository,
  ) {}

  async transform (userId: string) {

    const student = await this.studentRepository.findById(userId);

    if (student.state !== State.APPROVED) {
      throw new NotApprovedException();
    }
    return userId;
  }
}
