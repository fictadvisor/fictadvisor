import { SimpleStudentResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const StudentDocumentationGetStudent: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: SimpleStudentResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Student with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [
    {
      name: 'studentId',
      required: true,
      description: 'Id of a student',
    },
  ],
};
