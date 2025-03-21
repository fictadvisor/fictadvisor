import { EventResponse } from '@fictadvisor/utils/responses';
import { ApiDocumentationParams } from '../../../types/api-documentation-params.type';
import { DefaultForbiddenResponse, DefaultUnauthorizedResponse } from '../../../default-responses.constants';

export const ScheduleDocumentationUpdateEvent: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: EventResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Week cannot be empty
      Week must be a number
      Name is too short (min: 2)
      Name is too long (max: 150)
      Discipline id must be formatted according to the UUID standard
      Event type must be an enum
      Teacher ids field must be an array
      Each element of teacherIds array must be formatted according to the UUID standard
      Start time must be a valid Date
      Change start date must be a boolean
      End time must be a valid Date
      Change end date must be a boolean
      Period must be an enum
      Url field must be a valid URL address
      Discipline info must be a string
      Discipline description is too long (max: 2000)
      Event description must be a string
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
      name: 'groupId',
      description: 'Id of the event group',
      type: String,
      required: true,
    },
    {
      name: 'eventId',
      description: 'Id of the event to update',
      type: String,
      required: true,
    },
  ],
};
