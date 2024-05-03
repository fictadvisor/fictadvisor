import { SearchFormFields } from '@/app/(main)/(search-pages)/search-form/types';
import { GetListOfSubjectsResponse } from '@/lib/api/subject/types/GetListOfSubjectsResponse';
import { GetTeachersBySubjectResponse } from '@/lib/api/subject/types/GetTeachersBySubjectResponse';
import { getAuthorizationHeader } from '@/lib/api/utils';
import { Subject } from '@/types/subject';

import { client } from '../instance';

class SubjectsAPI {
  async getTeachersBySubject(disciplineId: string) {
    const { data } = await client.get<GetTeachersBySubjectResponse>(
      `subjects/${disciplineId}/teachers`,
    );
    return data;
  }
  async getSubject(subjectId: string) {
    const { data } = await client.get<Subject>(
      `subjects/${subjectId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async createSubject(name: string) {
    return await client.post<Subject>(
      `/subjects`,
      { name: name },
      getAuthorizationHeader(),
    );
  }

  async editSubject(id: string, name: string) {
    await client.patch<Subject>(
      `/subjects/${id}`,
      { name: name },
      getAuthorizationHeader(),
    );
  }

  async getAll(
    params: Partial<SearchFormFields> = {},
    pageSize?: number,
    page?: number,
  ) {
    const { data } = await client.get<GetListOfSubjectsResponse>('/subjects', {
      params: {
        ...params,
        pageSize,
        page,
      },
    });
    return data;
  }

  async getPage(
    params: Partial<SearchFormFields> = {},
    pageSize?: number,
    page?: number,
  ) {
    const { data } = await client.get<GetListOfSubjectsResponse>('/subjects', {
      params: {
        ...params,
        pageSize,
        page,
      },
    });
    return data;
  }

  async delete(subjectId: string) {
    await client.delete(`/subjects/${subjectId}`, getAuthorizationHeader());
  }
}

export default new SubjectsAPI();
