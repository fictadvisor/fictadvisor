import { Injectable, PipeTransform } from '@nestjs/common';
import { GroupByIdPipe } from './GroupByIdPipe';
import { TeacherByIdPipe } from './TeacherByIdPipe';
import { QueryAllDisciplinesDTO } from '../dtos/QueryAllDisciplinesDTO';

@Injectable()
export class QueryAllDisciplinesPipe implements PipeTransform<QueryAllDisciplinesDTO, Promise<QueryAllDisciplinesDTO>> {
  constructor (
    private readonly groupByIdPipe: GroupByIdPipe,
    private readonly teacherByIdPipe: TeacherByIdPipe,
  ) {}

  async transform (query: QueryAllDisciplinesDTO): Promise<QueryAllDisciplinesDTO> {
    if (query.groups) {
      await Promise.all(query.groups?.map((groupId) => this.groupByIdPipe.transform(groupId)));
    }

    if (query.teachers) {
      await Promise.all(query.teachers?.map((teacherId) => this.teacherByIdPipe.transform(teacherId)));
    }

    return query;
  }
}
