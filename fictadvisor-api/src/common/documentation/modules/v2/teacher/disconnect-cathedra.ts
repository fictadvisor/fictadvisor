import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { TeacherWithContactsFullResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const TeacherDocumentationDisconnectCathedra: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: TeacherWithContactsFullResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException
      Teacher with such id is not found
      Cathedra with such id is not found`,
  },
  forbidden: DefaultForbiddenResponse,
  unauthorized: DefaultUnauthorizedResponse,
  params: [
    {
      name: 'teacherId',
      required: true,
      description: 'Id of a teacher to verify',
    },
    {
      name: 'cathedraId',
      required: true,
      description: 'Id of a cathedra to verify',
    },
  ],
};
