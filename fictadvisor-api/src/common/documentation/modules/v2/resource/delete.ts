import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../../default-responses.constants';

export const ResourceDocumentationDelete: ApiDocumentationParams = {
  isAuth: true,
  ok: {},
  badRequest: {
    description: `\n
    InvalidEntityId:
      Resource with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [
    {
      name: 'resourceId',
      description: 'Id of student resource',
      type: String,
      required: true,
    },
  ],
};
