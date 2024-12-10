import { ApiDocumentationParams } from '../decorators';
import { SubjectResponse } from '@fictadvisor/utils';

export const SubjectDocumentationGet: ApiDocumentationParams = {
  ok: {
    type: SubjectResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException 
      Subject with such id is not found`,
  },
  params: [{
    name: 'subjectId',
    description: 'Subject id',
    required: true,
  }],
};
