import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { SubjectRepository } from '../../database/repositories/SubjectRepository';
import { CommentsQueryDTO } from '../dtos/CommentsQueryDTO';

@Injectable()
export class CommentsQueryPipe implements PipeTransform {
  constructor (
    private subjectRepository: SubjectRepository,
  ) {}

  async transform (query: CommentsQueryDTO) {
    if (query.subjectId) {
      const subject = await this.subjectRepository.findById(query.subjectId);
      if (!subject) {
        throw new InvalidEntityIdException('Subject');
      }
    }
    return query;
  }
}