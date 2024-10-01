import { ApiDocumentationParams } from '../decorators';
import { SelectiveDisciplinesWithAmountResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const GroupDocumentationGetSelectives: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: [SelectiveDisciplinesWithAmountResponse],
  },
  badRequest: {
    description: `\n
    InvalidGroupIdException:
      Group with such id is not found`,
  },
  forbidden: DefaultForbiddenResponse,
  unauthorized: DefaultUnauthorizedResponse,
  params: [{
    name: 'groupId',
    required: true,
    description: 'Id of the group to get the selective disciplines from',
  }],
};