import { TelegramEventsResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const ScheduleDocumentationGetGroupEventsByWeek: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: TelegramEventsResponse,
  },
  badRequest: {
    description: `\n
    InvalidGroupIdException: 
      User with such id is not found
      Group with such id is not found
      
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
      description: 'Number of the week of schedule',
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
