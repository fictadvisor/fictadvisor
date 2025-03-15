import { EventResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const ScheduleDocumentationGetEvent: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: EventResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Event with such id is not found
      
    InvalidWeekException:
      Week parameter is invalid
      
    DataNotFoundException:
      Data were not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [
    {
      name: 'eventId',
      description: 'Id of the event to get',
      type: String,
      required: true,
    },
  ],
  queries: [
    {
      name: 'week',
      description: 'Week of the event',
      type: Number,
      required: true,
    },
  ],
};
