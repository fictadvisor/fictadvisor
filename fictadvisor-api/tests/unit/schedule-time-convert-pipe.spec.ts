import { ScheduleTimeConvertPipe } from '../../src/common/pipes/schedule-time-convert.pipe';
import { ScheduleHelperService } from '../../src/modules/schedule/v2/schedule.helper-service';
import { DateUtils } from '../../src/modules/date/date.utils';

/**
 * A custom event comes in as a true instant and must be stored in the semester encoding
 * (Kyiv wall clock at the semester start's offset), so that addTimezone gives the same
 * instant back. Runs with TZ=UTC, like prod.
 */

const AUTUMN_START = new Date('2026-08-31T00:00:00.000Z'); // Monday, Kyiv +03:00
const SPRING_START = new Date('2027-02-01T00:00:00.000Z'); // Monday, Kyiv +02:00
// A semester starting in a month whose PREVIOUS month has the other offset: the old pipe
// took the offset of `{ month: startDate.getMonth() }`, i.e. of the month before.
const NOVEMBER_START = new Date('2026-11-02T00:00:00.000Z'); // Kyiv +02:00, October is +03:00

const pipe = (startDate: Date) =>
  new ScheduleTimeConvertPipe({ getCurrentSemester: async () => ({ startDate }) } as any);

const helper = new ScheduleHelperService(new DateUtils());

describe('ScheduleTimeConvertPipe', () => {
  it.each([
    // [semester start, what the client sends, what is stored]
    ['autumn, before DST (08:30 EEST)', AUTUMN_START, '2026-09-15T05:30:00.000Z', '2026-09-15T05:30:00.000Z'],
    ['autumn, after DST (08:30 EET)', AUTUMN_START, '2026-11-17T06:30:00.000Z', '2026-11-17T05:30:00.000Z'],
    ['spring, before DST (08:30 EET)', SPRING_START, '2027-02-15T06:30:00.000Z', '2027-02-15T06:30:00.000Z'],
    ['spring, after DST (08:30 EEST)', SPRING_START, '2027-04-05T05:30:00.000Z', '2027-04-05T06:30:00.000Z'],
    ['late evening (23:30 EET)', AUTUMN_START, '2026-11-17T21:30:00.000Z', '2026-11-17T20:30:00.000Z'],
  ])('stores %s in the semester encoding', async (_, start, sent, stored) => {
    const { startTime } = await pipe(start).transform({ startTime: new Date(sent) });

    expect(startTime!.toISOString()).toBe(stored);
  });

  it('uses the offset of the semester start itself, not of the month before it', async () => {
    const { startTime, endTime } = await pipe(NOVEMBER_START).transform({
      startTime: new Date('2026-11-17T06:30:00.000Z'), // 08:30 EET
      endTime: new Date('2026-11-17T08:05:00.000Z'),
    });

    expect(startTime!.toISOString()).toBe('2026-11-17T06:30:00.000Z');
    expect(endTime!.toISOString()).toBe('2026-11-17T08:05:00.000Z');
    expect(helper.addTimezone(NOVEMBER_START, startTime!).toISOString())
      .toBe('2026-11-17T06:30:00.000Z');
  });

  it.each([
    [AUTUMN_START, '2026-09-15T05:30:00.000Z'],
    [AUTUMN_START, '2026-11-17T06:30:00.000Z'],
    [SPRING_START, '2027-02-15T06:30:00.000Z'],
    [SPRING_START, '2027-04-05T05:30:00.000Z'],
  ])('round-trips through addTimezone back to the instant sent (%#)', async (start, sent) => {
    const { startTime } = await pipe(start).transform({ startTime: new Date(sent) });

    expect(helper.addTimezone(start, startTime!).toISOString()).toBe(sent);
  });

  it('passes the other fields through and leaves missing times missing', async () => {
    const result = await pipe(AUTUMN_START).transform({ name: 'Консультація' } as any);

    expect(result).toEqual({ name: 'Консультація', startTime: undefined, endTime: undefined });
  });
});
