import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { ResourceResponse } from '@fictadvisor/utils';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../../default-responses';

export const ResourceDocumentationUpdate: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: ResourceResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Name is too short (min: 3)
      Name is too long (max: 50)
      Name must be a string
      Link must be a string
      Link contains wrong symbols (ASCII only)
      Link must be a url
      Image link must be a string
      Image link contains wrong symbols (ASCII only)
      Image link must be a url
      
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
