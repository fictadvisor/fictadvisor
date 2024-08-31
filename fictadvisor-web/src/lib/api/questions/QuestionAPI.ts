import {
  CreateQuestionDTO,
  QueryAllQuestionDTO,
  UpdateQuestionDTO,
} from '@fictadvisor/utils/requests';
import {
  PaginatedQuestionsResponse,
  QuestionResponse,
  QuestionWithRolesResponse,
} from '@fictadvisor/utils/responses';

import { client } from '../instance';
class QuestionAPI {
  async getPageQuestions(params: QueryAllQuestionDTO = {}) {
    const { data } = await client.get<PaginatedQuestionsResponse>(
      '/poll/questions',
      {
        params,
      },
    );
    return data;
  }

  async addQuestion(body: CreateQuestionDTO) {
    const { data } = await client.post<QuestionResponse>(
      '/poll/questions',
      body,
    );
    return data;
  }

  async getQuestion(questionId: string) {
    const { data } = await client.get<QuestionWithRolesResponse>(
      `/poll/questions/${questionId}`,
    );
    return data;
  }

  async updateQuestion(questionId: string, body: UpdateQuestionDTO) {
    const { data } = await client.patch<QuestionResponse>(
      `/poll/questions/${questionId}`,
      body,
    );
    return data;
  }

  async deleteQuestion(questionId: string) {
    const { data } = await client.delete<QuestionResponse>(
      `/poll/questions/${questionId}`,
    );
    return data;
  }
}

export default new QuestionAPI();
