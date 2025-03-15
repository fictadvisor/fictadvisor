import { Injectable, PipeTransform } from '@nestjs/common';
import { CommentsQueryDTO } from '@fictadvisor/utils/requests';
import { InvalidEntityIdException } from '../exceptions/invalid-entity-id.exception';
import { SubjectRepository } from '../../database/v2/repositories/subject.repository';

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
