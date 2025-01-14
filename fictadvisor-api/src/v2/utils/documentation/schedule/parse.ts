import { ApiDocumentationParams } from '../decorators';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const ScheduleDocumentationParse: ApiDocumentationParams = {
  ok: {},
  badRequest: {
    description: `\n
    InvalidBodyException:
      The parser type must be an enum
      The page value must be of type number
      The year must be of type number
      Semester must be either 1 or 2
      The groups value must be of type string`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
