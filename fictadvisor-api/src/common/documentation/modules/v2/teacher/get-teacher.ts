import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { TeacherWithContactsResponse } from '@fictadvisor/utils/responses';

export const TeacherDocumentationGetTeacher: ApiDocumentationParams = {
  ok: {
    type: TeacherWithContactsResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Teacher with such id is not found`,
  },
  params: [
    {
      name: 'teacherId',
      required: true,
      description: 'Id of certain teacher',
    },
  ],
};
