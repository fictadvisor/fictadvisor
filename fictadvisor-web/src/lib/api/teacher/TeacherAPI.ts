import { SearchFormFields } from '@/components/pages/search-pages/search-form/types';
import { GetTeacherCommentsResponse } from '@/lib/api/teacher/types/GetTeacherCommentsResponse';
import { GetTeacherDisciplinesResponse } from '@/lib/api/teacher/types/GetTeacherDisciplinesResponse';
import { GetTeacherMarksResponse } from '@/lib/api/teacher/types/GetTeacherMarksResponse';
import { GetTeachersResponse } from '@/lib/api/teacher/types/GetTeachersResponse';
import { GetTeacherSubjectsResponse } from '@/lib/api/teacher/types/GetTeacherSubjectsResponse';
import { getAuthorizationHeader } from '@/lib/api/utils';
import { Teacher, TeacherWithSubject } from '@/types/teacher';

import { client } from '../instance';

class TeacherAPI {
  async get(teacherId: string): Promise<Teacher> {
    const { data } = await client.get(
      `/teachers/${teacherId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getAll(params: Partial<SearchFormFields> = {}, pageSize?: number) {
    const { data } = await client.get<GetTeachersResponse>('/teachers', {
      params: {
        ...params,
        pageSize,
      },
    });
    return data;
  }

  async getTeacherSubjects(teacherId: string) {
    const { data } = await client.get<GetTeacherSubjectsResponse>(
      `/teachers/${teacherId}/subjects`,
    );
    return data;
  }

  async getTeacherSubject(teacherId: string, subjectId: string) {
    const { data } = await client.get<TeacherWithSubject>(
      `/teachers/${teacherId}/subjects/${subjectId}`,
    );
    return data;
  }

  async getTeacherMarks(
    teacherId: string,
    subjectId?: string,
    semester?: number,
    year?: number,
  ) {
    const { data } = await client.get<GetTeacherMarksResponse>(
      `/teachers/${teacherId}/marks`,
      {
        params: {
          semester,
          subjectId,
          year,
        },
      },
    );
    return data;
  }

  async getTeacherComments(
    teacherId: string,
    subjectId?: string,
    semester?: number,
    year?: number,
    sortBy?: string,
  ) {
    const { data } = await client.get<GetTeacherCommentsResponse>(
      `/teachers/${teacherId}/comments`,
      {
        params: {
          semester,
          subjectId,
          year,
          sortBy,
        },
      },
    );
    return data;
  }

  async getTeacherDisciplines(
    teacherId: string,
    notAnswered?: boolean,
    userId?: string,
  ) {
    const { data } = await client.get<GetTeacherDisciplinesResponse>(
      `/teachers/${teacherId}/disciplines`,
      {
        ...getAuthorizationHeader(),
        params: {
          notAnswered,
          userId,
        },
      },
    );
    return data;
  }

  async removeFromPoll(teacherId: string): Promise<void> {
    await client.post(
      `/disciplineTeachers/${teacherId}/removeFromPoll`,
      {},
      getAuthorizationHeader(),
    );
  }
}

export default new TeacherAPI();
