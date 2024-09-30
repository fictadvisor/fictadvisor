import { ApiDocumentationParams } from '../decorators';
import { DisciplineTeacherExtendedResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const DisciplineTeacherDocumentationCreate: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: DisciplineTeacherExtendedResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      discipline with such id is not found
      teacher with such id is not found
      
    InvalidBodyException:
      TeacherId must be a string
      Teacher id cannot be empty
      Discipline id must be a string
      Discipline id cannot be empty
      Roles cannot be empty
      Roles must be an array
      Each element of roles must be an enum`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
