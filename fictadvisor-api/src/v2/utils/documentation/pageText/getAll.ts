import { ApiDocumentationParams } from '../decorators';
import { PageTextsResponse } from '@fictadvisor/utils';

export const PageTextDocumentationGetAll: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: PageTextsResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Keys cannot be empty`,
  },
};
