import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { FullStudentResponse } from '@fictadvisor/utils';
import { DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const UserDocumentationVerify: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: FullStudentResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      User with such id is not found
      
    InvalidBodyException:
      State must be an enum
      State cannot be empty
      IsCaptain must be a boolean
      IsCaptain can not be empty

    AlreadyRegisteredException:
      User is already registered`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultUnauthorizedResponse,
  params: [
    {
      name: 'userId',
      required: true,
      description: 'Id of a user to verify',
    },
  ],
};
