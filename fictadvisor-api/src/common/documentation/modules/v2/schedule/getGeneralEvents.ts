import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { WeekGeneralEventsResponse } from '@fictadvisor/utils/responses';

export const ScheduleDocumentationGetGeneralEvents: ApiDocumentationParams = {
  ok: {
    type: WeekGeneralEventsResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Group with such id is not found`,
  },
  params: [
    {
      name: 'groupId',
      description: 'The id of the group, whose schedule will be returned',
      type: String,
      required: true,
    },
  ],
  queries: [
    {
      name: 'week',
      description: 'The number of the week of schedule',
      type: Number,
      required: false,
    },
  ],
};
