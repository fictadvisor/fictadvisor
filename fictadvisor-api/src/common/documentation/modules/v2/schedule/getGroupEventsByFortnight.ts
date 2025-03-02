import { FortnightTelegramEventsResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../../../types/ApiDocumentationParams';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../defaultResponses';

export const ScheduleDocumentationGetGroupEventsByFortnight: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: FortnightTelegramEventsResponse,
  },
  badRequest: {
    description: `\n
    InvalidGroupIdException:
      Group with such id is not found
      User with such id is not found
      
    DataNotFoundException:
      Data were not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
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
      description: 'Any week number of the fortnight period',
      type: Number,
      required: false,
    },
    {
      name: 'userId',
      description: 'Id of the user, whose schedule will be returned',
      type: String,
      required: false,
    },
  ],
};
