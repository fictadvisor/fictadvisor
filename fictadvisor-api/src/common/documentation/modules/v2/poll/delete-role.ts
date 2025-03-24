import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DisciplineTypeEnum, QuestionWithCategoriesAndRolesResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const PollDocumentationDeleteRole: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: QuestionWithCategoriesAndRolesResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Question with such id is not found
      QuestionRole was not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [
    {
      name: 'questionRole',
      enum: DisciplineTypeEnum,
      required: true,
      description: 'Question`s role, that you want to delete',
    },
    {
      name: 'questionId',
      type: String,
      required: true,
      description: 'Id of question, where you want to delete role',
    },
  ],
};
