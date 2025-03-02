import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { TeacherWithRolesAndCathedrasResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse } from '../../../defaultResponses';

export const TeacherDocumentationCreate: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: TeacherWithRolesAndCathedrasResponse,
  },
  badRequest: {
    description: `\n
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
      Academic status cannot be empty
      Academic status must be enum
      Scientific degree can not be empty
      Scientific degree must be an enum
      Position cannot be empty
      Position must be an enum`,
  },
  forbidden: DefaultForbiddenResponse,
};
