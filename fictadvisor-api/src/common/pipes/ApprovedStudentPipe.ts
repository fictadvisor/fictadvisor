import { Injectable, PipeTransform } from '@nestjs/common';
import { StudentRepository } from '../../database/v2/repositories/StudentRepository';
import { NotApprovedException } from '../exceptions/NotApprovedException';
import { State } from '@prisma/client/fictadvisor';

@Injectable()
export class ApprovedStudentPipe implements PipeTransform {
  constructor (
    private studentRepository: StudentRepository,
  ) {}

  async transform (userId: string) {
    const student = await this.studentRepository.findOne({ userId });
    if (student.state !== State.APPROVED) {
      throw new NotApprovedException();
    }

    return userId;
  }
}
