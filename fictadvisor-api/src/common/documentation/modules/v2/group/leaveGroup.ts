import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { OrdinaryStudentResponse } from '@fictadvisor/utils';
import { DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const GroupDocumentationLeaveGroup: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: OrdinaryStudentResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Group with such id is not found`,
  },
  forbidden: {
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action

    NotApprovedException:
      Student is not approved`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  params: [{
    name: 'groupId',
    required: true,
    description: 'Id of a group to leave',
  }],
};
