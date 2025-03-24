import { ScheduleDocumentationParse } from './parse';
import { ScheduleDocumentationGetGeneralEvents } from './get-general-events';
import { ScheduleDocumentationGetGroupEvents } from './get-group-events';
import { ScheduleDocumentationGetGroupEventsByDay } from './get-group-events-by-day';
import { ScheduleDocumentationGetGroupEventsByWeek } from './get-group-events-by-week';
import { ScheduleDocumentationGetGroupEventsByFortnight } from './get-group-events-by-fortnight';
import { ScheduleDocumentationGetEvent } from './get-event';
import { ScheduleDocumentationCreateEvent } from './create-event';
import { ScheduleDocumentationCreateFacultyEvent } from './create-faculty-event';
import { ScheduleDocumentationUpdateEvent } from './update-event';
import { ScheduleDocumentationDeleteEvent } from './delete-event';

export const ScheduleDocumentation = {
  PARSE: ScheduleDocumentationParse,
  GET_GENERAL_EVENTS: ScheduleDocumentationGetGeneralEvents,
  GET_GROUP_EVENTS: ScheduleDocumentationGetGroupEvents,
  GET_GROUP_EVENTS_BY_DAY: ScheduleDocumentationGetGroupEventsByDay,
  GET_GROUP_EVENTS_BY_WEEK: ScheduleDocumentationGetGroupEventsByWeek,
  GET_GROUP_EVENTS_BY_FORTNIGHT: ScheduleDocumentationGetGroupEventsByFortnight,
  GET_EVENT: ScheduleDocumentationGetEvent,
  CREATE_EVENT: ScheduleDocumentationCreateEvent,
  CREATE_FACULTY_EVENT: ScheduleDocumentationCreateFacultyEvent,
  UPDATE_EVENT: ScheduleDocumentationUpdateEvent,
  DELETE_EVENT: ScheduleDocumentationDeleteEvent,
};
