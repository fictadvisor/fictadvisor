import { Injectable, PipeTransform } from '@nestjs/common';
import { QueryAllDisciplinesDTO } from '@fictadvisor/utils/requests';
import { GroupByIdPipe } from './group-by-id.pipe';
import { TeacherByIdPipe } from './teacher-by-id.pipe';

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
