import { Test } from '@nestjs/testing';
import { InjectionToken } from '@nestjs/common';
import { DateModule } from '../../utils/date/DateModule';
import { PrismaModule } from '../../modules/PrismaModule';
import { ScheduleService } from './ScheduleService';
import { DateService } from '../../utils/date/DateService';
import { UserService } from './UserService';
import { Period } from '@prisma/client';
import { CampusParser } from '../../utils/parser/CampusParser';
import { RozParser } from '../../utils/parser/RozParser';
import { GeneralParser } from '../../utils/parser/GeneralParser';

describe('ScheduleService', () => {
  let scheduleService: ScheduleService;
  let dateService: DateService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ScheduleService,
        GeneralParser,
        {
          provide: RozParser,
          useValue: {},
        },
        {
          provide: CampusParser,
          useValue: {},
        },
      ],
      imports: [
        DateModule,
        PrismaModule,
      ],
    }).useMocker((token) => {
      const tokens: InjectionToken[] = [UserService];
      if (tokens.includes(token)) {
        return {};
      }
    })
      .compile();

    scheduleService = moduleRef.get(ScheduleService);
    dateService = moduleRef.get(DateService);
  });

  describe('getIndexOfLesson', () => {
    it('should return correct index when period is EVERY_WEEK', async () => {
      jest.spyOn(dateService, 'getCurrentSemester').mockImplementation(() => ({
        startDate: new Date('2023-02-05T21:00:00.000Z'),
      } as any));
      const event = {
        period: Period.EVERY_WEEK,
        startTime: new Date('2023-02-06T09:20:00.000Z'),
        endTime: new Date('2023-06-05T10:55:00.000Z'),
        eventsAmount: 18,
      };
      const week = 1;
      const result = await scheduleService.getIndexOfLesson(week, event);
      expect(result).toEqual(0);
    });
    it('should return correct index when period is EVERY_FORTNIGHT', async () => {
      jest.spyOn(dateService, 'getCurrentSemester').mockImplementation(() => ({
        startDate: new Date('2023-02-05T21:00:00.000Z'),
      } as any));
      const event = {
        period: Period.EVERY_WEEK,
        startTime: new Date('2023-02-06T09:20:00.000Z'),
        endTime: new Date('2023-06-05T10:55:00.000Z'),
        eventsAmount: 18,
      };
      const week = 1;
      const result = await scheduleService.getIndexOfLesson(week, event);
      expect(result).toEqual(0);
    });
    it('should return null when period is FORTNIGHT and lesson not happen this week', async () => {
      jest.spyOn(dateService, 'getCurrentSemester').mockImplementation(() => ({
        startDate: new Date('2023-02-05T21:00:00.000Z'),
      } as any));
      const event = {
        period: Period.EVERY_WEEK,
        startTime: new Date('2023-02-15T09:20:00.000Z'),
        endTime: new Date('2023-06-05T10:55:00.000Z'),
        eventsAmount: 18,
      };
      const week = 1;
      const result = await scheduleService.getIndexOfLesson(week, event);
      expect(result).toEqual(null);
    });
  });
});
