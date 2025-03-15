import { SubjectWithTeachersResponse } from '@fictadvisor/utils';
import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';

export const SubjectDocumentationGetTeachers: ApiDocumentationParams = {
  ok: {
    type: SubjectWithTeachersResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Subject with such id is not found`,
  },
  params: [{
    name: 'subjectId',
    required: true,
    description: 'Subject id',
  }],
};
