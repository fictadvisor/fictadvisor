import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { SubjectRepository } from '../../database/repositories/SubjectRepository';

@Injectable()
export class SubjectByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private subjectRepository: SubjectRepository
  ) {}

  async transform (id: string): Promise<string> {
    const subject = await this.subjectRepository.findById(id);
    if (!subject) {
      throw new InvalidEntityIdException('subject');
    }
    return id;
  }
}