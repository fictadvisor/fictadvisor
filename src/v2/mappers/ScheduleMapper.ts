import { Injectable } from '@nestjs/common';
import { DbEvent } from '../database/entities/DbEvent';

@Injectable()
export class ScheduleMapper {
  getGeneralEvents (events: DbEvent[]) {
    return events.map((event) => ({
      id: event.id,
      name: event.name,
      startTime: event.startTime,
      endTime: event.endTime,
      disciplineType: event.lessons[0].disciplineType.name,
    }));
  }
}