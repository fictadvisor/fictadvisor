import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { CathedraWithTeachersResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses';

export const CathedraDocumentationCreate: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: CathedraWithTeachersResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Cathedra name is too short (min: 3)
      Cathedra name is too long (max: 150)
      Cathedra name must be string
      Cathedra name is incorrect (A-Я(укр.)\\-' )
      Abbreviation is too short (min: 1)
      Abbreviation is too long (max: 10)
      Abbreviation can not be empty
      Abbreviation must be string
      Abbreviation is incorrect (A-Я(укр.)\\-' )
      Division name is too short (min: 1)
      Division name is too long (max: 10)
      Division must be string
      Cathedra name is incorrect (A-Я(укр.)\\\\-\\' )
      Teachers must be an array

    InvalidEntityIdException:
      Teacher with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
