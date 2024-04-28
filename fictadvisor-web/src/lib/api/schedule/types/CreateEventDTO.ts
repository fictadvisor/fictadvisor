import { CreateEventDTO as APICreateEventDTO } from '@fictadvisor/utils/requests';

export interface CreateEventDTO
  extends Omit<APICreateEventDTO, 'startTime' | 'endTime'> {
  startTime: string;
  endTime: string;
}
