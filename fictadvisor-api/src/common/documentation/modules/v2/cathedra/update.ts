import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { CathedraWithTeachersResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const CathedraDocumentationUpdate: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: CathedraWithTeachersResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Cathedra name is too short (min: 3)
      Cathedra name is too long (max: 150)
      Cathedra name is incorrect (A-Я(укр.)\\-' )
      Cathedra name must be string
      Abbreviation is too short (min: 1)
      Abbreviation is too long (max: 10)
      Abbreviation must be string
      Abbreviation is incorrect (A-Я(укр.)\\-' )
      Division name is too short (min: 1)
      Division name is too long (max: 10)
      Division must be string
      Division name is incorrect (A-Я(укр.)\\-' )
      Teachers to delete must be an array
      Teachers to add must be an array

    InvalidEntityIdException:
      Cathedra with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [
    {
      name: 'cathedraId',
      required: true,
      description: 'Id of a cathedra to update',
    },
  ],
};
