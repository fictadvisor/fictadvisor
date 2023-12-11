import { Injectable } from '@nestjs/common';
import { DbEvent } from '../database/entities/DbEvent';
import { DbDiscipline } from '../database/entities/DbDiscipline';
import { TeacherRoleAdapter } from './TeacherRoleAdapter';
import { some } from '../utils/ArrayUtil';
import { EventResponse } from '../api/responses/EventResponse';
import { DisciplineType } from '@prisma/client';
import { SimpleTelegramEventInfoResponse, TelegramEventInfoResponse } from '../api/responses/TelegramGeneralEventInfoResponse';

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
        disciplineType: this.getDisciplineType(event.lessons[0]?.disciplineType),
      }))
      .sort((firstEvent, secondEvent) => firstEvent.startTime.getTime() - secondEvent.startTime.getTime());
  }

  getEvent (event: DbEvent, discipline?: DbDiscipline): EventResponse {
    const disciplineType = event.lessons[0]?.disciplineType.name;
    return {
      id: event.id,
      name: event.name,
      disciplineId: discipline?.id || null,
      disciplineType: disciplineType || null,
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
    if (!disciplineType) return null;
    return {
      id: disciplineType.id,
      disciplineId: disciplineType.disciplineId,
      name: disciplineType.name,
    };
  }
}