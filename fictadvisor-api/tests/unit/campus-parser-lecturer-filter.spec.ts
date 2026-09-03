import axios from 'axios';
import { CampusParser } from '../../src/modules/parser/v2/campus-parser';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Campus keeps free-text lecturer names in the schedule feed, so ФІОТ groups get
// entries like "вакансія" (Англійська мова, 5 groups), "Кондратенко" (Технології
// програмування на С/Embedded, 19 groups) and "Нікітченко Назао" (КДМ, 4 groups).
// parseTeacherName splits on spaces right to left, so each of those became a
// teacher with an empty lastName. None of them resolves to a staff profile, while
// every real teacher behind a non-standard name does — that pair of checks is what
// keeps them out of the database.
describe('CampusParser lecturer filtering', () => {
  // The methods under test only touch lecturerProfiles and dateService.
  const parser = Object.create(CampusParser.prototype);

  const day = (...lecturers: ({ id: string; name: string } | null)[]) => ({
    day: 'Пн',
    pairs: lecturers.map((lecturer, index) => ({
      lecturer,
      name: 'Комп\'ютерна дискретна математика',
      time: `0${8 + index}:30:00`,
      tag: 'prac',
      dates: [],
    })),
  });

  beforeEach(() => {
    parser.lecturerProfiles = new Map();
    jest.clearAllMocks();
  });

  describe('getSkippedLecturerIds', () => {
    beforeEach(() => {
      mockedAxios.get.mockImplementation(async (url: string) => ({
        data: { profile: url.includes('staffed') ? { id: 33075 } : null },
      }));
    });

    it('skips a non-standard name without a staff profile', async () => {
      const skipped = await parser.getSkippedLecturerIds([
        day({ id: 'junk', name: 'Кондратенко' }),
      ]);

      expect([...skipped]).toEqual(['junk']);
    });

    it('keeps a non-standard name that campus links to a profile', async () => {
      const skipped = await parser.getSkippedLecturerIds([
        day({ id: 'staffed', name: 'де ла Круз Іван Петрович' }),
      ]);

      expect([...skipped]).toEqual([]);
    });

    it('never asks about a regular three-word name', async () => {
      const skipped = await parser.getSkippedLecturerIds([
        day({ id: 'real', name: 'Ліхоузова Тетяна Анатоліївна' }, null),
      ]);

      expect([...skipped]).toEqual([]);
      expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it('asks about the same lecturer once per run', async () => {
      const lecturer = { id: 'junk', name: 'вакансія' };

      await parser.getSkippedLecturerIds([day(lecturer), day(lecturer)]);
      await parser.getSkippedLecturerIds([day(lecturer)]);

      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    it('skips the name when campus does not answer', async () => {
      mockedAxios.get.mockRejectedValue(new Error('ECONNRESET'));

      const skipped = await parser.getSkippedLecturerIds([
        day({ id: 'junk', name: 'Нікітченко Назао' }),
      ]);

      expect([...skipped]).toEqual(['junk']);
    });
  });

  describe('parseDay', () => {
    const semester = { startDate: new Date('2026-09-01T00:00:00.000Z') };

    beforeEach(() => {
      parser.dateService = {
        getParserEventTime: () => ({
          startOfEvent: new Date('2026-09-01T05:30:00.000Z'),
          endOfEvent: new Date('2026-09-01T07:05:00.000Z'),
        }),
      };
    });

    const teachersOf = (lecturer: { id: string; name: string }, skipped: string[]) =>
      parser
        .parseDay(semester, day(lecturer), 0, new Set(skipped))
        .flatMap(({ teachers }) => teachers);

    it('drops the teacher of a skipped lecturer', () => {
      expect(teachersOf({ id: 'junk', name: 'Кондратенко' }, ['junk'])).toEqual([]);
    });

    it('keeps every other teacher', () => {
      expect(teachersOf({ id: 'real', name: 'Ліхоузова Тетяна Анатоліївна' }, ['junk']))
        .toEqual([
          {
            lastName: 'Ліхоузова',
            firstName: 'Тетяна',
            middleName: 'Анатоліївна',
          },
        ]);
    });
  });
});
