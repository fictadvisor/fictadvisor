import { SimpleStudentResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses';

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
