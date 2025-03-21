import { Injectable, PipeTransform } from '@nestjs/common';
import { QueryAllSubjectsDTO } from '@fictadvisor/utils';
import { GroupByIdPipe } from './group-by-id.pipe';

@Injectable()
export class AllSubjectsPipe implements PipeTransform<QueryAllSubjectsDTO, Promise<QueryAllSubjectsDTO>> {
  constructor (
    private readonly groupByIdPipe: GroupByIdPipe,
  ) {}
  
  async transform (query: QueryAllSubjectsDTO): Promise<QueryAllSubjectsDTO> {
    if (query.groupId) {
      await this.groupByIdPipe.transform(query.groupId);
    }
    return query;
  }
}
