import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { PollDisciplineTeachersResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses';

export const PollDocumentationGetPollDisciplineTeachers: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: PollDisciplineTeachersResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Sort must be an enum
      Wrong value for order
      Each element of discipline types should be an enum
      Discipline types must be an array
      
    InvalidEntityIdException:
      User with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [{
    name: 'userId',
    required: true,
    description: 'Id of user`s role to get teacher of his discipline',
  }],
};
