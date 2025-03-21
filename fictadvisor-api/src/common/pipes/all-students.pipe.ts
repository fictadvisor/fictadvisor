import { Injectable, PipeTransform } from '@nestjs/common';
import { QueryAllStudentsDTO } from '@fictadvisor/utils/requests';
import { mapAsync } from '../utils/array.utils';
import { GroupByIdPipe } from './group-by-id.pipe';

@Injectable()
export class AllStudentsPipe implements PipeTransform<QueryAllStudentsDTO, Promise<QueryAllStudentsDTO>> {
  constructor (
    private readonly groupByIdPipe: GroupByIdPipe,
  ) {}

  async transform (query: QueryAllStudentsDTO): Promise<QueryAllStudentsDTO> {
    if (query.groups) {
      await mapAsync(query.groups, async (groupId) => {
        await this.groupByIdPipe.transform(groupId);
      });
    }
    return query;
  }
}
