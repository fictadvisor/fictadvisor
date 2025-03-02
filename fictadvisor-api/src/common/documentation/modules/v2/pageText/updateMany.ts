import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { PageTextsResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const PageTextDocumentationUpdateMany: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: PageTextsResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Key contains wrong symbols (ASCII only)
      Key must be string
      Key cannot be empty
      Value must be string
      Link must be a string
      Link contains wrong symbols (ASCII only)
      Link must be a url
      Visibility parameter must be a boolean
      PageTexts must be an array

    InvalidEntityIdException:
      PageText with such key is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
