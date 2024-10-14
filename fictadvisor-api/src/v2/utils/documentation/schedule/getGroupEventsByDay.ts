import { ApiDocumentationParams } from '../decorators';
import { TelegramEventsResponse } from '@fictadvisor/utils/responses';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const ScheduleDocumentationGetGroupEventsByDay: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: TelegramEventsResponse,
  },
  badRequest: {
    description: `\n
    InvalidGroupIdException: 
      Group with such id is not found
      User with such id is not found`,
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
      name: 'userId',
      description: 'The id of the user, whose schedule will be returned',
      type: String,
      required: false,
    },
    {
      name: 'week',
      description: 'The number of the week of schedule',
      type: Number,
      required: false,
    },
    {
      name: 'day',
      description: 'The day of the week of schedule',
      type: Number,
      required: false,
    },
  ],
};
