import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { PaginatedQuestionCommentsResponse } from '@fictadvisor/utils/responses';

export const TeacherDocumentationGetComments: ApiDocumentationParams = {
  ok: {
    type: PaginatedQuestionCommentsResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException
      Teacher with such id is not found
      Subject with such id is not found
    
    InvalidQueryException:
      Year must be a number
      Semester must be a number
      SortBy must be an enum
      Page must be a number
      PageSize must be a number
    
    DataNotFoundException: 
      Data was not found`,
  },
  params: [
    {
      name: 'teacherId',
      required: true,
      description: 'Id of the teacher to get comments',
    },
  ],
};

