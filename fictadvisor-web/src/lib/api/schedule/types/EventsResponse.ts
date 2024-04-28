import { EventsResponse as APIEventsResponse } from '@fictadvisor/utils/responses';

import { MainEventInfoResponse } from './MainEventInfoResponse';

export interface EventsResponse
  extends Omit<APIEventsResponse, 'events' | 'startTime'> {
  events: MainEventInfoResponse[];
  startTime: string;
}
