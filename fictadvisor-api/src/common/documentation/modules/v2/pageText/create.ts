import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { PageTextResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const PageTextDocumentationCreate: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: PageTextResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Key contains wrong symbols (ASCII only)
      Key must be string
      Key cannot be empty
      Value must be string
      Value cannot be empty
      Link must be a string
      Link contains wrong symbols (ASCII only)
      Link must be a url
      Visibility parameter must be a boolean

    AlreadyExistException:
      PageText with such key already exist`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
