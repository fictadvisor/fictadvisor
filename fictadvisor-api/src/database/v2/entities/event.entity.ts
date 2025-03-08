import { Period } from '@fictadvisor/utils/enums';
import { DbLesson } from './lesson.entity';
import { DbGroup } from './group.entity';
import { DbEventInfo } from './event-info.entity';
import { AutoMap } from '@automapper/classes';

export class DbEvent {
  @AutoMap()
    id: string;

  @AutoMap()
    name: string;

  @AutoMap()
    startTime: Date;

  @AutoMap()
    endTime: Date;

  @AutoMap()
    isCustom: boolean;

  @AutoMap(() => String)
    period: Period;

  @AutoMap()
    url: string | null;

  @AutoMap(() => DbGroup)
    group?: DbGroup;

  @AutoMap()
    groupId: string;

  @AutoMap(() => [DbEventInfo])
    eventInfo?: DbEventInfo[];

  @AutoMap(() => [DbLesson])
    lessons?: DbLesson[];

  @AutoMap()
    eventsAmount: number;

  @AutoMap()
    teacherForceChanges: boolean;

  createdAt: Date | null;
  updatedAt: Date | null;
}
