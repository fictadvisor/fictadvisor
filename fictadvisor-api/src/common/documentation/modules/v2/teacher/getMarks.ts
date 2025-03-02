import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { MarksResponse } from '@fictadvisor/utils/responses';

export const TeacherDocumentationGetMarks: ApiDocumentationParams = {
  ok: {
    type: MarksResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Teacher with such id is not found
      
    InvalidQueryException
      Query parameter/s is/are invalid`,
  },
};
