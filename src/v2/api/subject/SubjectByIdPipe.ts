import { Injectable, PipeTransform } from '@nestjs/common';
import { Subject } from '@prisma/client';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { SubjectRepository } from './SubjectRepository';

@Injectable()
export class SubjectByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private subjectRepository: SubjectRepository
  ) {}

  async transform (value: string): Promise<string> {
    const subject: Subject = await this.subjectRepository.get(value);
    if (!subject) {
      throw new InvalidEntityIdException('subject');
    }
    return value;
  }
}