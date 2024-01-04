import { CreateTeacherGradeBody } from '@/lib/api/poll/types/CreateTeacherGradeBody';
import { GetTeacherQuestionsResponse } from '@/lib/api/poll/types/GetTeacherQuestionsResponse';
import { PollTeachersResponse } from '@/lib/api/poll/types/PollTeachersResponse';
import { getAuthorizationHeader } from '@/lib/api/utils';

import { client } from '../instance';

class PollAPI {
  async getTeacherQuestions(disciplineTeacherId: string) {
    const { data } = await client.get<GetTeacherQuestionsResponse>(
      `/disciplineTeachers/${disciplineTeacherId}/questions`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async createTeacherGrade(
    body: CreateTeacherGradeBody,
    disciplineTeacherId: string,
  ) {
    const { data } = await client.post(
      `/disciplineTeachers/${disciplineTeacherId}/answers`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getUserTeachers(userId: string) {
    const { data } = await client.get<PollTeachersResponse>(
      `/poll/teachers/${userId}`,
      getAuthorizationHeader(),
    );

    return data;
  }
}

export default new PollAPI();
