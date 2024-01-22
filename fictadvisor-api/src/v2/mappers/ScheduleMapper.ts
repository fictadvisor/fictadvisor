import { Injectable } from '@nestjs/common';
import { DbEvent } from '../database/entities/DbEvent';
import { DbDiscipline } from '../database/entities/DbDiscipline';
import { TeacherRoleAdapter } from './TeacherRoleAdapter';
import { some } from '../utils/ArrayUtil';
import { EventResponse } from '../api/responses/EventResponse';
import { DisciplineType } from '@prisma/client';
import { SimpleTelegramEventInfoResponse, TelegramEventInfoResponse } from '../api/responses/TelegramGeneralEventInfoResponse';
import { EventTypeEnum } from '../api/dtos/EventTypeEnum';
import { EventInfoResponse } from '../api/responses/EventInfoResponse';

@Injectable()
export class ScheduleMapper {
  getEvents (events: DbEvent[]) {
    return events
      .map((event) => ({
        id: event.id,
        name: event.name,
        startTime: event.startTime,
        endTime: event.endTime,
        disciplineType: this.getDisciplineType(event.lessons[0]?.disciplineType),
      }))
      .sort((firstEvent, secondEvent) => firstEvent.startTime.getTime() - secondEvent.startTime.getTime());
  }

  getTelegramEvents (events: DbEvent[]): TelegramEventInfoResponse[] {
    return events
      .map((event) => ({
        ...this.getSimpleTelegramEvent(event),
        eventType: this.getDisciplineType(event.lessons[0]?.disciplineType),
      }))
      .sort((firstEvent, secondEvent) => firstEvent.startTime.getTime() - secondEvent.startTime.getTime());
  }

  getEvent (event: DbEvent, discipline?: DbDiscipline): EventResponse {
    const disciplineType = event.lessons[0]?.disciplineType.name;
    return {
      id: event.id,
      name: event.name,
      disciplineId: discipline?.id || null,
      eventType: disciplineType as EventTypeEnum ?? EventTypeEnum.OTHER,
      startTime: event.startTime,
      endTime: event.endTime,
      period: event.period,
      url: event.url || null,
      eventInfo: event.eventInfo[0]?.description || null,
      disciplineInfo: discipline?.description || null,
      teachers: discipline?.disciplineTeachers
        .filter(({ roles }) => some(roles, 'role', TeacherRoleAdapter[disciplineType]))
        .map(({ teacher }) => ({
          id: teacher.id,
          firstName: teacher.firstName,
          middleName: teacher.middleName,
          lastName: teacher.lastName,
        })) || null,
    };
  }

  getEventInfos (event: DbEvent): EventInfoResponse {
    const disciplineType = event.lessons[0]?.disciplineType.name;
    return {
      period: event.period,
      startTime: event.startTime,
      endTime: event.endTime,
      url: event.url,
      name: event.name,
      type: disciplineType as EventTypeEnum ?? EventTypeEnum.OTHER,
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

  private getDisciplineType (disciplineType: DisciplineType) {
    return {
      id: disciplineType?.id ?? null,
      disciplineId: disciplineType?.disciplineId ?? null,
      name: disciplineType?.name as EventTypeEnum ?? EventTypeEnum.OTHER,
    };
  }
}