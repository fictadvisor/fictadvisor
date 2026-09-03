import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { StudyingSemester } from '@fictadvisor/utils';

export const DateDocumentationCreateSemester: ApiDocumentationParams = {
  ok: {
    type: StudyingSemester,
  },
  badRequest: {
    description: ` \n
      InvalidBodyException:
        Year cannot be empty
        Semester must be either 1 or 2
        Start date must be a valid Date
        End date must be a valid Date
      
      InvalidDateException:
        Date is not valid or does not belong to this semester
      
      AlreadyExistException:
        Semester already exist`,
  },
};
