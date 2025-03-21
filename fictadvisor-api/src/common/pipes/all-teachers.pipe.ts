import { Injectable, PipeTransform } from '@nestjs/common';
import { QueryAllTeachersDTO } from '@fictadvisor/utils/requests';
import { mapAsync } from '../utils/array.utils';
import { GroupByIdPipe } from './group-by-id.pipe';
import { CathedraByIdPipe } from './cathedra-by-id.pipe';

@Injectable()
export class AllTeachersPipe implements PipeTransform<QueryAllTeachersDTO, Promise<QueryAllTeachersDTO>> {
  constructor (
    private readonly groupByIdPipe: GroupByIdPipe,
    private readonly cathedraByIdPipe: CathedraByIdPipe,
  ) {}

  async transform (query: QueryAllTeachersDTO): Promise<QueryAllTeachersDTO> {
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
