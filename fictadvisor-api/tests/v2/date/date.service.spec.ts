import { Test } from '@nestjs/testing';
import { DateService, CurrentSemester } from '../../../src/modules/date/v2/date.service';
import { PrismaModule } from '../../../src/database/prisma.module';

describe('DateService', () => {
  let dateService: DateService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [DateService],
      imports: [PrismaModule],
    }).compile();

    dateService = moduleRef.get(DateService);
  });

  describe('getCurrentDay', () => {
    it('should return the 2nd week if the number of weeks is even', async () => {
      jest
        .useFakeTimers()
        .setSystemTime(new Date('2023-06-06T00:00:00'));
      jest.spyOn(dateService, 'getCurrentSemester').mockImplementation(async () => (
        { startDate: new Date('2023-02-05T00:00:00') } as any as Promise<CurrentSemester>
      ));

      const result = await dateService.getCurrentDay();

      expect(result).toStrictEqual({ fortnight: 9, week: 2, day: 2 });
    });

    it('should return the 7th day if Sunday', async () => {
      jest
        .useFakeTimers()
        .setSystemTime(new Date('2023-06-04T00:00:00'));
      jest.spyOn(dateService, 'getCurrentSemester').mockImplementation(async () => (
        { startDate: new Date('2023-02-05T00:00:00') } as any as Promise<CurrentSemester>
      ));

      const result = await dateService.getCurrentDay();

      expect(result).toStrictEqual({ fortnight: 9, week: 1, day: 7 });
    });
  });

  describe('getCurrentWeek', () => {
    it('should return the number of weeks rounded up', async () => {
      jest
        .useFakeTimers()
        .setSystemTime(new Date('2023-06-06T00:00:00'));
      jest.spyOn(dateService, 'getCurrentSemester').mockImplementation(async () => (
        { startDate: new Date('2023-02-05T00:00:00') } as any as Promise<CurrentSemester>
      ));

      const result = await dateService.getCurrentWeek();

      expect(result).toBe(18);
    });
  });

  describe('getDatesOfCurrentWeek', () => {
    it('should return correct dates of the week if Sunday', () => {
      jest
        .useFakeTimers()
        .setSystemTime(new Date('2023-06-04T00:00:00'));

      const result = dateService.getDatesOfCurrentWeek();

      expect(result).toStrictEqual({
        startOfWeek: new Date('2023-05-29T00:00:00'),
        endOfWeek: new Date('2023-06-04T23:59:59.999Z'),
      });
    });
  });

  describe('getDatesOfWeek', () => {
    it('should return correct dates of the week for a given week', async () => {
      jest
        .useFakeTimers()
        .setSystemTime(new Date('2023-06-06T00:00:00'));

      const week = 15;

      const result = await dateService.getDatesOfWeek(week);

      expect(result).toStrictEqual({
        startOfWeek: new Date('2023-05-15T00:00:00'),
        endOfWeek: new Date('2023-05-21T23:59:59.999Z'),
      });
    });
  });

  describe('isPreviousSemesterToCurrent', () => {
    it('should return true if the year is lower than current one', async () => {
      jest.spyOn(dateService, 'getCurrentSemester').mockImplementation(async () => (
        { semester: 1, year: 3, isFinished: false } as any as Promise<CurrentSemester>
      ));

      const semester = 2;
      const year = 2;

      const result = await dateService.isPreviousSemesterToCurrent(semester, year);

      expect(result).toBeTruthy();
    });

    it('should return true if the semester is lower and the year is the same', async () => {
      jest.spyOn(dateService, 'getCurrentSemester').mockImplementation(async () => (
        { semester: 2, year: 3, isFinished: false } as any as Promise<CurrentSemester>
      ));

      const semester = 1;
      const year = 3;

      const result = await dateService.isPreviousSemesterToCurrent(semester, year);

      expect(result).toBeTruthy();
    });

    it('should return false if the semester and year are larger than current one', async () => {
      jest.spyOn(dateService, 'getCurrentSemester').mockImplementation(async () => (
        { semester: 1, year: 2, isFinished: false } as any as Promise<CurrentSemester>
      ));

      const semester = 2;
      const year = 3;

      const result = await dateService.isPreviousSemesterToCurrent(semester, year);

      expect(result).toBeFalsy();
    });

    it('should return true if current and comparing semesters are the same but current semester is finished', async () => {
      jest.spyOn(dateService, 'getCurrentSemester').mockImplementation(async () => (
        { semester: 1, year: 2, isFinished: true } as any as Promise<CurrentSemester>
      ));

      const semester = 1;
      const year = 2;

      const result = await dateService.isPreviousSemesterToCurrent(semester, year);

      expect(result).toBeTruthy();
    });
  });

  describe('getPreviousSemester', () => {
    it('should return correct previous semester for the first semester', () => {
      const semester = 1;
      const year = 2023;

      const result = dateService.getPreviousSemester(semester, year);

      expect(result).toStrictEqual({
        year: 2022,
        semester: 2,
      });
    });

    it('should return correct previous semester for the second semester', () => {
      const semester = 2;
      const year = 2023;

      const result = dateService.getPreviousSemester(semester, year);

      expect(result).toStrictEqual({
        year: 2023,
        semester: 1,
      });
    });
  });
});
