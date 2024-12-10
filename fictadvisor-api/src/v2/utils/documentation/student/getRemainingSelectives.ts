import { RemainingSelectivesResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../decorators';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const StudentDocumentationGetRemainingSelectives: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: [RemainingSelectivesResponse],
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      User with such id is not found
      
    DataNotFoundException: 
      Data were not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [
    {
      name: 'studentId',
      required: true,
      description: 'Id of a student',
    },
  ],
};