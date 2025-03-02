import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { ShortDisciplinesResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const GroupDocumentationGetDisciplines: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: ShortDisciplinesResponse,
  },
  badRequest: {
    description: `\n
    InvalidGroupIdException:
      Group with such id is not found

    DataMissingException:
      Data are missing`,
  },
  forbidden: DefaultForbiddenResponse,
  unauthorized: DefaultUnauthorizedResponse,
  params: [{
    name: 'groupId',
    required: true,
    description: 'Id of the group to get the disciplines from',
  }],
};
