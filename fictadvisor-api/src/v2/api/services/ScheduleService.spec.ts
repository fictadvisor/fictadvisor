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
import { DbEvent } from '../../database/entities/DbEvent';

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
    it('should return index 0 when the period is NO_PERIOD', async () => {
      jest.spyOn(dateService, 'getCurrentSemester').mockImplementation(() => ({
        startDate: new Date('2024-09-02T00:00:00.000Z'),
      } as any));
      const event = {
        period: Period.NO_PERIOD,
        startTime: new Date('2024-09-10T09:20:00.000Z'),
        endTime: new Date('2024-09-10T10:55:00.000Z'),
        eventsAmount: 18,
      };
      const week = 2;
      const result = await scheduleService.getIndexOfLesson(week, event as DbEvent);
      expect(result).toBe(0);
    });
    it('should return null when the period is NO_PERIOD and the week is incorrect', async () => {
      jest.spyOn(dateService, 'getCurrentSemester').mockImplementation(() => ({
        startDate: new Date('2024-09-02T00:00:00.000Z'),
      } as any));
      const event = {
        period: Period.NO_PERIOD,
        startTime: new Date('2024-09-10T09:20:00.000Z'),
        endTime: new Date('2024-09-10T10:55:00.000Z'),
        eventsAmount: 18,
      };
      const week = 3;
      const result = await scheduleService.getIndexOfLesson(week, event as DbEvent);
      expect(result).toBeNull();
    });
    it('should return correct index when the period is EVERY_WEEK', async () => {
      jest.spyOn(dateService, 'getCurrentSemester').mockImplementation(() => ({
        startDate: new Date('2024-09-02T00:00:00.000Z'),
      } as any));
      const event = {
        period: Period.EVERY_WEEK,
        startTime: new Date('2024-09-10T09:20:00.000Z'),
        endTime: new Date('2024-09-10T10:55:00.000Z'),
        eventsAmount: 18,
      };
      const week = 3;
      const result = await scheduleService.getIndexOfLesson(week, event as DbEvent);
      expect(result).toBe(1);
    });
    it('should return correct index when the period is EVERY_FORTNIGHT', async () => {
      jest.spyOn(dateService, 'getCurrentSemester').mockImplementation(() => ({
        startDate: new Date('2024-09-02T00:00:00.000Z'),
      } as any));
      const event = {
        period: Period.EVERY_FORTNIGHT,
        startTime: new Date('2024-09-10T09:20:00.000Z'),
        endTime: new Date('2024-09-10T10:55:00.000Z'),
        eventsAmount: 18,
      };
      const week = 6;
      const result = await scheduleService.getIndexOfLesson(week, event as DbEvent);
      expect(result).toBe(2);
    });
    it('should return null when the period is EVERY_FORTNIGHT and lesson does not happen this week', async () => {
      jest.spyOn(dateService, 'getCurrentSemester').mockImplementation(() => ({
        startDate: new Date('2024-09-02T00:00:00.000Z'),
      } as any));
      const event = {
        period: Period.EVERY_FORTNIGHT,
        startTime: new Date('2024-09-10T09:20:00.000Z'),
        endTime: new Date('2024-09-10T10:55:00.000Z'),
        eventsAmount: 18,
      };
      const week = 3;
      const result = await scheduleService.getIndexOfLesson(week, event as DbEvent);
      expect(result).toBeNull();
    });
  });
});
