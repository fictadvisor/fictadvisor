import { EventTypeEnum } from '@fictadvisor/utils/enums';

export interface Event {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  eventType: EventTypeEnum | null;
}
