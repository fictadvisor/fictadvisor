import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';

export const AuthDocumentationVerifyExistsByUnique: ApiDocumentationParams = {
  ok: {
    type: Boolean,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)
      Username cannot be empty
      Email is not an email
      Email cannot be empty`,
  },
};
