import { Injectable, PipeTransform } from '@nestjs/common';
import { QueryAllSubjectDTO } from '@fictadvisor/utils';
import { GroupByIdPipe } from './group-by-id.pipe';

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
