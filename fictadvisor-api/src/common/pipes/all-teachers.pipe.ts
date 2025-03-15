import { Injectable, PipeTransform } from '@nestjs/common';
import { QueryAllTeacherDTO } from '@fictadvisor/utils/requests';
import { mapAsync } from '../helpers/array.util';
import { GroupByIdPipe } from './group-by-id.pipe';
import { CathedraByIdPipe } from './cathedra-by-id.pipe';

@Injectable()
export class AllTeachersPipe implements PipeTransform<QueryAllTeacherDTO, Promise<QueryAllTeacherDTO>> {
  constructor (
    private readonly groupByIdPipe: GroupByIdPipe,
    private readonly cathedraByIdPipe: CathedraByIdPipe,
  ) {}

  async transform (query: QueryAllTeacherDTO): Promise<QueryAllTeacherDTO> {
    if (query.groupId) {
      await this.groupByIdPipe.transform(query.groupId);
    }
    if (query.cathedrasId) {
      await mapAsync(query.cathedrasId, async (cathedraId) => {
        await this.cathedraByIdPipe.transform(cathedraId);
      });
    }
    return query;
  }
}
