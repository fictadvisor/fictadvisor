import { GeneralParser } from '../../src/modules/parser/v2/general-parser';
import { Period } from '@fictadvisor/utils/enums';

// Regression test for ІМ-42 / "Права і свободи людини" (2026, semester 1).
//
// Campus returns the lecture twice: as a recurring pair in the first week
// (`dates: []`) and as a one-off in the second week (`dates: ["2026-09-10"]`).
// Week 1's Thursday is 2026-09-03, so the one-off sits exactly one week later,
// at the same time, under the same name and type. calculateEventPeriod used to
// treat that as "the pair also happens in the other week" and marked the
// recurring pair EVERY_WEEK — on top of the separate NO_PERIOD event for
// 10 September. One-off pairs must not feed the periodicity check.
describe('GeneralParser.calculateEventPeriod', () => {
  // The method only reads its arguments, so skip the DI-heavy constructor.
  const parser = Object.create(GeneralParser.prototype);

  const lecture = (start: string, end: string, isRecurring: boolean) => ({
    name: 'Права і свободи людини',
    disciplineType: { name: 'LECTURE' },
    startTime: new Date(start),
    endTime: new Date(end),
    isRecurring,
    isSelective: false,
    teachers: [],
    teacherIds: [],
  });

  // Thursday 08:30–10:05 Kyiv, weeks 1 and 2 of the semester.
  const WEEK_ONE = ['2026-09-03T05:30:00.000Z', '2026-09-03T07:05:00.000Z'] as const;
  const WEEK_TWO = ['2026-09-10T05:30:00.000Z', '2026-09-10T07:05:00.000Z'] as const;

  const period = (weeks: unknown[][], pair: unknown, weekIndex: number) =>
    parser.calculateEventPeriod(weeks, pair, weekIndex);

  it('ignores a one-off pair in the other week', () => {
    const recurring = lecture(...WEEK_ONE, true);
    const oneOff = lecture(...WEEK_TWO, false);

    expect(period([[recurring], [oneOff]], recurring, 0)).toBe(Period.EVERY_FORTNIGHT);
  });

  it('keeps the one-off itself without a period', () => {
    const recurring = lecture(...WEEK_ONE, true);
    const oneOff = lecture(...WEEK_TWO, false);

    expect(period([[recurring], [oneOff]], oneOff, 1)).toBe(Period.NO_PERIOD);
  });

  it('still detects a genuinely weekly pair', () => {
    const first = lecture(...WEEK_ONE, true);
    const second = lecture(...WEEK_TWO, true);

    expect(period([[first], [second]], first, 0)).toBe(Period.EVERY_WEEK);
    expect(period([[first], [second]], second, 1)).toBe(Period.EVERY_WEEK);
  });
});
