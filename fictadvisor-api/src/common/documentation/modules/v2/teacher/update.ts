import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { TeacherWithRolesAndCathedrasResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse } from '../../../defaultResponses';

export const TeacherDocumentationUpdate: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: TeacherWithRolesAndCathedrasResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Teacher with such id is not found
              
    InvalidBodyException:
      First name is too short (min: 2)
      First name is too long (max: 40)
      First name can not be empty
      First name is incorrect (A-Я(укр.)\\-' ))
      Middle name is too short (min: 2)
      Middle name is too long (max: 40)
      Middle name is incorrect (A-Я(укр.)\\-' ))
      Last name is too short (min: 2)
      Last name is too long (max: 40)
      Last name can not be empty
      Last name is incorrect (A-Я(укр.)\\-' ))
      Description is too long (max: 400)
      Academic status must be enum
      Scientific degree must be an enum
      Position must be an enum`,
  },
  forbidden: DefaultForbiddenResponse,
};
