import { Injectable, PipeTransform } from '@nestjs/common';
import { UpdateEventDTO } from '@fictadvisor/utils/requests';
import { DateService } from '../../modules/date/v2/date.service';
import { DateTime } from 'luxon';

@Injectable()
export class ScheduleTimeConvertPipe implements PipeTransform {
  constructor (
    private dateService: DateService,
  ) {}

  async transform ({ startTime, endTime, ...values }: Partial<UpdateEventDTO>)  {
    const { startDate } = await this.dateService.getCurrentSemester();

    if (startTime) startTime = this.removeTimezone(startDate, startTime);
    if (endTime) endTime = this.removeTimezone(startDate, endTime);

    return { startTime, endTime, ...values };
  }

  private removeTimezone (startDate: Date, time: Date) {
    const r = DateTime.fromJSDate(time).setZone('Europe/Kyiv').set({ month: startDate.getMonth(), day: startDate.getDay() }).toJSDate();
    time.setHours(
      r.getHours(),
      r.getMinutes(),
    );

    return time;
  }
}
