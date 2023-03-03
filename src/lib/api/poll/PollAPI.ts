import { getAuthorizationHeader } from '@/lib/api/utils';

import { client } from '../instance';

import { CreateQuestionBody } from './dto/CreateQuestionBody';
import { CreateTeacherGradeBody } from './dto/CreateTeacherGradeBody';
import { DeleteQuestionBody } from './dto/DeleteQuestionBody';
import { GetTeacherQuestionsDTO } from './dto/GetTeacherQuestionsDTO';
import { QuestionRolesBody } from './dto/QuestionRolesBody';

export class PollAPI {
  static async getTeacherQuestions(
    disciplineTeacherId: string,
  ): Promise<GetTeacherQuestionsDTO> {
    const { data } = await client.get(
      `/disciplineTeachers/${disciplineTeacherId}/questions`,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async createTeacherGrade(
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

  static async createQuestion(body: CreateQuestionBody) {
    const { data } = await client.post(
      `/poll/questions`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async deleteQuestion(body: DeleteQuestionBody, questionId: string) {
    const { data } = await client.delete(
      `/questions/${questionId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async questionRoles(body: QuestionRolesBody, role: string) {
    const { data } = await client.post(
      `/poll/questions/${role}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }
}
