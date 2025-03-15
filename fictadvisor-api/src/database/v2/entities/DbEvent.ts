import { Period } from '@fictadvisor/utils/enums';
import { DbLesson } from './DbLesson';
import { DbGroup } from './DbGroup';
import { DbEventInfo } from './DbEventInfo';

export class DbEvent {
  id: string;
  name: string;
  startTime: Date;
  endTime: Date;
  isCustom: boolean;
  period: Period;
  url: string | null;
  group?: DbGroup;
  groupId: string;
  eventInfo?: DbEventInfo[];
  eventsAmount: number;
  teacherForceChanges: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  lessons?: DbLesson[];
}
