import { Injectable, PipeTransform } from '@nestjs/common';
import { QueryAllStudentDTO } from '@fictadvisor/utils/requests';
import { mapAsync } from '../helpers/arrayUtils';
import { GroupByIdPipe } from './GroupByIdPipe';

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
