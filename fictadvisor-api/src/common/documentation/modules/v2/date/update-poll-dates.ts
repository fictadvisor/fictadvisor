import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { PollDatesResponse } from '@fictadvisor/utils/responses';

export const DateDocumentationUpdatePollDates: ApiDocumentationParams = {
  ok: {
    type: PollDatesResponse,
  },
  badRequest: {
    description: ` \n
      InvalidBodyException:
        Start of the poll must be a valid Date
        End of the poll must be a valid Date
      
      InvalidDateException:
        Date is not valid or does not belong to this semester
      
      DataNotFoundException:
        Data was not found`,
  },
};
