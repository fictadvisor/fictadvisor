import { EventsResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../decorators';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const ScheduleDocumentationCreateFacultyEvent: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: EventsResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Name must be a string
      Name is too short (min: 2)
      Name is too long (max: 150)
      Name cannot be empty
      Start time cannot be empty
      Start time must be a valid Date
      End time cannot be empty
      End time must be a valid Date
      Url must be a valid URL address
      Event description must be a string
      Event description is too long (max: 2000)
      
    InvalidDateException:
      Date is not valid or does not belong to this semester
      
    DataNotFoundException:
      Data were not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
