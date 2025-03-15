import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { MappedGroupResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const GroupDocumentationCreate: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: MappedGroupResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException: 
      Proper name is expected
      Code can not be empty
      Code must be a string
      Educational program id cannot be empty
      Educational program id must be a string
      Educational program id must be UUID
      Cathedra id cannot be empty
      Cathedra id must be a string
      Cathedra id must be UUID
      Admission year must be a number
      Admission year cannot be empty

    InvalidEntityIdException:
      Educational program with such id is not found
      Cathedra with such id is not found`,
  },
  forbidden: DefaultForbiddenResponse,
  unauthorized: DefaultUnauthorizedResponse,
};
