import { Period } from '@fictadvisor/utils/enums';
import { DbLesson } from './lesson.entity';
import { DbBaseGroup } from './group.entity';
import { DbEventInfo } from './event-info.entity';
import { AutoMap } from '@automapper/classes';

/** EventRepository: `group: true, eventInfo: true, lessons: { disciplineType: true }` */
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

  @AutoMap(() => String)
    url: string | null;

  @AutoMap()
    groupId: string;

  @AutoMap()
    eventsAmount: number;

  @AutoMap()
    teacherForceChanges: boolean;

  @AutoMap(() => DbBaseGroup)
    group: DbBaseGroup;

  @AutoMap(() => [DbEventInfo])
    eventInfo: DbEventInfo[];

  @AutoMap(() => [DbLesson])
    lessons: DbLesson[];

  createdAt: Date | null;
  updatedAt: Date | null;
}
