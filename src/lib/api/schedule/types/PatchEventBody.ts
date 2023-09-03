import { SharedEventBody } from './shared';

export interface PatchEventBody extends Partial<SharedEventBody> {
  week: number;
  changeStartDate: boolean;
  changeEndDate: boolean;
}
