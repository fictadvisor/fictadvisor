import { OrdinaryStudentResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses';

export const StudentDocumentationUpdateStudent: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: OrdinaryStudentResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException: 
      First name is not correct (A-Я(укр.)\\-' )
      First name is too short (min 2)
      First name is too long (max 40)
      Last name is not correct (A-Я(укр.)\\-' )
      Last name is too short (min 2)
      Last name is too long (max 40)
      Middle name is not correct (A-Я(укр.)\\-' )
      Middle name is too long (max 40)
      Role name should be an enum
      Group id should be UUID
      
    InvalidEntityIdException:
      Student with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [
    {
      name: 'studentId',
      required: true,
      description: 'Id of a student',
    },
  ],
};
