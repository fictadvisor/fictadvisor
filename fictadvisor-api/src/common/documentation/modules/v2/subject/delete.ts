import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';
import { SubjectResponse } from '@fictadvisor/utils';

export const SubjectDocumentationDelete: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: SubjectResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Subject with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [{
    name: 'subjectId',
    description: 'Subject id',
    required: true,
  }],
};
