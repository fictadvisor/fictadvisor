import { Injectable, PipeTransform } from '@nestjs/common';
import { SubjectRepository } from '../../database/v2/repositories/subject.repository';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';

@Injectable()
export class SubjectByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private subjectRepository: SubjectRepository
  ) {}

  async transform (id: string): Promise<string> {
    const subject = await this.subjectRepository.findOne({ id });
    if (!subject) {
      throw new InvalidEntityIdException('Subject');
    }
    return id;
  }
}
