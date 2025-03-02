import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const TeacherDocumentationDelete: ApiDocumentationParams = {
  isAuth: true,
  ok: {},
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Teacher with such id is not found`,
  },
  forbidden: DefaultForbiddenResponse,
  unauthorized: DefaultUnauthorizedResponse,
  params: [
    {
      name: 'teacherId',
      required: true,
      description: 'Id of certain teacher',
    },
  ],
};
