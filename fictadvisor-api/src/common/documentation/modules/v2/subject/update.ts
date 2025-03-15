import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { SubjectResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses';

export const SubjectDocumentationUpdate: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: SubjectResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Subject with such id is not found
    
    InvalidBodyException: 
      Name must be a string
      Name is too short (min: 5)
      Name is too long (max: 150)
      Name cannot be empty
      Name is incorrect (a-zA-Z0-9A-Я(укр.)\\-' )(/+.,")`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [{
    name: 'subjectId',
    description: 'Subject id',
    required: true,
  }],
};
