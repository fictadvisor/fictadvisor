import { EventResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const ScheduleDocumentationCreateEvent: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: EventResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Group id cannot be empty
      Group id must be formatted according to the UUID standard
      Name is too short (min: 2)
      Name is too long (max: 150)
      Name cannot be empty
      Discipline id must be formatted according to the UUID standard
      Event type must be an enum
      Teacher ids field must be an array
      Each element of teacher ids array must be formatted according to the UUID standard
      Start time cannot be empty
      Start time must be a valid Date
      End time cannot be empty
      End time must be a valid Date
      Period cannot be empty
      Period must be an enum
      Url must be a valid URL address
      Discipline description must be a string
      Discipline description is too long (max: 2000)
      Event description must be a string
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
