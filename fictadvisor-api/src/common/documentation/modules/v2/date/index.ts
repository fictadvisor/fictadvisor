import { DateDocumentationGetPreviousSemesters } from './get-previous-semesters';
import { DateDocumentationGetCurrentSemester } from './get-current-semester';
import { DateDocumentationGetAllSemesters } from './get-all-semesters';
import { DateDocumentationCreateSemester } from './create-semester';
import { DateDocumentationUpdateSemester } from './update-semester';
import { DateDocumentationDeleteSemester } from './delete-semester';
import { DateDocumentationGetPollDates } from './get-poll-dates';
import { DateDocumentationUpdatePollDates } from './update-poll-dates';
import { DateDocumentationDeletePollDates } from './delete-poll-dates';


export const DateDocumentation = {
  GET_PREVIOUS_SEMESTERS: DateDocumentationGetPreviousSemesters,
  GET_CURRENT_SEMESTER: DateDocumentationGetCurrentSemester,
  GET_ALL_SEMESTERS: DateDocumentationGetAllSemesters,
  CREATE_SEMESTER: DateDocumentationCreateSemester,
  UPDATE_SEMESTER: DateDocumentationUpdateSemester,
  DELETE_SEMESTER: DateDocumentationDeleteSemester,
  GET_POLL_DATES: DateDocumentationGetPollDates,
  UPDATE_POLL_DATES: DateDocumentationUpdatePollDates,
  DELETE_POLL_DATES: DateDocumentationDeletePollDates,
};
