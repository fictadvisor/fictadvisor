import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { ResourceResponse } from '@fictadvisor/utils';
import {
  DefaultForbiddenResponse,
  DefaultUnauthorizedResponse,
} from '../../../defaultResponses';

export const ResourceDocumentationCreate: ApiDocumentationParams = {
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
      Name cannot be empty
      Link must be a string
      Link contains wrong symbols (ASCII only)
      Link must be a url
      Link cannot be empty
      Image link must be a string
      Image link contains wrong symbols (ASCII only)
      Image link must be a url
      Icon cannot be empty`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
