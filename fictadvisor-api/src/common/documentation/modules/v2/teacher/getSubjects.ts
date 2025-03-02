import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { SubjectsResponse } from '@fictadvisor/utils/responses';

export const TeacherDocumentationGetSubjects: ApiDocumentationParams = {
  ok: {
    type: SubjectsResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityId:
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
