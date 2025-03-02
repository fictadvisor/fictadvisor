import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { ExtendedDisciplineTeachersResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const disciplineDocumentationCreate: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: ExtendedDisciplineTeachersResponse,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  badRequest: {
    description: `\n
    InvalidBodyException:
      Group id can not be empty
      Group id must be a uuid
      Subject id can not be empty
      Subject id must be a uuid
      Semester can not be empty
      Semester must be a number
      Year can not be empty
      Year must be a number
      isSelective must be a boolean
      Description must be a string
      Discipline teachers must be an array
      Each element of array must be a DisciplineTeacher
      Teacher id can not be empty
      Teacher id must be uuid
      Each discipline type in array must be an enum
      Discipline types must be an array`,
  },
};

