import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { StudyingSemester } from '@fictadvisor/utils';

export const DateDocumentationUpdateSemester: ApiDocumentationParams = {
  ok: {
    type: StudyingSemester,
  },
  badRequest: {
    description: ` \n
      InvalidBodyException:
        Start date must be a valid Date
        End date must be a valid Date
      
      InvalidDateException:
        Date is not valid or does not belong to this semester
      
      DataNotFoundException:
        Data was not found`,
  },
};
