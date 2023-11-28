import { Injectable, PipeTransform } from '@nestjs/common';
import { GroupByIdPipe } from './GroupByIdPipe';
import { QueryAllStudentDTO } from '../dtos/QueryAllStudentDTO';
import { mapAsync } from '../../utils/ArrayUtil';

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