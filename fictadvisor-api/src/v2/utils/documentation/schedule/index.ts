import { ScheduleDocumentationParse } from './parse';
import { ScheduleDocumentationGetGeneralEvents } from './getGeneralEvents';
import { ScheduleDocumentationGetGroupEvents } from './getGroupEvents';
import { ScheduleDocumentationGetGroupEventsByDay } from './getGroupEventsByDay';
import { ScheduleDocumentationGetGroupEventsByWeek } from './getGroupEventsByWeek';
import { ScheduleDocumentationGetGroupEventsByFortnight } from './getGroupEventsByFortnight';
import { ScheduleDocumentationGetEvent } from './getEvent';
import { ScheduleDocumentationCreateEvent } from './createEvent';
import { ScheduleDocumentationCreateFacultyEvent } from './createFacultyEvent';
import { ScheduleDocumentationUpdateEvent } from './updateEvent';
import { ScheduleDocumentationDeleteEvent } from './deleteEvent';

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
