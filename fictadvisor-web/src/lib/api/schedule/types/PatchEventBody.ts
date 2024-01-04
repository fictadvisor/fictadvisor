import { SharedEventBody } from './shared';

export interface PatchEventBody
  extends Partial<Omit<SharedEventBody, 'disciplineType'>> {
  week: number;
  changeStartDate: boolean;
  changeEndDate: boolean;
  disciplineType: string | null;
}
