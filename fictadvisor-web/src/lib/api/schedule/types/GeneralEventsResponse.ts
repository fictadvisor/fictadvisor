import {
  GeneralEventInfoResponse as APIGeneralEventInfoResponse,
  GeneralEventsResponse as APIGeneralEventsResponse,
} from '@fictadvisor/utils/responses';

export interface GeneralEventInfoResponse
  extends Omit<APIGeneralEventInfoResponse, 'startTime' | 'endTime'> {
  startTime: string;
  endTime: string;
}

export interface GeneralEventsResponse
  extends Omit<APIGeneralEventsResponse, 'events' | 'startTime'> {
  events: GeneralEventInfoResponse[];
  startTime: string;
}
