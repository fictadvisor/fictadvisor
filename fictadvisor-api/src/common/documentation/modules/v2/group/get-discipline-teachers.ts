import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { ExtendedDisciplinesTeachersResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses';

export const GroupDocumentationGetDisciplineTeachers: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: ExtendedDisciplinesTeachersResponse,
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
    description: 'Id of the group to get the discipline teachers from',
  }],
};
