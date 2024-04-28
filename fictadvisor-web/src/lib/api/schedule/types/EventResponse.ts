import { EventResponse as APIEventResponse } from '@fictadvisor/utils/responses';

export interface EventResponse
  extends Omit<APIEventResponse, 'startTime' | 'endTime'> {
  startTime: string;
  endTime: string;
}
