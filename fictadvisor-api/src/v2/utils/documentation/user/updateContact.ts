import { ApiDocumentationParams } from '../decorators';
import { ContactResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const UserDocumentationUpdateContact : ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: ContactResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      User with such id is not found
      Contact with such id is not found
      
    InvalidBodyException:
      Display name is too long (max: 100)
      Name is not correct (a-zA-Z0-9A-Я(укр.)\\-' )
      Link is too long (max: 200)
      Link contains wrong symbols (ASCII only)
      Link must be a url`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [
    {
      name: 'userId',
      type: String,
      description: 'Id of a user to update contact',
    },
    {
      name: 'contactId',
      type: String,
      description: 'Id of contact to be updated',
    },
  ],
};
