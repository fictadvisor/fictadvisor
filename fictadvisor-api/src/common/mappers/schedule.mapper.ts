import { Injectable } from '@nestjs/common';
import {
  EventResponse,
  GeneralShortEventResponse,
  TelegramShortEventResponse,
  ShortEventResponse,
} from '@fictadvisor/utils/responses';
import { EventTypeEnum } from '@fictadvisor/utils/enums';
import { some } from '../utils/array.utils';
import { DbEvent } from '../../database/v2/entities/event.entity';
import { DbDiscipline } from '../../database/v2/entities/discipline.entity';
import { DbDisciplineType } from '../../database/v2/entities/discipline-type.entity';

@Injectable()
export class ScheduleMapper {
  getShortEvents (events: DbEvent[]): (GeneralShortEventResponse | ShortEventResponse)[] {
    return events
      .map((event) => ({
        id: event.id,
        name: event.name,
        startTime: event.startTime,
        endTime: event.endTime,
        eventType: this.getEventType(event.lessons[0]?.disciplineType),
      }))
      .sort((firstEvent, secondEvent) => firstEvent.startTime.getTime() - secondEvent.startTime.getTime());
  }

  getTelegramShortEvents (events: DbEvent[]): TelegramShortEventResponse[] {
    return events
      .map((event) => ({
        id: event.id,
        name: event.name,
        startTime: event.startTime,
        endTime: event.endTime,
        url: event.url,
        eventInfo: event.eventInfo[0]?.description || null,
        eventType: this.getEventType(event.lessons[0]?.disciplineType),
      }))
      .sort((firstEvent, secondEvent) => firstEvent.startTime.getTime() - secondEvent.startTime.getTime());
  }

  getEvent (event: DbEvent, discipline?: DbDiscipline): EventResponse {
    const eventType = this.getEventType(event.lessons[0]?.disciplineType);
    return {
      id: event.id,
      name: event.name,
      disciplineId: discipline?.id || null,
      eventType,
      startTime: event.startTime,
      endTime: event.endTime,
      period: event.period,
      url: event.url || null,
      eventInfo: event.eventInfo[0]?.description || null,
      disciplineInfo: discipline?.description || null,
      teachers: discipline?.disciplineTeachers
        .filter(({ roles }) =>
          some(roles.map(({ disciplineType }) => disciplineType) as DbDisciplineType[], 'name', eventType)
        )
        .map(({ teacher }) => ({
          id: teacher.id,
          firstName: teacher.firstName,
          middleName: teacher.middleName,
          lastName: teacher.lastName,
        })) || null,
    };
  }

  private getEventType (disciplineType: DbDisciplineType) {
    return disciplineType?.name as unknown as EventTypeEnum ?? EventTypeEnum.OTHER;
  }
}
