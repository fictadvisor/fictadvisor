import { Injectable, PipeTransform } from '@nestjs/common';
import { QueryAllStudentDTO } from '@fictadvisor/utils/requests';
import { mapAsync } from '../helpers/array.util';
import { GroupByIdPipe } from './group-by-id.pipe';

@Injectable()
export class AllStudentsPipe implements PipeTransform<QueryAllStudentDTO, Promise<QueryAllStudentDTO>> {
  constructor (
    private readonly groupByIdPipe: GroupByIdPipe,
  ) {}

  async transform (query: QueryAllStudentDTO): Promise<QueryAllStudentDTO> {
    if (query.groups) {
      await mapAsync(query.groups, async (groupId) => {
        await this.groupByIdPipe.transform(groupId);
      });
    }
    return query;
  }
}
