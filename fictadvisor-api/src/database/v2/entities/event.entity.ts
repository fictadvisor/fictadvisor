import { Period } from '@fictadvisor/utils/enums';
import { DbLesson } from './lesson.entity';
import { DbGroup } from './group.entity';
import { DbEventInfo } from './event-info.entity';

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
