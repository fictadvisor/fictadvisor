import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

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
