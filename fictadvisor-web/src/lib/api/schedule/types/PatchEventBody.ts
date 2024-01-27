import { SharedEventBody } from './shared';

export interface PatchEventBody
  extends Partial<Omit<SharedEventBody, 'eventType'>> {
  week: number;
  changeStartDate: boolean;
  changeEndDate: boolean;
  eventType: string | null;
}
