import { UpdateEventDTO as APIUpdateEventDTO } from '@fictadvisor/utils/requests';

export interface UpdateEventDTO
  extends Omit<APIUpdateEventDTO, 'startTime' | 'endTime'> {
  startTime: string;
  endTime: string;
}
