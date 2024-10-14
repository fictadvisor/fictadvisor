import { EventResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../decorators';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const ScheduleDocumentationCreateEvent: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: EventResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Group id must be formatted according to the UUID standard
      Group id cannot be empty
      Name is too short (min: 2)
      Name is too long (max: 150)
      Name cannot be empty
      Event type must be an enum
      Teachers field must be an array
      Each element of teachers array should be of type string
      Start time cannot be empty
      Start time must be of type Date
      End time cannot be empty
      End time must be of type Date
      Period cannot be empty
      Period must be an enum
      Url must be a valid URL address
      Discipline description is too long (max: 2000)
      Event description is too long (max: 2000)
      
    ObjectIsRequiredException:
      eventType is required
      
    InvalidDateException:
      Date is not valid or does not belong to this semester
      
    DataNotFoundException:
      Data were not found`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
};
