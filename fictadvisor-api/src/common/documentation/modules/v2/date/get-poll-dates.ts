import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { PollDatesListResponse } from '@fictadvisor/utils/responses';

export const DateDocumentationGetPollDates: ApiDocumentationParams = {
  ok: {
    type: PollDatesListResponse,
  },
};
