import { PaginatedDisciplineResourcesResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../decorators';

export const DisciplineResourceDocumentationGetAll: ApiDocumentationParams = {
  ok: {
    type: PaginatedDisciplineResourcesResponse,
  },
  badRequest: {
    description: `\n    
    InvalidBodyException:
      Page must be a number
      PageSize must be a number
      Search must be a string
      Sort must be a string
      Wrong value for order
      Search must be string
      Category id\'s must be an array
      Subject id must be UUID
      Teacher id must be UUID
      Year must be number
      Semester must be number
      
    InvalidEntityIdException: 
      Teacher with such id is not found
      Subject with such id is not found
      Resource category with such id is not found`,
  },
};