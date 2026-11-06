import { Injectable, PipeTransform } from '@nestjs/common';
import { UpdateEventDTO } from '@fictadvisor/utils/requests';
import { DateService } from '../../modules/date/v2/date.service';
import { DateTime } from 'luxon';

const KYIV = 'Europe/Kyiv';

/**
 * Turns the instants a client sends for a custom event into the encoding every event is
 * stored in: the Kyiv wall-clock time written with the Kyiv UTC offset of the SEMESTER
 * START (+03 for an autumn semester, +02 for a spring one), whatever the offset on the
 * event's own date. ScheduleHelperService.addTimezone undoes exactly that offset on read,
 * which is what keeps a pair at 08:30 across the DST switch.
 *
 * It used to get there by accident: it moved the time onto
 * `{ month: startDate.getMonth(), day: startDate.getDay() }` -- a 0-based month and the
 * weekday -- so it took the offset of a day early in the month BEFORE the semester start.
 * For September and February starts that month (August, January) has the right offset; a
 * semester starting in, say, November or April would have put every custom event an hour
 * off.
 */
@Injectable()
export class ScheduleTimeConvertPipe implements PipeTransform {
  constructor (
    private dateService: DateService,
  ) {}

  async transform ({ startTime, endTime, ...values }: Partial<UpdateEventDTO>)  {
    const { startDate } = await this.dateService.getCurrentSemester();

    if (startTime) startTime = ScheduleTimeConvertPipe.toSemesterEncoding(startDate, startTime);
    if (endTime) endTime = ScheduleTimeConvertPipe.toSemesterEncoding(startDate, endTime);

    return { startTime, endTime, ...values };
  }

  static toSemesterEncoding (semesterStart: Date, time: Date): Date {
    const wall = DateTime.fromJSDate(time).setZone(KYIV);
    const semesterOffset = DateTime.fromJSDate(semesterStart).setZone(KYIV).offset;

    return DateTime.fromObject(
      {
        year: wall.year,
        month: wall.month,
        day: wall.day,
        hour: wall.hour,
        minute: wall.minute,
        second: wall.second,
        millisecond: wall.millisecond,
      },
      { zone: 'UTC' },
    ).minus({ minutes: semesterOffset }).toJSDate();
  }
}
