import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { UserResponse } from '@fictadvisor/utils';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const UserDocumentationUploadAvatar: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: UserResponse,
    description: 'Uploaded user\'s avatar',
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      User with such id is not found
      
    DataNotFoundException: 
      Data were not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  implicitFile: {
    name: 'avatar',
    required: true,
  },
  unsupportedMediaType: {
    description: `\n
    InvalidExtensionException:
      File extension is wrong`,
  },
  payloadTooLarge: {
    description: `\n
    TooLargeSizeException:
      The file size exceeds 1 MB`,
  },
  params: [
    {
      name: 'userId',
      required: true,
      description: 'Id of a user',
    },
  ],
};
