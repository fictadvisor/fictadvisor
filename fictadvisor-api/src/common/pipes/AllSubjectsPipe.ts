import { Injectable, PipeTransform } from '@nestjs/common';
import { QueryAllSubjectDTO } from '@fictadvisor/utils';
import { GroupByIdPipe } from './GroupByIdPipe';

@Injectable()
export class AllSubjectsPipe implements PipeTransform<QueryAllSubjectDTO, Promise<QueryAllSubjectDTO>> {
  constructor (
    private readonly groupByIdPipe: GroupByIdPipe,
  ) {}
  
  async transform (query: QueryAllSubjectDTO): Promise<QueryAllSubjectDTO> {
    if (query.groupId) {
      await this.groupByIdPipe.transform(query.groupId);
    }
    return query;
  }
}
