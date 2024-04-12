import {
  AdminQuestion,
  QuestionSearchFormFields,
} from '@/app/admin/questions/common/types';

import { client } from '../instance';
import { getAuthorizationHeader } from '../utils';

import { AddQuestionBody } from './types/AddQuestionBody';
import { GetAllQuestionsResponse } from './types/GetAllQuestionsResponse';
import { UpdateQuestionBody } from './types/UpdateQuestionBody';

class QuestionAPI {
  async getAllQuestions() {
    const res = await client.get<GetAllQuestionsResponse>('/poll/questions');
    return res.data;
  }

  async getPageQuestions(
    params: Partial<QuestionSearchFormFields>,
    pageSize?: number,
    page?: number,
  ) {
    const res = await client.get<GetAllQuestionsResponse>('/poll/questions', {
      params: {
        ...params,
        pageSize,
        page,
      },
    });
    return res.data;
  }

  async addQuestion(body: AddQuestionBody) {
    return await client.post('/poll/questions', body, getAuthorizationHeader());
  }

  async getQuestion(questionId: string) {
    const res = await client.get<AdminQuestion>(
      `/poll/questions/${questionId}`,
    );
    return res.data;
  }

  async updateQuestion(questionId: string, body: UpdateQuestionBody) {
    return await client.patch(
      `/poll/questions/${questionId}`,
      body,
      getAuthorizationHeader(),
    );
  }

  async deleteQuestion(questionId: string) {
    await client.delete(
      `/poll/questions/${questionId}`,
      getAuthorizationHeader(),
    );
  }
}

export default new QuestionAPI();
