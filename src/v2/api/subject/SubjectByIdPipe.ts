import { Injectable, PipeTransform } from '@nestjs/common';
import { Subject } from '@prisma/client';
import { SubjectService } from './SubjectService';
import { InvalidSubjectIdException } from '../../utils/exceptions/InvalidSubjectIdException';

@Injectable()
export class SubjectByIdPipe implements PipeTransform<string, Promise<Subject>> {
  constructor(
    private subjectService: SubjectService
  ) {}

  async transform(value: string): Promise<Subject> {
    const subject: Subject = await this.subjectService.get(value);
    if (!subject) {
      throw new InvalidSubjectIdException();
    }
    return subject;
  }
}