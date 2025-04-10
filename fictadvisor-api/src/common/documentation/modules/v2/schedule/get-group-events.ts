import { WeekEventsResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const ScheduleDocumentationGetGroupEvents: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: WeekEventsResponse,
  },
  badRequest: {
    description: `\n
    InvalidGroupIdException:
      Group with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [
    {
      name: 'groupId',
      description: 'Id of the group',
      type: String,
      required: true,
    },
  ],
  queries: [
    {
      name: 'week',
      description: 'Week number',
      type: Number,
      required: false,
    },
  ],
};
