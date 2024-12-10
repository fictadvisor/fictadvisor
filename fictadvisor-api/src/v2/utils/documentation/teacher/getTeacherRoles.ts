import { ApiDocumentationParams } from 'src/v2/utils/documentation/decorators';
import { TeacherRolesResponse } from '@fictadvisor/utils/responses';

export const TeacherDocumentationGetTeacherRoles: ApiDocumentationParams = {
  ok: {
    type: TeacherRolesResponse,
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
