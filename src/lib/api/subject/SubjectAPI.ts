import { SearchFormFields } from '@/components/pages/search-pages/search-form/types';
import { GetListOfSubjectsResponse } from '@/lib/api/subject/types/GetListOfSubjectsResponse';
import { GetTeachersBySubjectResponse } from '@/lib/api/subject/types/GetTeachersBySubjectResponse';

import { client } from '../instance';

class SubjectsAPI {
  async getTeachersBySubject(disciplineId: string) {
    const { data } = await client.get<GetTeachersBySubjectResponse>(
      `subjects/${disciplineId}/teachers`,
    );
    return data;
  }

  async getAll(
    { search, order, sort, group }: SearchFormFields,
    pageSize: number,
  ) {
    const { data } = await client.get<GetListOfSubjectsResponse>('/subjects', {
      params: {
        search,
        order,
        sort,
        group,
        pageSize,
      },
    });
    return data;
  }
}

export default new SubjectsAPI();
