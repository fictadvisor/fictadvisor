import { QueryAllDisciplineResourcesDTO, UpdateDisciplineResourceDTO } from '@fictadvisor/utils/requests';
import { Injectable, PipeTransform } from '@nestjs/common';
import { TeacherByIdPipe } from './TeacherByIdPipe';
import { SubjectByIdPipe } from './SubjectByIdPipe';
import { ResourceCategoryByIdPipe } from './ResourceCategoryByIdPipe';
import { mapAsync } from '../../utils/ArrayUtil';

@Injectable()
export class DisciplineResourcesPipe implements PipeTransform {

  constructor (
    private teacherByIdPipe: TeacherByIdPipe,
    private subjectByIdPipe: SubjectByIdPipe,
    private resourceCategoryByIdPipe: ResourceCategoryByIdPipe,
  ) {}

  async transform (data: QueryAllDisciplineResourcesDTO | UpdateDisciplineResourceDTO) {
    if (data.teacherId) {
      await this.teacherByIdPipe.transform(data.teacherId);
    }
    if (data.subjectId){
      await this.subjectByIdPipe.transform(data.subjectId);
    }
    if (data.categoryIds) {
      await mapAsync(data.categoryIds, async (categoryId) => {
        await this.resourceCategoryByIdPipe.transform(categoryId);
      });
    }
    return data;
  }
}