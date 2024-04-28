import { MainEventInfoResponse as APIMainEventInfoResponse } from '@fictadvisor/utils/responses';

export interface MainEventInfoResponse
  extends Omit<APIMainEventInfoResponse, 'startTime' | 'endTime'> {
  startTime: string;
  endTime: string;
}
