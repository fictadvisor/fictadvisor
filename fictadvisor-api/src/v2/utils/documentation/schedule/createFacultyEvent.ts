import { WeekEventsResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../decorators';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const ScheduleDocumentationCreateFacultyEvent: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: WeekEventsResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Group id cannot be empty
      Name should be string
      Name is too short (min: 2)
      Name is too long (max: 150)
      Name cannot be empty
      Start time cannot be empty
      Start time must be Date
      End time cannot be empty
      End Time must be Date
      Url must be a valid URL address
      Event description is too long (max: 2000)
      Event info should be string
      
    InvalidDateException:
      Date is not valid or does not belong to this semester
      
    DataNotFoundException:
      Data were not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
