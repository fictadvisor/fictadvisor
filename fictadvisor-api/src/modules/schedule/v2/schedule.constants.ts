import { FORTNITE, WEEK } from '../../date/v2/date.service';

// How many weeks one occurrence of an event covers. It lives here rather than in
// schedule.service so the parser can read it without importing the service: that import
// used to close a cycle (parse-queue -> general-parser -> schedule.service ->
// parse-queue) which left Nest resolving a constructor parameter as `Object`.
export const weeksPerEvent = {
  EVERY_WEEK: WEEK / WEEK,
  EVERY_FORTNIGHT: FORTNITE / WEEK,
  NO_PERIOD: 1,
};
