import { EventResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../decorators';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const ScheduleDocumentationDeleteEvent: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: EventResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException: 
      Event with such id is not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [
    {
      name: 'eventId',
      description: 'Id of the event to delete',
      type: String,
      required: true,
    },
  ],
};
