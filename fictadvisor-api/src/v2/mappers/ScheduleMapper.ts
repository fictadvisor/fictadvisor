import { Injectable } from '@nestjs/common';
import {
  EventResponse,
  SimpleTelegramEventInfoResponse,
  TelegramEventInfoResponse,
  EventInfoResponse,
} from '@fictadvisor/utils/responses';
import { EventTypeEnum } from '@fictadvisor/utils/enums';
import { some } from '../utils/ArrayUtil';
import { DbEvent } from '../database/entities/DbEvent';
import { DbDiscipline } from '../database/entities/DbDiscipline';
import { DbDisciplineType } from '../database/entities/DbDisciplineType';

@Injectable()
export class ScheduleMapper {
  getEvents (events: DbEvent[]) {
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

  getTelegramEvents (events: DbEvent[]): TelegramEventInfoResponse[] {
    return events
      .map((event) => ({
        ...this.getSimpleTelegramEvent(event),
        eventType: this.getEventType(event.lessons[0]?.disciplineType),
      }))
      .sort((firstEvent, secondEvent) => firstEvent.startTime.getTime() - secondEvent.startTime.getTime());
  }

  getEvent (event: DbEvent, discipline?: DbDiscipline): EventResponse {
    const disciplineType = this.getEventType(event.lessons[0]?.disciplineType);
    return {
      id: event.id,
      name: event.name,
      disciplineId: discipline?.id || null,
      eventType: disciplineType,
      startTime: event.startTime,
      endTime: event.endTime,
      period: event.period,
      url: event.url || null,
      eventInfo: event.eventInfo[0]?.description || null,
      disciplineInfo: discipline?.description || null,
      teachers: discipline?.disciplineTeachers
        .filter(({ roles }) => some(roles.map((role) => role.disciplineType), 'name', disciplineType))
        .map(({ teacher }) => ({
          id: teacher.id,
          firstName: teacher.firstName,
          middleName: teacher.middleName,
          lastName: teacher.lastName,
        })) || null,
    };
  }

  getEventInfos (event: DbEvent): EventInfoResponse {
    return {
      period: event.period,
      startTime: event.startTime,
      endTime: event.endTime,
      url: event.url,
      name: event.name,
      type: this.getEventType(event.lessons[0]?.disciplineType),
      eventInfos: event.eventInfo
        .map((info) => ({
          number: info.number,
          eventInfo: info.description,
        })),
    };
  }

  getSimpleTelegramEvent (event: DbEvent): SimpleTelegramEventInfoResponse {
    return {
      id: event.id,
      name: event.name,
      startTime: event.startTime,
      endTime: event.endTime,
      url: event.url,
      eventInfo: event.eventInfo[0]?.description || null,
    };
  }

  private getDisciplineType (disciplineType: DbDisciplineType) {
    return {
      id: disciplineType?.id ?? null,
      disciplineId: disciplineType?.disciplineId ?? null,
      name: this.getEventType(disciplineType),
    };
  }

  private getEventType (disciplineType: DbDisciplineType) {
    return disciplineType?.name as EventTypeEnum ?? EventTypeEnum.OTHER;
  }
}
