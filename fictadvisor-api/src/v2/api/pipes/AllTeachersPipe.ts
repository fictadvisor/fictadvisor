import { Injectable, PipeTransform } from '@nestjs/common';
import { GroupByIdPipe } from './GroupByIdPipe';
import { QueryAllTeacherDTO } from '../dtos/QueryAllTeacherDTO';
import { CathedraByIdPipe } from './CathedraByIdPipe';
import { mapAsync } from '../../utils/ArrayUtil';

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