import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { ContactResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const TeacherDocumentationUpdateContact: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: ContactResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Teacher with such id is not found
      Contact with such id is not found
      
    InvalidBodyException: 
      Name is too long (max: 100)
      Name is not correct (a-zA-Z0-9A-Я(укр.)\\\\-\\' )
      Display name is too long (max: 100)
      Link is too long (max: 200)
      Link contains wrong symbols (ASCII only)
      Link is not a url`,
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
