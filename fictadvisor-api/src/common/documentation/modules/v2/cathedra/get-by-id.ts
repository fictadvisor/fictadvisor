import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { CathedraWithTeachersResponse } from '@fictadvisor/utils/responses';

export const CathedraDocumentationGetById: ApiDocumentationParams = {
  ok: {
    type: CathedraWithTeachersResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Cathedra with such id is not found`,
  },
  params: [
    {
      name: 'cathedraId',
      required: true,
      description: 'Id of a cathedra to get',
    },
  ],
};
