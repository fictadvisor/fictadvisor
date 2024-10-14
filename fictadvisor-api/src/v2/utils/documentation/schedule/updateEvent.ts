import { EventResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../decorators';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../defaultResponses';

export const ScheduleDocumentationUpdateEvent: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: EventResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Name is too short (min: 2)
      Name is too long (max: 150)
      Event type must be an enum
      Teachers field must be an array
      Each value of the teachers array must be of type string
      Start time field must be of type Date
      End time field must be of type Date
      Period must be an enum
      Url field must be a valid URL address
      Discipline description is too long (max: 2000)
      Event description is too long (max: 2000)
    
    ObjectIsRequiredException:
      disciplineType is required
      startTime is required
      endTime is required
      
    InvalidEntityIdException: 
      Event with such id is not found
      Teacher with such id is not found
      Discipline with such id is not found
    
    InvalidWeekException:
      Week parameter is invalid`,
  },
  unauthorized: DefaultUnauthorizedResponse,
  forbidden: DefaultForbiddenResponse,
  params: [
    {
      name: 'eventId',
      description: 'Id of the event to update',
      type: String,
      required: true,
    },
  ],
};
