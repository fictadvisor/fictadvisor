import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { RemainingSelectivesResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const UserDocumentationGetRemainingSelectives: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: RemainingSelectivesResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      User with such id is not found
      
    InvalidQueryException:
      Year must be a number
      Year cannot be empty
      Semester must be a number
      Semester cannot be empty
      
    DataNotFoundException: 
      Data were not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
