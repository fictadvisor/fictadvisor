import { CampusParser } from '../../src/modules/parser/v2/campus-parser';
import { ScheduleHelperService } from '../../src/modules/schedule/v2/schedule.helper-service';
import { ScheduleService } from '../../src/modules/schedule/v2/schedule.service';
import { DateUtils } from '../../src/modules/date/date.utils';
import { Period } from '@fictadvisor/utils/enums';

/**
 * Pair times are stored as the Kyiv wall clock written with the Kyiv offset of the
 * SEMESTER START; ScheduleHelperService.addTimezone undoes that offset on every read.
 * Campus one-offs (pairs with explicit `dates`) used to be stored as the true instant
 * instead, so after the 25 October DST switch /general showed them an hour late
 * (ІА-63: English at 09:30 instead of 08:30), while the event panel, which skipped the
 * conversion, showed them right. These run with TZ=UTC, like prod.
 */

const AUTUMN_START = new Date('2026-08-31T00:00:00.000Z'); // Kyiv is +03:00 that day
const SPRING_START = new Date('2027-02-01T00:00:00.000Z'); // Kyiv is +02:00 that day

const parseOneOffs = (semesterStart: Date, dates: string[]) => {
  const parser = Object.create(CampusParser.prototype);
  parser.dateService = {
    getParserEventTime: () => ({
      startOfEvent: new Date(semesterStart.getTime() + 8.5 * 3600_000),
      endOfEvent: new Date(semesterStart.getTime() + 10.0833 * 3600_000),
    }),
  };

  return parser.parseDay(
    { startDate: semesterStart },
    {
      day: 'Пн',
      pairs: [{
        name: 'Англійська мова',
        time: '08:30',
        tag: 'prac',
        type: 'Прак on-line',
        place: '',
        lecturer: null,
        dates,
      }],
    },
    0,
    new Set<string>(),
  );
};

const helper = new ScheduleHelperService(new DateUtils());
const WEEK = 7 * 24 * 3600_000;
const weekOf = (time: Date, semesterStart: Date) =>
  Math.ceil((time.getTime() - semesterStart.getTime()) / WEEK);

describe('campus one-off pair timezone', () => {
  it('stores a winter one-off with the autumn semester offset, like a recurring pair', () => {
    const [pair] = parseOneOffs(AUTUMN_START, ['2026-11-02']);

    expect(pair.isRecurring).toBe(false);
    expect(pair.startTime.toISOString()).toBe('2026-11-02T05:30:00.000Z');
    expect(pair.endTime.toISOString()).toBe('2026-11-02T07:05:00.000Z');
  });

  it('stores a one-off before the DST switch the same way', () => {
    const [pair] = parseOneOffs(AUTUMN_START, ['2026-09-15']);

    expect(pair.startTime.toISOString()).toBe('2026-09-15T05:30:00.000Z');
  });

  it('uses the spring semester offset for a spring semester', () => {
    const [pair] = parseOneOffs(SPRING_START, ['2027-04-05']);

    expect(pair.startTime.toISOString()).toBe('2027-04-05T06:30:00.000Z');
  });

  it.each([
    ['2026-09-15', AUTUMN_START, '2026-09-15T05:30:00.000Z'], // 08:30 EEST
    ['2026-11-02', AUTUMN_START, '2026-11-02T06:30:00.000Z'], // 08:30 EET
    ['2027-02-15', SPRING_START, '2027-02-15T06:30:00.000Z'], // 08:30 EET
    ['2027-04-05', SPRING_START, '2027-04-05T05:30:00.000Z'], // 08:30 EEST
  ])('reaches the API as 08:30 Kyiv on %s', (date, semesterStart, expected) => {
    const [pair] = parseOneOffs(semesterStart, [date]);
    const event = { ...pair, period: Period.NO_PERIOD } as any;

    helper.setWeekTime(event, weekOf(pair.startTime, semesterStart), semesterStart);

    expect(event.startTime.toISOString()).toBe(expected);
  });
});

describe('ScheduleService one-off reads', () => {
  // A one-off as stored: 08:30 Kyiv on 2 November, in the autumn semester offset.
  const stored = () => ({
    id: 'one-off',
    period: Period.NO_PERIOD,
    eventsAmount: 1,
    startTime: new Date('2026-11-02T05:30:00.000Z'),
    endTime: new Date('2026-11-02T07:05:00.000Z'),
    disciplineType: null,
  });

  const service = (event: object) => {
    const instance = Object.create(ScheduleService.prototype);
    instance.scheduleHelperService = helper;
    instance.eventRepository = {
      findOne: jest.fn().mockResolvedValue(event),
      findMany: jest.fn().mockResolvedValue([event]),
    };
    instance.dateService = {
      getCurrentSemester: jest.fn().mockResolvedValue({ startDate: AUTUMN_START }),
      getDatesOfWeek: jest.fn().mockResolvedValue({
        startOfWeek: new Date('2026-11-02T00:00:00.000Z'),
        endOfWeek: new Date('2026-11-08T23:59:59.999Z'),
      }),
    };
    instance.getEventDiscipline = jest.fn().mockResolvedValue(null);
    return instance;
  };

  it('converts a one-off for the event panel (/events/:id)', async () => {
    const { event } = await service(stored()).getEvent('one-off', 10);

    expect(event.startTime.toISOString()).toBe('2026-11-02T06:30:00.000Z');
    expect(event.endTime.toISOString()).toBe('2026-11-02T08:05:00.000Z');
  });

  it('converts a one-off for the members of its own group (/events, /day)', async () => {
    const [event] = await service(stored()).getGroupEvents('group', 10, {});

    expect(event.startTime.toISOString()).toBe('2026-11-02T06:30:00.000Z');
  });
});
