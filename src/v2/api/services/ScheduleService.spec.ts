import { ScheduleService } from './ScheduleService';
import { Test } from '@nestjs/testing';
import { DateModule } from '../../utils/date/DateModule';
import { PrismaModule } from '../../modules/PrismaModule';
import { Period } from '@prisma/client';
import { EventRepository } from '../../database/repositories/EventRepository';
import { DateService } from '../../utils/date/DateService';
import { ParserModule } from '../../utils/parser/ParserModule';
import { DisciplineService } from './DisciplineService';
import { DisciplineTeacherService } from './DisciplineTeacherService';
import { UserService } from './UserService';
import { InjectionToken } from '@nestjs/common';

describe('ScheduleService', () => {
  let scheduleService: ScheduleService;
  let eventRepository: EventRepository;
  let dateService: DateService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ScheduleService],
      imports: [
        DateModule,
        PrismaModule,
        ParserModule,
      ],
    }).useMocker((token) => {
      const tokens: InjectionToken[] = [
        DisciplineTeacherService,
        DisciplineService,
        UserService,
      ];
      if (tokens.includes(token)) {
        return {};
      }
    })
      .compile();

    scheduleService = moduleRef.get(ScheduleService);
    eventRepository = moduleRef.get(EventRepository);
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
      };
      const week = 1;
      const endOfWeek = new Date('2023-02-12T23:59:59.999Z');
      const result = await scheduleService.getIndexOfLesson(week, endOfWeek, event);
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
      };
      const week = 1;
      const endOfWeek = new Date('2023-02-12T23:59:59.999Z');
      const result = await scheduleService.getIndexOfLesson(week, endOfWeek, event);
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
      };
      const week = 1;
      const endOfWeek = new Date('2023-02-12T23:59:59.999Z');
      const result = await scheduleService.getIndexOfLesson(week, endOfWeek, event);
      expect(result).toEqual(null);
    });
  });

  describe('getGeneralGroupEvents', () => {
    it('should return only those events that occur this week', async () => {
      jest.spyOn(eventRepository, 'findMany').mockImplementation(() => (
        [
          {
            id: 'id1',
            period: Period.EVERY_FORTNIGHT,
            startTime: new Date('2023-05-19 00:00:00.000'),
            endTime: new Date('2023-06-05T10:55:00.000Z'),
          },
          {
            id: 'id2',
            period: Period.EVERY_FORTNIGHT,
            startTime: new Date('2023-05-26 00:00:00.000'),
            endTime: new Date('2023-06-05T10:55:00.000Z'),
          },
          {
            id: 'id3',
            period: Period.EVERY_WEEK,
            startTime: new Date('2023-05-26 00:00:00.000'),
            endTime: new Date('2023-06-05T10:55:00.000Z'),
          },
        ] as any
      ));
      jest.spyOn(dateService, 'getDatesOfWeek').mockImplementation(async () => ({
        startOfWeek: new Date('2023-06-09 21:00:00.000'),
        endOfWeek: new Date('2023-06-18 21:00:00.000'),
      }));
      jest.spyOn(scheduleService, 'setWeekTime').mockImplementation(async () => ({
        startWeek: 1,
        endWeek: 1,
      }));

      const id = 'id';
      const week = 16;
      const result = await scheduleService.getGeneralGroupEvents(id, week);
      expect(result).toStrictEqual({
        events: [
          {
            id: 'id2',
            period: Period.EVERY_FORTNIGHT,
            startTime: new Date('2023-05-26T00:00:00.000Z'),
            endTime: new Date('2023-06-05T10:55:00.000Z'),
          },
          {
            id: 'id3',
            period: Period.EVERY_WEEK,
            startTime: new Date('2023-05-26 00:00:00.000'),
            endTime: new Date('2023-06-05T10:55:00.000Z'),
          }],
        week: 16,
        startTime: new Date('2023-06-09T21:00:00.000Z'),
      });
    });
  });
});
