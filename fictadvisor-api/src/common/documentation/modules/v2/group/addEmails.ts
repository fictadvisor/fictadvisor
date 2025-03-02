import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { ShortUsersResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const GroupDocumentationAddEmails: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: ShortUsersResponse,
  },
  badRequest: {
    description: `\n
    InvalidGroupIdException: 
      Group with such id is not found

    InvalidBodyException: 
      Emails cannot be empty
      Array of emails is too short (min: 1)
      Array of emails is too long (max: 50)
      There are duplicate emails
      The email is not a valid email address`,
  },
  forbidden: DefaultForbiddenResponse,
  unauthorized: DefaultUnauthorizedResponse,
  params: [{
    name: 'groupId',
    required: true,
    description: 'Id of the group to add emails of students',
  }],
};
