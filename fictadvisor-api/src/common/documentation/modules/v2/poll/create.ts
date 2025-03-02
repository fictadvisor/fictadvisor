import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { QuestionWithCategoryResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const PollDocumentationCreate: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: QuestionWithCategoryResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Order is too short (min: 1)
      Order is too long (max: 50)
      Order must be a number
      Order cannot be empty
      Name is too short (min: 5)
      Name is too long (max: 50)
      Name cannot be empty
      Name must be string
      Text is too short (min: 5)
      Text is too long (max: 250)
      Text cannot be empty
      Text must be string
      Category is too short (min: 5)
      Category is too long (max: 50)
      Category cannot be empty
      Category muse be string
      Description is too long (max: 2000)
      Description must be string
      Criteria is too long (max: 2000)
      Criteria must be string
      Type must be an enum
      Display must be an enum
      Requirement parameter must be a boolean`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
