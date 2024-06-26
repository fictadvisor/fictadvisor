import { Injectable, PipeTransform } from '@nestjs/common';
import { SubjectRepository } from '../../database/repositories/SubjectRepository';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';

@Injectable()
export class SubjectByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private subjectRepository: SubjectRepository
  ) {}

  async transform (id: string): Promise<string> {
    const subject = await this.subjectRepository.findById(id);
    if (!subject) {
      throw new InvalidEntityIdException('Subject');
    }
    return id;
  }
}