import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses';

export const TeacherDocumentationSendComplaint: ApiDocumentationParams = {
  ok: {},
  badRequest: {
    description: `\n
    InvalidEntityException:
      Group with such id is not found
      Teacher with such id is not found
      
    InvalidBodyException: 
      Full name is too short (min: 5)
      Full name is too long (max: 50)
      Title can not be empty
      Title is too short (min: 5)
      Title is too long (max: 100)
      Message can not be empty
      Message is too short (min: 10)
      Message is too long (max: 3500)`,
  },
  forbidden: DefaultForbiddenResponse,
  unauthorized: DefaultUnauthorizedResponse,
  params: [
    {
      name: 'teacherId',
      required: true,
      description: 'Id of the teacher to send complaint',
    },
  ],
};
