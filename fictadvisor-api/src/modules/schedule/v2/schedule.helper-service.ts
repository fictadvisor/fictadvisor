import { DateTime } from 'luxon';
import { DbEvent } from '../../../database/v2/entities/event.entity';
import { CurrentSemester, FORTNITE, WEEK } from '../../date/v2/date.service';
import { DateUtils } from '../../date/date.utils';
import { Injectable } from '@nestjs/common';
import { DisciplineTypeEnum, Period } from '@fictadvisor/utils/enums';
import { weeksPerEvent } from './schedule.service';
import { BaseShortEventResponse } from '@fictadvisor/utils';
import { UpdateEventDTO } from '@fictadvisor/utils/requests';
import { ObjectIsRequiredException } from '../../../common/exceptions/object-is-required.exception';

@Injectable()
export class ScheduleHelperService {
  constructor (private readonly dateUtils: DateUtils) {}

  setWeekTime (event: DbEvent, week: number, startOfSemester: Date): void {
    const { startTime, endTime } = this.addEventTimezones(
      event,
      startOfSemester,
    );

    const startWeek = this.dateUtils.getCeiledDifference(
      startOfSemester,
      startTime,
      WEEK,
    );
    event.startTime = DateTime.fromJSDate(startTime)
      .setZone('Europe/Kyiv')
      .plus({ weeks: week - startWeek })
      .toJSDate();
    event.endTime = DateTime.fromJSDate(endTime)
      .setZone('Europe/Kyiv')
      .plus({ weeks: week - startWeek })
      .toJSDate();
  }

  addTimezone (startDate: Date, time: Date) {
    const newDate = new Date(startDate);
    newDate.setHours(time.getHours(), time.getMinutes());

    return DateTime.fromJSDate(newDate)
      .setZone('Europe/Kyiv')
      .set({
        month: time.getMonth() + 1,
        day: time.getDate(),
      })
      .toJSDate();
  }

  addEventTimezones (
    { startTime, endTime, ...events }: DbEvent,
    startOfSemester?: Date,
  ) {
    startTime = this.addTimezone(startOfSemester, startTime);
    endTime = this.addTimezone(startOfSemester, endTime);

    return { startTime, endTime, ...events };
  }

  getIndexOfLesson (
    week: number,
    event: DbEvent,
    startOfSemester: Date,
  ): number | null {
    const startWeek = Math.ceil(
      (event.startTime.getTime() - startOfSemester.getTime()) / WEEK,
    );
    if (event.period === Period.NO_PERIOD && week - startWeek !== 0)
      return null;
    const index = (week - startWeek) / weeksPerEvent[event.period];
    if (index < 0 || index % 1 !== 0 || index >= event.eventsAmount)
      return null;
    return index;
  }

  sortEvents<T extends BaseShortEventResponse> (events: T[]) {
    return events.sort(
      (firstEvent, secondEvent) =>
        firstEvent.startTime.getTime() - secondEvent.startTime.getTime(),
    );
  }

  eventTypeFilter (
    event: DbEvent,
    addLecture: boolean,
    addLaboratory: boolean,
    addPractice: boolean,
    addOtherEvents?: boolean,
  ): boolean {
    if (!event.lessons.length) return !!addOtherEvents;
    const typeFilter: Record<DisciplineTypeEnum, boolean> = {
      [DisciplineTypeEnum.LECTURE]: addLecture,
      [DisciplineTypeEnum.PRACTICE]: addPractice,
      [DisciplineTypeEnum.LABORATORY]: addLaboratory,
      [DisciplineTypeEnum.CONSULTATION]: addOtherEvents,
      [DisciplineTypeEnum.EXAM]: addOtherEvents,
      [DisciplineTypeEnum.WORKOUT]: addOtherEvents,
    };
    return event.lessons.some(
      (lesson) => typeFilter[lesson.disciplineType.name],
    );
  }

  calculateEventsAmount (
    startOfEvent: Date,
    eventPeriod: string,
    { endDate }: CurrentSemester,
  ): number {
    const endSemester = new Date(endDate.getTime() - FORTNITE);
    if (startOfEvent > endSemester || eventPeriod === Period.NO_PERIOD) {
      return 1;
    }
    const eventWeeks = this.dateUtils.getCeiledDifference(
      startOfEvent,
      endSemester,
      WEEK,
    );
    return Math.ceil(eventWeeks / weeksPerEvent[eventPeriod]);
  }

  getNewDateTime (
    event: DbEvent,
    {
      startTime,
      endTime,
      changeStartDate,
      changeEndDate,
      period,
    }: UpdateEventDTO,
  ) {
    if (!startTime && changeStartDate)
      throw new ObjectIsRequiredException('startTime');
    if (!endTime && changeEndDate)
      throw new ObjectIsRequiredException('endTime');

    let newStartTime = startTime ?? event.startTime;

    if (startTime && !changeStartDate && period !== Period.NO_PERIOD) {
      newStartTime = new Date(event.startTime);
      newStartTime.setHours(startTime.getHours(), startTime.getMinutes());
    }

    const newEndTime = new Date(newStartTime);
    newEndTime.setHours(
      (endTime ?? event.endTime).getHours(),
      (endTime ?? event.endTime).getMinutes(),
    );

    return {
      startTime: newStartTime,
      endTime: newEndTime,
    };
  }
}
