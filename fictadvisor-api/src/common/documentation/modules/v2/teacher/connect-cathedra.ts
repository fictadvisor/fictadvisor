import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { TeacherWithContactsFullResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse } from '../../../default-responses';

export const TeacherDocumentationConnectCathedra: ApiDocumentationParams = {
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
  params: [
    {
      name: 'teacherId',
      required: true,
      description: 'Id of the teacher',
    },
    {
      name: 'cathedraId',
      required: true,
      description: 'Id of the cathedra',
    },
  ],
};


