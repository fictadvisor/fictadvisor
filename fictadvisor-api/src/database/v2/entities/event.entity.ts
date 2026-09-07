import { Period } from '@fictadvisor/utils/enums';
import { DbDisciplineType } from './discipline-type.entity';
import { DbBaseGroup } from './group.entity';
import { DbEventInfo } from './event-info.entity';
import { AutoMap } from '@automapper/classes';

/** EventRepository: `group: true, eventInfo: true, disciplineType: true` */
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

  @AutoMap(() => String)
    disciplineTypeId: string | null;

  @AutoMap(() => DbDisciplineType)
    disciplineType: DbDisciplineType | null;

  createdAt: Date | null;
  updatedAt: Date | null;
}
