import { EventResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses';

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
      name: 'groupId',
      description: 'Id of the event group',
      type: String,
      required: true,
    },
    {
      name: 'eventId',
      description: 'Id of the event to delete',
      type: String,
      required: true,
    },
  ],
};
