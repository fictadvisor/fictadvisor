import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const TeacherDocumentationDeleteContact: ApiDocumentationParams = {
  isAuth: true,
  ok: {},
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Teacher with such id is not found
      Contact with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [
    {
      name: 'teacherId',
      required: true,
      description: 'Id of certain teacher',
    },
    {
      name: 'contactId',
      required: true,
      description: 'Id of certain teacher\'s contact',
    },
  ],
};
