import { Test } from '@nestjs/testing';
import { PrismaModule } from '../../modules/PrismaModule';
import { PrismaService } from '../../database/PrismaService';
import { ScheduleService } from './ScheduleService';
import { DisciplineTeacherService } from './DisciplineTeacherService';
import { UserService } from './UserService';
import { DateModule } from '../../utils/date/DateModule';
import { ParserModule } from '../../utils/parser/ParserModule';
import { InjectionToken } from '@nestjs/common';
import { DisciplineService } from './DisciplineService';
import { DisciplineTypeEnum, Period } from '@prisma/client';
import { AuthService } from './AuthService';
import { GroupService } from './GroupService';
import { FileService } from '../../utils/files/FileService';
import { MapperModule } from '../../modules/MapperModule';
import { DataNotFoundException } from '../../utils/exceptions/DataNotFoundException';
import { InvalidWeekException } from '../../utils/exceptions/InvalidWeekException';
import { TelegramAPI } from '../../telegram/TelegramAPI';

describe('ScheduleService', () => {
  let scheduleService: ScheduleService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ScheduleService, UserService],
      imports: [
        DateModule,
        PrismaModule,
        ParserModule,
        MapperModule,
      ],
    }).useMocker((token) => {
      const tokens: InjectionToken[] = [
        FileService,
        AuthService,
        GroupService,
        DisciplineTeacherService,
        DisciplineService,
        TelegramAPI,
      ];
      if (!token) {
        return;
      }
      if (tokens.includes(token)) {
        return {};
      }
    }).compile();
    
    scheduleService = moduleRef.get(ScheduleService);
    prisma = moduleRef.get(PrismaService);

    await prisma.user.create({
      data: {
        id: 'user',
        email: 'user@gmail.com',
      },
    });

    await prisma.group.createMany({
      data: [
        {
          id: 'group',
          code: 'AA-12',
        },
        {
          id: 'anotherGroup',
          code: 'AA-11',
        },
      ],
    });

    await prisma.student.create({
      data: {
        userId: 'user',
        groupId: 'group',
      },
    });

    await prisma.subject.create({
      data: {
        id: 'subject',
        name: 'subject',
      },
    });

    await prisma.discipline.createMany({
      data: [
        {
          id: 'discipline',
          year: 2022,
          semester: 1,
          groupId: 'group',
          subjectId: 'subject',
        },
        {
          id: 'selectiveDiscipline',
          year: 2022,
          semester: 1,
          groupId: 'group',
          subjectId: 'subject',
          isSelective: true,
        },
        {
          id: 'nonSelectedDiscipline',
          year: 2022,
          semester: 1,
          groupId: 'group',
          subjectId: 'subject',
          isSelective: true,
        },
        {
          id: 'anotherGroup-discipline',
          year: 2022,
          semester: 1,
          groupId: 'anotherGroup',
          subjectId: 'subject',
        },
        {
          id: 'anotherGroup-selectiveDiscipline',
          year: 2022,
          semester: 1,
          groupId: 'anotherGroup',
          subjectId: 'subject',
          isSelective: true,
        },
      ],
    });

    await prisma.selectiveDiscipline.create({
      data: {
        disciplineId: 'selectiveDiscipline',
        studentId: 'user',
      },
    });

    await prisma.disciplineType.createMany({
      data: [
        {
          id: 'discipline-lecture',
          name: DisciplineTypeEnum.LECTURE,
          disciplineId: 'discipline',
        },
        {
          id: 'discipline-practice',
          name: DisciplineTypeEnum.PRACTICE,
          disciplineId: 'discipline',
        },
        {
          id: 'discipline-workout',
          name: DisciplineTypeEnum.WORKOUT,
          disciplineId: 'discipline',
        },

        {
          id: 'selectiveDiscipline-practice',
          name: DisciplineTypeEnum.PRACTICE,
          disciplineId: 'selectiveDiscipline',
        },
        {
          id: 'selectiveDiscipline-workout',
          name: DisciplineTypeEnum.WORKOUT,
          disciplineId: 'selectiveDiscipline',
        },
        {
          id: 'nonSelectedDiscipline-lecture',
          name: DisciplineTypeEnum.LECTURE,
          disciplineId: 'nonSelectedDiscipline',
        },

        {
          id: 'anotherGroup-discipline-lecture',
          name: DisciplineTypeEnum.LECTURE,
          disciplineId: 'anotherGroup-discipline',
        },
        {
          id: 'anotherGroup-selectiveDiscipline-practice',
          name: DisciplineTypeEnum.PRACTICE,
          disciplineId: 'anotherGroup-discipline',
        },
        {
          id: 'anotherGroup-selectiveDiscipline-workout',
          name: DisciplineTypeEnum.WORKOUT,
          disciplineId: 'anotherGroup-discipline',
        },
      ],
    });

    await prisma.event.createMany({
      data: [
        {
          id: 'lecture-event-1st-semester-every-fortnight-09-05',
          name: 'name1',
          groupId: 'group',
          period: Period.EVERY_FORTNIGHT,
          startTime: new Date('2022-09-05T08:30:00'),
          endTime: new Date('2023-01-23T10:00:00'),
        },
        {
          id: 'practice-event-1st-semester-every-week-09-12',
          name: 'name2',
          groupId: 'group',
          period: Period.EVERY_WEEK,
          startTime: new Date('2022-09-12T08:30:00'),
          endTime: new Date('2022-10-03T10:00:00'),
        },
        {
          id: 'workout-event-1st-semester-every-fortnight-09-12',
          name: 'name3',
          groupId: 'group',
          period: Period.EVERY_FORTNIGHT,
          startTime: new Date('2022-09-12T08:30:00'),
          endTime: new Date('2022-10-03T10:00:00'),
        },
        {
          id: 'some-event-1st-semester-no-period-09-12',
          name: 'name4',
          groupId: 'group',
          period: Period.NO_PERIOD,
          startTime: new Date('2022-09-12T08:30:00'),
          endTime: new Date('2022-09-12T10:00:00'),
        },
        {
          id: 'event-2st-semester-every-week-02-05',
          name: 'name5',
          groupId: 'group',
          period: Period.EVERY_WEEK,
          startTime: new Date('2023-02-05T08:00:00'),
          endTime: new Date('2023-06-26T10:00:00'),
        },

        {
          id: 'nonselected-lecture-event-1st-semester-every-week-09-05',
          name: 'name6',
          groupId: 'group',
          period: Period.EVERY_WEEK,
          startTime: new Date('2022-09-05T08:30:00'),
          endTime: new Date('2023-01-23T10:00:00'),
        },
        {
          id: 'selective-practice-event-1st-semester-every-week-09-12',
          name: 'name7',
          groupId: 'group',
          period: Period.EVERY_WEEK,
          startTime: new Date('2022-09-12T08:30:00'),
          endTime: new Date('2022-10-03T10:00:00'),
        },
        {
          id: 'selective-workout-event-1st-semester-every-fortnight-09-12',
          name: 'name8',
          groupId: 'group',
          period: Period.EVERY_FORTNIGHT,
          startTime: new Date('2022-09-12T08:30:00'),
          endTime: new Date('2022-10-03T10:00:00'),
        },

        {
          id: 'anotherGroup-lecture-event-1st-semester-every-week-09-05',
          name: 'name9',
          groupId: 'anotherGroup',
          period: Period.EVERY_WEEK,
          startTime: new Date('2022-09-05T08:30:00'),
          endTime: new Date('2023-01-23T10:00:00'),
        },
        {
          id: 'anotherGroup-selective-practice-event-1st-semester-every-week-09-12',
          name: 'name10',
          groupId: 'anotherGroup',
          period: Period.EVERY_WEEK,
          startTime: new Date('2022-09-12T08:30:00'),
          endTime: new Date('2022-10-03T10:00:00'),
        },
        {
          id: 'anotherGroup-selective-workout-event-1st-semester-every-fortnight-09-12',
          name: 'name11',
          groupId: 'anotherGroup',
          period: Period.EVERY_FORTNIGHT,
          startTime: new Date('2022-09-12T08:30:00'),
          endTime: new Date('2022-10-03T10:00:00'),
        },
      ],
    });
    
    await prisma.eventInfo.createMany({
      data: [
        {
          eventId: 'lecture-event-1st-semester-every-fortnight-09-05',
          number: 0,
          description: 'hello',
        },
        {
          eventId: 'lecture-event-1st-semester-every-fortnight-09-05',
          number: 1,
          description: 'hello',
        },
        {
          eventId: 'workout-event-1st-semester-every-fortnight-09-12',
          number: 2,
          description: 'workout',
        },
        {
          eventId: 'some-event-1st-semester-no-period-09-12',
          number: 0,
          description: 'something',
        },
      ],
    });

    await prisma.lesson.createMany({
      data: [
        { 
          eventId: 'lecture-event-1st-semester-every-fortnight-09-05', 
          disciplineTypeId: 'discipline-lecture',
        },
        { 
          eventId: 'practice-event-1st-semester-every-week-09-12', 
          disciplineTypeId: 'discipline-practice',
        },
        { 
          eventId: 'workout-event-1st-semester-every-fortnight-09-12', 
          disciplineTypeId: 'discipline-workout',
        },
        { 
          eventId: 'event-2st-semester-every-week-02-05', 
          disciplineTypeId: 'discipline-practice',
        },

        { 
          eventId: 'selective-practice-event-1st-semester-every-week-09-12', 
          disciplineTypeId: 'selectiveDiscipline-practice',
        },
        { 
          eventId: 'selective-workout-event-1st-semester-every-fortnight-09-12', 
          disciplineTypeId: 'selectiveDiscipline-workout',
        },
        { 
          eventId: 'nonselected-lecture-event-1st-semester-every-week-09-05', 
          disciplineTypeId: 'nonSelectedDiscipline-lecture',
        },

        { 
          eventId: 'anotherGroup-lecture-event-1st-semester-every-week-09-05', 
          disciplineTypeId: 'anotherGroup-discipline-lecture',
        },
        { 
          eventId: 'anotherGroup-selective-practice-event-1st-semester-every-week-09-12', 
          disciplineTypeId: 'anotherGroup-selectiveDiscipline-practice',
        },
        { 
          eventId: 'anotherGroup-selective-workout-event-1st-semester-every-fortnight-09-12', 
          disciplineTypeId: 'anotherGroup-selectiveDiscipline-workout',
        },
      ],
    });
  });

  describe('getGeneralGroupEvents', () => {
    it('should return only those events that occur this week', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));
      const { events, startTime, week } = await scheduleService.getGeneralGroupEvents('group', 0);
      const event = events.find((event) => event.id === 'lecture-event-1st-semester-every-fortnight-09-05');
      expect(week).toBe(1);
      expect(startTime).toEqual(new Date('2022-09-05T00:00:00'));
      expect({
        id: event.id,
        groupId: event.groupId,
        startTime: event.startTime,
        endTime: event.endTime,
        period: event.period,
      }).toStrictEqual({
        id: 'lecture-event-1st-semester-every-fortnight-09-05',
        groupId: 'group',
        startTime: new Date('2022-09-05T08:30:00'),
        endTime: new Date('2022-09-05T10:00:00'),
        period: Period.EVERY_FORTNIGHT,
      });
    });

    it('should return empty list of events if week is wrong', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-02-05T00:01:00'));
      const { events } = await scheduleService.getGeneralGroupEvents('group', 100);
      expect(events.length).toBe(0);
    });
    
    it('should throw DataNotFoundException because semester wasn\'t found', async () => {
      jest.useFakeTimers().setSystemTime(new Date('1488-02-05T00:01:00'));
      await expect(
        scheduleService.getGeneralGroupEvents('group', 1)
      ).rejects.toThrow(DataNotFoundException);
    });

    it('should return only those events that occur on the 1st week of the semester', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));
      const events = await scheduleService.getGeneralGroupEvents('group', 0);
      const sameEvents = await scheduleService.getGeneralGroupEvents('group', 1);
      expect(events.startTime).toEqual(new Date('2022-09-05T00:00:00'));
      expect(events).toStrictEqual(sameEvents);
    });
    
    it('should return only lectures, practices and laboratories events', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-12T00:01:00'));
      const { events } = await scheduleService.getGeneralGroupEvents('group', 1);
      expect(events.every(
        (event) => event.lessons.every(
          (lesson) => lesson.disciplineType.name === DisciplineTypeEnum.LECTURE ||
                      lesson.disciplineType.name === DisciplineTypeEnum.PRACTICE ||
                      lesson.disciplineType.name === DisciplineTypeEnum.LABORATORY)
      )).toBe(true);
    });
  });

  describe('getEvent', () => {
    it('should return all information about event and discipline with period', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));
      const { event, discipline } = await scheduleService.getEvent('lecture-event-1st-semester-every-fortnight-09-05', 3);
      expect({
        id: event.id,
        startTime: event.startTime,
        endTime: event.endTime,
        period: event.period,
        groupId: event.groupId,
      }).toStrictEqual({
        id: 'lecture-event-1st-semester-every-fortnight-09-05',
        startTime: new Date('2022-09-19T08:30:00'),
        endTime: new Date('2022-09-19T10:00:00'),
        period: Period.EVERY_FORTNIGHT,
        groupId: 'group',
      });

      expect(event.eventInfo[0].number).toBe(1);
      expect(discipline.id).toBe('discipline');
    });
   
    it('should return all information about event and discipline without period', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-12T00:01:00'));
      const { event, discipline } = await scheduleService.getEvent('some-event-1st-semester-no-period-09-12', 10);
      expect({
        id: event.id,
        startTime: event.startTime,
        endTime: event.endTime,
        period: event.period,
        groupId: event.groupId,
      }).toStrictEqual({
        id: 'some-event-1st-semester-no-period-09-12',
        startTime: new Date('2022-09-12T08:30:00'),
        endTime: new Date('2022-09-12T10:00:00'),
        period: Period.NO_PERIOD,
        groupId: 'group',
      });
      
      expect(event.eventInfo[0].number).toBe(0);
      expect(discipline).toBe(null);
    });
    
    it('should return event and discipline information for no period even if date is wrong', async () => {
      jest.useFakeTimers().setSystemTime(new Date('1488-01-01T00:00:00'));
      const { event } = await scheduleService.getEvent('some-event-1st-semester-no-period-09-12', 1);
      expect(event.id).toBe('some-event-1st-semester-no-period-09-12');
    });

    it('should throw DataNotFoundException because semester wasn\'t found', async () => {
      jest.useFakeTimers().setSystemTime(new Date('1488-01-01T00:00:00'));
      await expect(
        scheduleService.getEvent('practice-event-1st-semester-every-week-09-12', 1)
      ).rejects.toThrow(DataNotFoundException);
    });
    
    it('should throw InvalidWeekException because specified week doesn\'t contain the event', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));
      await expect(
        scheduleService.getEvent('practice-event-1st-semester-every-week-09-12', 1)
      ).rejects.toThrow(InvalidWeekException);
    });
  });

  describe('getAllGroupEvents', () => {
    it('should return events with default filter', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));
      const events = await scheduleService.getAllGroupEvents('group', 2, {});
      expect(events.length).not.toBe(0);
    });
    
    it('should return only events witch are otherEvents', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));
      const events = await scheduleService.getAllGroupEvents('group', 2, {
        addLecture: false,
        addPractice: false,
        addLaboratory: false,
        showOwnSelective: false,
        otherEvents: true,
      });
      expect(
        events.every((event) => 
          event.lessons.every(
            (lesson) => lesson.disciplineType.name !== DisciplineTypeEnum.LECTURE &&
                  lesson.disciplineType.name !== DisciplineTypeEnum.PRACTICE && 
                  lesson.disciplineType.name !== DisciplineTypeEnum.LABORATORY
          )
        )
      ).toBe(true);
    });

    it('should return empty list because there aren\'t any events in the specified week', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));
      const events = await scheduleService.getAllGroupEvents('group', 100, {});
      expect(events.length).toBe(0);
    });
  });

  describe('getGroupEvents', () => {
    it('should return all group events in the specified week', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-12T00:01:00'));
      const { startTime, events } = await scheduleService.getGroupEvents('user', 'group', 2, {});
      expect(startTime).toStrictEqual(new Date('2022-09-12T00:00:00'));
      expect(events.every((event) => event.groupId === 'group')).toBe(true);
    });  
    
    it('should return only selective disciplines', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-12T00:01:00'));
      const { events } = await scheduleService.getGroupEvents('user', 'group', 2, {
        showOwnSelective: true,
      });
      const event = events.find(
        (event) => event.id === 'nonselected-lecture-event-1st-semester-every-week-09-05'
      );
      expect(event).not.toBeDefined();
    });  

    it('should return lecture, practice and laboratory events for not user\'s group', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-12T00:01:00'));
      const { events } = await scheduleService.getGroupEvents('user', 'anotherGroup', 2, {});
      
      expect(events.every(
        (event) => event.groupId === 'anotherGroup' && event.lessons.every(
          (lesson) => lesson.disciplineType.name === DisciplineTypeEnum.LECTURE ||
                      lesson.disciplineType.name === DisciplineTypeEnum.PRACTICE ||
                      lesson.disciplineType.name === DisciplineTypeEnum.LABORATORY
        )
      )).toBe(true);
    }); 

    it('should return only other events', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-12T00:01:00'));
      const { events } = await scheduleService.getGroupEvents('user', 'group', 2, {
        addLecture: false,
        addPractice: false,
        addLaboratory: false,
        showOwnSelective: true,
        otherEvents: true,
      });

      expect(events.every(
        (event) => event.lessons.every(
          (lesson) => lesson.disciplineType.name !== DisciplineTypeEnum.LECTURE &&
                      lesson.disciplineType.name !== DisciplineTypeEnum.PRACTICE &&
                      lesson.disciplineType.name !== DisciplineTypeEnum.LABORATORY
        ))
      ).toBe(true);
    });  
  });
  
  afterAll(async () => {
    await prisma.discipline.deleteMany();
    await prisma.student.deleteMany();
    await prisma.user.deleteMany();
    await prisma.group.deleteMany();
    await prisma.subject.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.event.deleteMany();
    await prisma.disciplineType.deleteMany();
    await prisma.selectiveDiscipline.deleteMany();
    await prisma.eventInfo.deleteMany();
  });
});