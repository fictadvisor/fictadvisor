import { ApiDocumentationParams } from '../decorators';
import { DefaultUnauthorizedResponse } from '../defaultResponses';

export const UserDocumentationRequestNewGroup: ApiDocumentationParams = {
  isAuth: true,
  ok: {},
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      User with such id is not found

    AlreadyRegisteredException:
      User is already registered

    InvalidBodyException:
      Group id must be a string
      Group id cannot be empty
      IsCaptain must be a boolean
      IsCaptain cannot be empty

    AbsenceOfCaptainException:
      Captain was not found

    AbsenceOfCaptainTelegramException:
      Captain's telegramId was not found

    AlreadySendGroupRequestException:
      You have already send request to join this group`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: {
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action
    
    ForbiddenException:
      Forbidden`,
  },
  params: [
    {
      name: 'userId',
      required: true,
      description: 'Id of a user to request to the group',
    },
  ],
};
