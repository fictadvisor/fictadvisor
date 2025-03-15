import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { FullStudentResponse } from '@fictadvisor/utils';
import { DefaultUnauthorizedResponse } from '../../../default-responses';

export const UserDocumentationChangeGroup: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: FullStudentResponse,
    description: 'Changed user\'s group',
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      User with such id is not found
      Group with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: {
    description: `\n
    NotApprovedException: 
      Student is not approved
      
    NoPermissionException: 
      You do not have permission to perform this action`,
  },
  params: [
    {
      name: 'userId',
      required: true,
      description: 'Id of a user',
    },
    {
      name: 'groupId',
      required: true,
      description: 'Id of a group',
    },
  ],
};
