import {
  CreateQuestionDTO,
  QueryAllQuestionsDTO,
  UpdateQuestionDTO,
} from '@fictadvisor/utils/requests';
import {
  PaginatedQuestionsResponse,
  QuestionWithCategoryResponse,
} from '@fictadvisor/utils/responses';

import { client } from '../instance';
class QuestionAPI {
  async getPageQuestions(params: QueryAllQuestionsDTO = {}) {
    const { data } = await client.get<PaginatedQuestionsResponse>(
      '/poll/questions',
      {
        params,
      },
    );
    return data;
  }

  async addQuestion(body: CreateQuestionDTO) {
    const { data } = await client.post<QuestionWithCategoryResponse>(
      '/poll/questions',
      body,
    );
    return data;
  }

  async getQuestion(questionId: string) {
    const { data } = await client.get<QuestionWithCategoryResponse>(
      `/poll/questions/${questionId}`,
    );
    return data;
  }

  async updateQuestion(questionId: string, body: UpdateQuestionDTO) {
    const { data } = await client.patch<QuestionWithCategoryResponse>(
      `/poll/questions/${questionId}`,
      body,
    );
    return data;
  }

  async deleteQuestion(questionId: string) {
    const { data } = await client.delete<QuestionWithCategoryResponse>(
      `/poll/questions/${questionId}`,
    );
    return data;
  }
}

export default new QuestionAPI();
