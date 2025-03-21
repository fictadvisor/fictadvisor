import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { SelectiveDisciplinesWithAmountResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

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
