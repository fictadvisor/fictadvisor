import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const UserDocumentationDetachSelectiveDisciplines: ApiDocumentationParams = {
  isAuth: true,
  ok: {},
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      User with such id is not found
      Discipline with such id is not found
      
    InvalidBodyException:
      This discipline is not selective
      Discipline does not belong to this group
      Current discipline is not selected by this student`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: {
    description: `\n 
    NoPermissionException:
      You do not have permission to perform this action
      
    NotApprovedException: 
      Student is not approved`,
  },
  params: [
    {
      name: 'userId',
      required: true,
      description: 'Id of the user to detach selective disciplines',
    },
  ],
};
