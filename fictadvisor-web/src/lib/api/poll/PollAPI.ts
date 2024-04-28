import {
  CreateAnswersDTO,
  QueryAllDisciplineTeacherForPollDTO,
} from '@fictadvisor/utils/requests';
import {
  DisciplineTeacherQuestionsResponse,
  PollDisciplineTeachersResponse,
} from '@fictadvisor/utils/responses';

import { getAuthorizationHeader } from '@/lib/api/utils';

import { client } from '../instance';

class PollAPI {
  async getTeacherQuestions(disciplineTeacherId: string) {
    const { data } = await client.get<DisciplineTeacherQuestionsResponse>(
      `/disciplineTeachers/${disciplineTeacherId}/questions`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async createTeacherGrade(
    disciplineTeacherId: string,
    body: CreateAnswersDTO,
  ): Promise<void> {
    await client.post(
      `/disciplineTeachers/${disciplineTeacherId}/answers`,
      body,
      getAuthorizationHeader(),
    );
  }

  async getUserTeachers(
    userId: string,
    params: QueryAllDisciplineTeacherForPollDTO = {},
  ) {
    const { data } = await client.get<PollDisciplineTeachersResponse>(
      `/poll/teachers/${userId}`,
      {
        params,
        ...getAuthorizationHeader(),
      },
    );
    return data;
  }
}

export default new PollAPI();
