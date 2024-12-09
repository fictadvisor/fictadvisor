import { ApiDocumentationParams } from '../decorators';
import { DisciplinesResponse } from '@fictadvisor/utils/responses';

export const disciplineDocumentationGetAll: ApiDocumentationParams = {
  ok: {
    type: DisciplinesResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException: 
      Groups must be an array
      Groups must be an UUID
      Each value of semesters must be an studying semester
      Teachers must be an array
      Teachers must be an UUID
      Wrong value for sort
      Year must be a number
      Semester must be a number
      
    InvalidEntityIdException:
      Group with such id is not found
      Teacher with such id is not found`,
  },
};
