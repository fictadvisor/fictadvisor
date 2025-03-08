import { Test } from '@nestjs/testing';
import { InjectionToken } from '@nestjs/common';
import { CreateEventDTO, CreateFacultyEventDTO, GeneralEventFiltrationDTO } from '@fictadvisor/utils/requests';
import {
  AbbreviationOfSpeciality,
  DisciplineTypeEnum,
  EducationProgram,
  EventTypeEnum,
  Period,
} from '@fictadvisor/utils/enums';
import { TelegramAPI } from '../../../src/modules/telegram-api/telegram-api';
import { PrismaModule } from '../../../src/database/prisma.module';
import { DateModule } from '../../../src/modules/date/date.module';
import { MapperModule } from '../../../src/common/mappers/mapper.module';
import { ScheduleService } from '../../../src/modules/schedule/v2/schedule.service';
import { PrismaService } from '../../../src/database/v2/prisma.service';
import { DisciplineTeacherService } from '../../../src/modules/teacher/v2/discipline-teacher.service';
import { UserService } from '../../../src/modules/user/v2/user.service';
import { AuthService } from '../../../src/modules/auth/v2/auth.service';
import { GroupService } from '../../../src/modules/group/v2/group.service';
import { FileService } from '../../../src/modules/file/file.service';
import { PollService } from '../../../src/modules/poll/v2/poll.service';
import { DataNotFoundException } from '../../../src/common/exceptions/data-not-found.exception';
import { InvalidWeekException } from '../../../src/common/exceptions/invalid-week.exception';
import { ObjectIsRequiredException } from '../../../src/common/exceptions/object-is-required.exception';
import { NoPermissionException } from '../../../src/common/exceptions/no-permission.exception';
import { CampusParser } from '../../../src/modules/parser/v2/campus-parser';
import { RozParser } from '../../../src/modules/parser/v2/roz-parser';
import { GeneralParser } from '../../../src/modules/parser/v2/general-parser';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';


describe('ScheduleService', () => {
  let scheduleService: ScheduleService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ScheduleService,
        UserService,
        GeneralParser,
        {
          provide: RozParser,
          useValue: {},
        },
        {
          provide: CampusParser,
          useValue: {},
        }],
      imports: [
        DateModule,
        PrismaModule,
        MapperModule,
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
      ],
    }).useMocker((token) => {
      const tokens: InjectionToken[] = [
        FileService,
        AuthService,
        GroupService,
        DisciplineTeacherService,
        TelegramAPI,
        PollService,
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

    await prisma.speciality.create({
      data: {
        id: 'specialityId1',
        code: '126',
        abbreviation: AbbreviationOfSpeciality.IST,
        name: 'Інформаційні системи та технології',
      },
    });

    await prisma.educationalPrograms.createMany({
      data: [
        {
          id: 'issEducationalProgramId',
          name: 'Інтегровані інформаційні системи',
          abbreviation: EducationProgram.IIS,
          specialityId: 'specialityId1',
        },
        {
          id: 'isrsEducationalProgramId',
          name: 'Інформаційне забезпечення робототехнічних систем',
          abbreviation: EducationProgram.ISRS,
          specialityId: 'specialityId1',
        },
      ],
    });

    await prisma.cathedra.createMany({
      data: [
        {
          id: 'ipiCathedraId',
          abbreviation: 'ІПІ',
          name: 'Кафедра інформатики та програмної інженерії',
          createdAt: new Date('2023-10-20 06:21:33.294'),
          updatedAt: new Date('2023-10-20 06:21:33.294'),
        },
        {
          id: 'istCathedraId',
          abbreviation: 'ІСТ',
          name: 'Кафедра інформаційних систем та технологій',
          createdAt: new Date('2023-09-09 20:26:19.138'),
          updatedAt: new Date('2023-10-20 06:43:01.835'),
        },
      ],
    });

    await prisma.group.createMany({
      data: [
        {
          id: 'group',
          code: 'AA-12',
          educationalProgramId: 'issEducationalProgramId',
          cathedraId: 'ipiCathedraId',
          admissionYear: 2022,
        },
        {
          id: 'anotherGroup',
          code: 'AA-11',
          educationalProgramId: 'isrsEducationalProgramId',
          cathedraId: 'istCathedraId',
          admissionYear: 2022,
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
        {
          id: 'anotherGroup-selectiveDiscipline',
          name: DisciplineTypeEnum.LECTURE,
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
          eventsAmount: 9,
          teacherForceChanges: false,
          isCustom: false,
          startTime: new Date('2022-09-05T08:30:00'),
          endTime: new Date('2022-09-05T10:00:00'),
        },
        {
          id: 'practice-event-1st-semester-every-week-09-12',
          name: 'name2',
          groupId: 'group',
          period: Period.EVERY_WEEK,
          eventsAmount: 18,
          teacherForceChanges: false,
          isCustom: false,
          startTime: new Date('2022-09-12T08:30:00'),
          endTime: new Date('2022-09-12T10:00:00'),
        },
        {
          id: 'workout-event-1st-semester-every-fortnight-09-12',
          name: 'name3',
          groupId: 'group',
          period: Period.EVERY_FORTNIGHT,
          eventsAmount: 9,
          teacherForceChanges: false,
          isCustom: false,
          startTime: new Date('2022-09-12T08:30:00'),
          endTime: new Date('2022-09-12T10:00:00'),
        },
        {
          id: 'some-event-1st-semester-no-period-09-12',
          name: 'name4',
          groupId: 'group',
          period: Period.NO_PERIOD,
          eventsAmount: 1,
          teacherForceChanges: false,
          isCustom: false,
          startTime: new Date('2022-09-12T08:30:00'),
          endTime: new Date('2022-09-12T10:00:00'),
        },
        {
          id: 'event-2st-semester-every-week-02-05',
          name: 'name5',
          groupId: 'group',
          period: Period.EVERY_WEEK,
          eventsAmount: 18,
          teacherForceChanges: false,
          isCustom: false,
          startTime: new Date('2023-02-05T08:00:00'),
          endTime: new Date('2023-02-05T10:00:00'),
        },

        {
          id: 'nonselected-lecture-event-1st-semester-every-week-09-05',
          name: 'name6',
          groupId: 'group',
          period: Period.EVERY_WEEK,
          eventsAmount: 18,
          teacherForceChanges: false,
          isCustom: false,
          startTime: new Date('2022-09-05T08:30:00'),
          endTime: new Date('2022-09-05T10:00:00'),
        },
        {
          id: 'selective-practice-event-1st-semester-every-week-09-12',
          name: 'name7',
          groupId: 'group',
          period: Period.EVERY_WEEK,
          eventsAmount: 18,
          teacherForceChanges: false,
          isCustom: false,
          startTime: new Date('2022-09-12T08:30:00'),
          endTime: new Date('2022-09-12T10:00:00'),
        },
        {
          id: 'selective-workout-event-1st-semester-every-fortnight-09-12',
          name: 'name8',
          groupId: 'group',
          period: Period.EVERY_FORTNIGHT,
          eventsAmount: 9,
          teacherForceChanges: false,
          isCustom: false,
          startTime: new Date('2022-09-12T08:30:00'),
          endTime: new Date('2022-09-12T10:00:00'),
        },

        {
          id: 'anotherGroup-lecture-event-1st-semester-every-week-09-05',
          name: 'name9',
          groupId: 'anotherGroup',
          period: Period.EVERY_WEEK,
          eventsAmount: 18,
          teacherForceChanges: false,
          isCustom: false,
          startTime: new Date('2022-09-05T08:30:00'),
          endTime: new Date('2022-09-05T10:00:00'),
        },
        {
          id: 'anotherGroup-selective-practice-event-1st-semester-every-week-09-12',
          name: 'name10',
          groupId: 'anotherGroup',
          period: Period.EVERY_WEEK,
          eventsAmount: 18,
          teacherForceChanges: false,
          isCustom: false,
          startTime: new Date('2022-09-12T08:30:00'),
          endTime: new Date('2022-09-12T10:00:00'),
        },
        {
          id: 'anotherGroup-selective-workout-event-1st-semester-every-fortnight-09-12',
          name: 'name11',
          groupId: 'anotherGroup',
          period: Period.EVERY_FORTNIGHT,
          eventsAmount: 9,
          teacherForceChanges: false,
          isCustom: false,
          startTime: new Date('2022-09-12T08:30:00'),
          endTime: new Date('2022-09-12T10:00:00'),
        },
        {
          id: 'anotherGroup-selective-workout-event-1st-semester-every-fortnight-10-12',
          name: 'name12',
          groupId: 'anotherGroup',
          period: Period.EVERY_FORTNIGHT,
          eventsAmount: 9,
          teacherForceChanges: false,
          isCustom: false,
          startTime: new Date('2022-10-12T08:30:00'),
          endTime: new Date('2022-10-12T10:00:00'),
        },
        {
          id: 'anotherGroup-workout-event-1st-semester-every-fortnight-11-12',
          name: 'name13',
          groupId: 'anotherGroup',
          period: Period.EVERY_FORTNIGHT,
          eventsAmount: 9,
          teacherForceChanges: false,
          isCustom: false,
          startTime: new Date('2022-11-12T08:30:00'),
          endTime: new Date('2022-11-12T10:00:00'),
        },
        {
          id: 'some-event-2st-semester-no-period-02-05',
          name: 'name14',
          groupId: 'group',
          period: Period.NO_PERIOD,
          eventsAmount: 1,
          teacherForceChanges: false,
          isCustom: false,
          startTime: new Date('2023-02-05T08:30:00'),
          endTime: new Date('2023-02-05T10:00:00'),
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
        {
          eventId: 'anotherGroup-selective-practice-event-1st-semester-every-week-09-12',
          number: 3,
          description: 'selective-practice',
        },
        {
          eventId: 'anotherGroup-selective-practice-event-1st-semester-every-week-09-12',
          number: 4,
          description: 'eventFromOleg',
        },
        {
          eventId: 'anotherGroup-selective-practice-event-1st-semester-every-week-09-12',
          number: 5,
          description: 'eventFromSta*',
        },
        {
          eventId: 'anotherGroup-workout-event-1st-semester-every-fortnight-11-12',
          number: 6,
          description: 'everyFortnightWorkout',
        },
        {
          eventId: 'anotherGroup-workout-event-1st-semester-every-fortnight-11-12',
          number: 7,
          description: 'everyFortnightWorkoutAnotherGroup',
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
        {
          eventId: 'anotherGroup-selective-workout-event-1st-semester-every-fortnight-10-12',
          disciplineTypeId: 'discipline-lecture',
        },
        {
          eventId: 'anotherGroup-workout-event-1st-semester-every-fortnight-11-12',
          disciplineTypeId: 'discipline-lecture',
        },
      ],
    });

    await prisma.teacher.create({
      data: {
        id: 'deletedTeacherId',
        firstName: 'Iryna',
        lastName: 'Golichenko',
      },
    });

    await prisma.disciplineTeacher.create({
      data: {
        id: 'deletedDisciplineTeacherId',
        teacherId: 'deletedTeacherId',
        disciplineId: 'nonSelectedDiscipline',
      },
    });
  });

  const generalTypes = [
    EventTypeEnum.LECTURE,
    EventTypeEnum.PRACTICE,
    EventTypeEnum.LABORATORY,
  ];

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
        eventsAmount: event.eventsAmount,
        teacherForceChanges: event.teacherForceChanges,
        isCustom: event.isCustom,
      }).toStrictEqual({
        id: 'lecture-event-1st-semester-every-fortnight-09-05',
        groupId: 'group',
        startTime: new Date('2022-09-05T08:30:00'),
        endTime: new Date('2022-09-05T10:00:00'),
        period: Period.EVERY_FORTNIGHT,
        eventsAmount: 9,
        teacherForceChanges: false,
        isCustom: false,
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

  describe('getGeneralGroupEventsWrapper', () => {
    it('should return only general events with an empty filter', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));
      const { events } = await scheduleService.getGeneralGroupEventsWrapper('group', {});
      const containsOnlyGeneral = events.every((event) => {
        return generalTypes.includes(event.lessons[0]?.disciplineType.name as unknown as EventTypeEnum);
      });
      expect(containsOnlyGeneral).toBe(true);
    });

    it('should return events with filter correctly', async () => {
      const queries: EventTypeEnum[][] = [
        [],
        [EventTypeEnum.LECTURE],
        [EventTypeEnum.LABORATORY, EventTypeEnum.PRACTICE],
        [EventTypeEnum.LECTURE, EventTypeEnum.PRACTICE, EventTypeEnum.LABORATORY],
      ];

      for (const query of queries) {
        const addLecture = query.includes(EventTypeEnum.LECTURE);
        const addPractice = query.includes(EventTypeEnum.PRACTICE);
        const addLaboratory = query.includes(EventTypeEnum.LABORATORY);
        const filter: GeneralEventFiltrationDTO = { addLecture, addPractice, addLaboratory };

        const { events } = await scheduleService.getGeneralGroupEventsWrapper('group', filter);
        const filterWorks = events.every((event) => {
          return query.includes(event.lessons[0]?.disciplineType.name as unknown as EventTypeEnum);
        });

        expect(filterWorks).toBe(true);
      }
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
        eventsAmount: event.eventsAmount,
        teacherForceChanges: event.teacherForceChanges,
        isCustom: event.isCustom,
      }).toStrictEqual({
        id: 'lecture-event-1st-semester-every-fortnight-09-05',
        startTime: new Date('2022-09-19T08:30:00'),
        endTime: new Date('2022-09-19T10:00:00'),
        period: Period.EVERY_FORTNIGHT,
        groupId: 'group',
        eventsAmount: 9,
        teacherForceChanges: false,
        isCustom: false,
      });

      expect(event.eventInfo[0].number).toBe(1);
      expect(discipline.id).toBe('discipline');
    });

    it('should return all information about event and discipline without period', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-12T00:01:00'));
      const { event, discipline } = await scheduleService.getEvent('some-event-1st-semester-no-period-09-12', 2);
      expect({
        id: event.id,
        startTime: event.startTime,
        endTime: event.endTime,
        period: event.period,
        groupId: event.groupId,
        eventsAmount: event.eventsAmount,
        teacherForceChanges: event.teacherForceChanges,
        isCustom: event.isCustom,
      }).toStrictEqual({
        id: 'some-event-1st-semester-no-period-09-12',
        startTime: new Date('2022-09-12T08:30:00'),
        endTime: new Date('2022-09-12T10:00:00'),
        period: Period.NO_PERIOD,
        groupId: 'group',
        eventsAmount: 1,
        teacherForceChanges: false,
        isCustom: false,
      });

      expect(event.eventInfo[0].number).toBe(0);
      expect(discipline).toBeNull();
    });

    it('should return event and discipline information for no period even if date is wrong', async () => {
      jest.useFakeTimers().setSystemTime(new Date('1488-01-01T00:00:00'));
      const { event } = await scheduleService.getEvent('some-event-1st-semester-no-period-09-12', 2);
      expect(event.id).toBe('some-event-1st-semester-no-period-09-12');
    });

    it('should throw DataNotFoundException if semester wasn\'t found', async () => {
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

  describe('getGroupEvents', () => {
    it('should return events with default filter', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));
      const events = await scheduleService.getGroupEvents('group', 2, {});
      expect(events.length).not.toBe(0);
    });

    it('should only return events which are not lectures, practices or labs', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));
      const events = await scheduleService.getGroupEvents('group', 2, {
        addLecture: false,
        addPractice: false,
        addLaboratory: false,
        showOwnSelective: false,
        addOtherEvents: true,
      });
      const generalTypes = [
        DisciplineTypeEnum.LECTURE,
        DisciplineTypeEnum.PRACTICE,
        DisciplineTypeEnum.LABORATORY,
      ];
      expect(
        events.every((event) =>
          event.lessons.every(
            (lesson) => !generalTypes.includes(lesson.disciplineType.name as DisciplineTypeEnum)
          )
        )
      ).toBe(true);
    });

    it('should return empty list because there aren\'t any events in the specified week', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));
      const events = await scheduleService.getGroupEvents('group', 100, {});
      expect(events.length).toBe(0);
    });
  });

  describe('getGroupEventsWrapper', () => {
    it('should return all group events in the specified week', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-12T00:01:00'));
      const { startTime, events } = await scheduleService.getGroupEventsWrapper('group', {}, 'user', 2);
      expect(startTime).toStrictEqual(new Date('2022-09-12T00:00:00'));
      expect(events.every((event) => event.groupId === 'group')).toBe(true);
    });

    it('should return only selective disciplines', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-12T00:01:00'));
      const { events } = await scheduleService.getGroupEventsWrapper('group', {
        showOwnSelective: true,
      }, 'user', 2);
      const event = events.find(
        (event) => event.id === 'nonselected-lecture-event-1st-semester-every-week-09-05'
      );
      expect(event).toBeUndefined();
    });

    it('should return lecture, practice and laboratory events for not user\'s group', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-12T00:01:00'));
      const { events } = await scheduleService.getGroupEventsWrapper('anotherGroup', {}, 'user', 2);
      const generalTypes = [
        DisciplineTypeEnum.LECTURE,
        DisciplineTypeEnum.PRACTICE,
        DisciplineTypeEnum.LABORATORY,
      ];

      expect(events.every(
        (event) => event.groupId === 'anotherGroup' && event.lessons.every(
          (lesson) => generalTypes.includes(lesson.disciplineType.name as DisciplineTypeEnum)
        )
      )).toBe(true);
    });

    it('should only return other events', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-12T00:01:00'));
      const { events } = await scheduleService.getGroupEventsWrapper('group', {
        addLecture: false,
        addPractice: false,
        addLaboratory: false,
        showOwnSelective: true,
        addOtherEvents: true,
      }, 'user', 2);

      expect(events.every(
        (event) => event.lessons.every(
          (lesson) => lesson.disciplineType.name !== DisciplineTypeEnum.LECTURE &&
                      lesson.disciplineType.name !== DisciplineTypeEnum.PRACTICE &&
                      lesson.disciplineType.name !== DisciplineTypeEnum.LABORATORY
        ))
      ).toBe(true);
    });
  });

  describe('getGroupEventsByDay', () => {
    it('should return no events on the day without events', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));
      const events = await scheduleService.getGroupEventsByDay('group', 'user', 1, 2);
      expect(events.length).toBe(0);
    });

    it('should only return events that occur on the given day', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));
      const events = await scheduleService.getGroupEventsByDay('group', 'user', 1, 1);
      events.forEach(({ startTime }) => {
        const day = startTime.getUTCDate();
        const month = startTime.getUTCMonth() + 1;
        const year = startTime.getUTCFullYear();
        const startDate = `${day}.${month}.${year}`;
        expect(startDate).toBe('5.9.2022');
      });
    });
  });

  describe('getFortnightEvents', () => {
    it('should only return events that occur on the given fortnight', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));
      const weeks = [1, 2];
      const firstWeekStart = new Date(2022, 8, 5);
      const firstWeekEnd = new Date(2022, 8, 12);
      const secondWeekStart = new Date(2022, 8, 12);
      const secondWeekEnd = new Date(2022, 8, 19);
      for (const week of weeks) {
        const { firstWeekEvents, secondWeekEvents } = await scheduleService.getFortnightEvents('group', {}, week, 'user');
        firstWeekEvents.forEach(({ startTime }) => {
          expect(firstWeekStart <= startTime).toBe(true);
          expect(startTime < firstWeekEnd).toBe(true);
        });
        secondWeekEvents.forEach(({ startTime }) => {
          expect(secondWeekStart <= startTime).toBe(true);
          expect(startTime < secondWeekEnd).toBe(true);
        });
      }
    });
  });

  describe('getGroupEventsForTelegram', () => {
    it('should throw an error if the requested group is not student\'s', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));
      expect(scheduleService.getGroupEventsForTelegram('anotherGroup', 1, 'user')).rejects.toThrow(NoPermissionException);
    });

    it('should only return public events if no userId is specified', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));
      const events = await scheduleService.getGroupEventsForTelegram('group', 1);
      const areAllPublic = events.every((event) => {
        return generalTypes.includes(event.lessons[0]?.disciplineType.name as unknown as EventTypeEnum);
      });
      expect(areAllPublic).toBe(true);
    });
  });

  describe('createGroupEvent', () => {
    it('should create an event without a discipline', async () => {
      const createEventDTO: CreateEventDTO = {
        groupId: 'group',
        name: 'name3',
        period: Period.NO_PERIOD,
        startTime: new Date('2022-09-12T08:30:00'),
        endTime: new Date('2022-09-12T10:00:00'),
        eventInfo: 'Description of the event',
        teacherIds: [],
      };

      const result = await scheduleService.createGroupEvent(createEventDTO);
      expect(result).toStrictEqual({
        event: {
          groupId: createEventDTO.groupId,
          name: createEventDTO.name,
          period: createEventDTO.period,
          startTime: createEventDTO.startTime,
          endTime: createEventDTO.endTime,
          eventsAmount: 1,
          teacherForceChanges: false,
          isCustom: true,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          eventInfo: [
            {
              createdAt: expect.any(Date),
              description: createEventDTO.eventInfo,
              eventId: result.event.id,
              number: 0,
              updatedAt: expect.any(Date),
            },
          ],
          lessons: [],
          group: {
            cathedraId: 'ipiCathedraId',
            code: 'AA-12',
            createdAt: expect.any(Date),
            educationalProgramId: 'issEducationalProgramId',
            id: 'group',
            admissionYear: 2022,
            updatedAt: expect.any(Date),
          },
          id: result.event.id,
          url: result.event.url,
        },
      });
    });

    it('should create a week event with a discipline', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));
      const createEventDTO: CreateEventDTO = {
        groupId: 'group',
        name: 'name2',
        period: Period.EVERY_WEEK,
        startTime: new Date('2022-09-12T08:30:00'),
        endTime: new Date('2022-09-12T10:00:00'),
        eventInfo: 'Description of the event',
        disciplineId: 'nonSelectedDiscipline',
        eventType: EventTypeEnum.LECTURE,
        teacherIds: ['deletedTeacherId'],
      };

      const attachedDiscipline = {
        createdAt: expect.any(Date),
        description: '',
        disciplineTeachers: [{
          createdAt: expect.any(Date),
          disciplineId: 'nonSelectedDiscipline',
          id: 'deletedDisciplineTeacherId',
          roles: [{
            createdAt: expect.any(Date),
            disciplineTeacherId: 'deletedDisciplineTeacherId',
            'disciplineType': {
              'createdAt': expect.any(Date),
              'disciplineId': 'nonSelectedDiscipline',
              'id': 'nonSelectedDiscipline-lecture',
              'name': 'LECTURE',
              'updatedAt': expect.any(Date),
            },
            disciplineTypeId: 'nonSelectedDiscipline-lecture',
            updatedAt: expect.any(Date),
          }],
          teacher: {
            cathedras: [],
            academicStatus: null,
            position: null,
            scientificDegree: null,
            avatar: null,
            createdAt: expect.any(Date),
            description: null,
            firstName: 'Iryna',
            lastName: 'Golichenko',
            middleName: '',
            id: 'deletedTeacherId',
            rating: 0,
            updatedAt: expect.any(Date),
          },
          teacherId: 'deletedTeacherId',
          updatedAt: expect.any(Date),
        }],
        group: {
          cathedraId: 'ipiCathedraId',
          code: 'AA-12',
          createdAt: expect.any(Date),
          educationalProgramId: 'issEducationalProgramId',
          id: 'group',
          admissionYear: 2022,
          updatedAt: expect.any(Date),
          selectiveAmounts: [],
        },
        groupId: 'group',
        id: 'nonSelectedDiscipline',
        isSelective: true,
        semester: 1,
        subject: {
          createdAt: expect.any(Date),
          id: 'subject',
          name: 'subject',
          updatedAt: expect.any(Date),
        },
        subjectId: 'subject',
        updatedAt: expect.any(Date),
        year: 2022,
      };

      const {
        event: { eventInfo },
        discipline: { disciplineTypes, ...discipline },
      } = await scheduleService.createGroupEvent(createEventDTO);
      const disciplineTeachers = discipline.disciplineTeachers.map((dt) => {
        return { ...dt, teacher: { ...dt.teacher, rating: dt.teacher.rating.toNumber() } };
      });
      expect(eventInfo.length).toBe(1);
      expect({ ...discipline, disciplineTeachers }).toStrictEqual(attachedDiscipline);
    });

    it('should create a fortnight event with a discipline', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));
      const createEventDTO: CreateEventDTO = {
        groupId: 'group',
        name: 'name2',
        period: Period.EVERY_FORTNIGHT,
        startTime: new Date('2022-09-12T08:30:00'),
        endTime: new Date('2022-09-12T10:00:00'),
        eventInfo: 'Description of the event',
        disciplineId: 'nonSelectedDiscipline',
        eventType: EventTypeEnum.LECTURE,
        teacherIds: ['deletedTeacherId'],
      };

      const attachedDiscipline = {
        createdAt: expect.any(Date),
        description: '',
        disciplineTeachers: [{
          createdAt: expect.any(Date),
          disciplineId: 'nonSelectedDiscipline',
          id: 'deletedDisciplineTeacherId',
          roles: [{
            createdAt: expect.any(Date),
            disciplineTeacherId: 'deletedDisciplineTeacherId',
            'disciplineType': {
              'createdAt': expect.any(Date),
              'disciplineId': 'nonSelectedDiscipline',
              'id': 'nonSelectedDiscipline-lecture',
              'name': 'LECTURE',
              'updatedAt': expect.any(Date),
            },
            disciplineTypeId: 'nonSelectedDiscipline-lecture',
            updatedAt: expect.any(Date),
          }],
          teacher: {
            cathedras: [],
            academicStatus: null,
            position: null,
            scientificDegree: null,
            avatar: null,
            createdAt: expect.any(Date),
            description: null,
            firstName: 'Iryna',
            lastName: 'Golichenko',
            middleName: '',
            id: 'deletedTeacherId',
            rating: 0,
            updatedAt: expect.any(Date),
          },
          teacherId: 'deletedTeacherId',
          updatedAt: expect.any(Date),
        }],
        group: {
          cathedraId: 'ipiCathedraId',
          code: 'AA-12',
          createdAt: expect.any(Date),
          educationalProgramId: 'issEducationalProgramId',
          admissionYear: 2022,
          id: 'group',
          updatedAt: expect.any(Date),
          selectiveAmounts: [],
        },
        groupId: 'group',
        id: 'nonSelectedDiscipline',
        isSelective: true,
        semester: 1,
        subject: {
          createdAt: expect.any(Date),
          id: 'subject',
          name: 'subject',
          updatedAt: expect.any(Date),
        },
        subjectId: 'subject',
        updatedAt: expect.any(Date),
        year: 2022,
      };

      const {
        event: { eventInfo },
        discipline: { disciplineTypes, ...discipline },
      } = await scheduleService.createGroupEvent(createEventDTO);
      const disciplineTeachers = discipline.disciplineTeachers.map((dt) => {
        return { ...dt, teacher: { ...dt.teacher, rating: dt.teacher.rating.toNumber() } };
      });

      expect(discipline.description).toBe(attachedDiscipline.description);
      expect(eventInfo.length).toBe(1);
      expect({ ...discipline, disciplineTeachers }).toStrictEqual(attachedDiscipline);
    });

    it('should throw an error if disciplineId is provided without disciplineType', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));
      const createEventDTO: CreateEventDTO = {
        groupId: 'group',
        name: 'name1',
        period: Period.NO_PERIOD,
        startTime: new Date('2022-09-12T08:30:00'),
        endTime: new Date('2022-09-12T10:00:00'),
        eventInfo: 'Description of the event',
        disciplineId: 'disciplineId123',
        teacherIds: ['deletedTeacherId'],
      };

      await expect(scheduleService.createGroupEvent(createEventDTO)).rejects.toThrow(ObjectIsRequiredException);
    });
  });

  describe('createFacultyEvent', () => {
    it('should create an event for all groups', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));
      const createFacultyEventDTO: CreateFacultyEventDTO = {
        name: 'facultyEvent',
        startTime: new Date('2022-09-12T08:30:00'),
        endTime: new Date('2022-09-12T10:00:00'),
        eventInfo: 'Description of the event',
      };

      const events = await scheduleService.createFacultyEvent(createFacultyEventDTO);
      const groupIds = events.map((event) => event.groupId);

      expect(events.length).toBe(2);
      expect(groupIds).toEqual(expect.arrayContaining(['group', 'anotherGroup']));
    });
  });

  describe('updateEvent', () => {
    it('should throw an ObjectIsRequiredException if changeStartDate/changeEndDate is true, but startTime/endTime is not provided', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2024-06-25T21:32:26.231Z'));
      const eventId = 'practice-event-1st-semester-every-week-09-12';
      let data: any = {
        week: 1,
        changeStartDate: true,
      };

      await expect(scheduleService.updateEvent(eventId, data)).rejects.toThrow(
        new ObjectIsRequiredException('startTime')
      );

      data = {
        week: 1,
        changeEndDate: true,
      };

      await expect(scheduleService.updateEvent(eventId, data)).rejects.toThrow(
        new ObjectIsRequiredException('endTime')
      );
    });

    it('should change time without date', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-02-05T08:00:00'));
      const eventId = 'event-2st-semester-every-week-02-05';
      const time = {
        startTime: new Date('2023-02-08T11:19:00'),
        endTime: new Date('2023-02-08T12:19:00'),
      };
      const data = {
        week: 1,
        changeStartDate: false,
        startTime: time.startTime,
        endTime: time.endTime,
        period: Period.EVERY_WEEK,
      };
      await scheduleService.updateEvent(eventId, data);
      const { event } = await scheduleService.getEvent(eventId, 1);

      for (const t in time) {
        expect(event[t].getHours()).toEqual(time[t].getHours());
        expect(event[t].getMinutes()).toEqual(time[t].getMinutes());

        expect(event[t].getDate()).not.toEqual(time[t].getDate());
      }
    });

    it('should delete eventInfo', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-02-17T08:30:00'));
      const eventId = 'some-event-2st-semester-no-period-02-05';
      const data = {
        week: 1,
        eventInfo: '',
      };

      await scheduleService.updateEvent(eventId, data);

      const expectedEvent = {
        id: 'some-event-2st-semester-no-period-02-05',
        name: 'name14',
        startTime: new Date('2023-02-05T08:30:00.000Z'),
        endTime: new Date('2023-02-05T10:00:00.000Z'),
        period: 'NO_PERIOD',
        url: null,
        groupId: 'group',
        eventsAmount: 1,
        teacherForceChanges: false,
        isCustom: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        group: {
          id: 'group',
          code: 'AA-12',
          admissionYear: 2022,
          educationalProgramId: 'issEducationalProgramId',
          cathedraId: 'ipiCathedraId',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        eventInfo: [],
        lessons: [],
      };

      const { event } = await scheduleService.getEvent(eventId, data.week);
      expect(event).toStrictEqual(expectedEvent);
    });

    it('should update an event without discipline', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-02-20T08:30:00'));
      const eventId = 'some-event-2st-semester-no-period-02-05';
      const data = {
        week: 1,
        name: 'some name',
        period: Period.EVERY_WEEK,
        url: 'https://kvdkpsldv.com',
        eventInfo: 'info dsk wds',
        startTime: new Date('2023-02-06T08:30:00'),
        endTime: new Date('2023-02-06T10:00:00'),
        changeStartDate: true,
        changeEndDate: true,
      };

      const expectedEvent = {
        id: 'some-event-2st-semester-no-period-02-05',
        name: 'some name',
        startTime: new Date('2023-02-06T08:30:00.000Z'),
        endTime: new Date('2023-02-06T10:00:00.000Z'),
        period: 'EVERY_WEEK',
        url: 'https://kvdkpsldv.com',
        groupId: 'group',
        eventsAmount: 18,
        teacherForceChanges: false,
        isCustom: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        group: {
          id: 'group',
          code: 'AA-12',
          admissionYear: 2022,
          educationalProgramId: 'issEducationalProgramId',
          cathedraId: 'ipiCathedraId',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        eventInfo: [
          {
            eventId: 'some-event-2st-semester-no-period-02-05',
            number: 0,
            description: 'info dsk wds',
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          },
        ],
        lessons: [],
      };

      await scheduleService.updateEvent(eventId, data);
      const { event } = await scheduleService.getEvent(eventId, data.week);

      expect(event).toStrictEqual(expectedEvent);
    });

    it('should throw an ObjectIsRequiredException if lesson and disciplineId or eventType is not provided', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-17T08:30:00'));
      const eventId = 'some-event-1st-semester-no-period-09-12';
      const data = {
        week: 2,
        disciplineInfo: 'vef',
      };

      await expect(scheduleService.updateEvent(eventId, data)).rejects.toThrow(
        new ObjectIsRequiredException('disciplineType')
      );
    });

    it('should update an event with discipline', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-02-20T08:30:00'));
      const eventId = 'some-event-2st-semester-no-period-02-05';
      const data = {
        week: 1,
        name: 'some name',
        period: Period.EVERY_FORTNIGHT,
        url: 'https://ngfbd.com',
        eventInfo: 'info dsk wds',
        startTime: new Date('2023-02-07T09:30:00'),
        endTime: new Date('2023-02-07T11:00:00'),
        changeStartDate: true,
        changeEndDate: true,
        disciplineId: 'nonSelectedDiscipline',
        eventType: EventTypeEnum.LECTURE,
        teachers: ['deletedTeacherId'],
      };

      const expectedEvent = {
        id: 'some-event-2st-semester-no-period-02-05',
        name: 'some name',
        startTime: new Date('2023-02-07T09:30:00.000Z'),
        endTime: new Date('2023-02-07T11:00:00.000Z'),
        period: Period.EVERY_FORTNIGHT,
        url: 'https://ngfbd.com',
        groupId: 'group',
        eventsAmount: 9,
        teacherForceChanges: false,
        isCustom: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        group: {
          id: 'group',
          code: 'AA-12',
          admissionYear: 2022,
          educationalProgramId: 'issEducationalProgramId',
          cathedraId: 'ipiCathedraId',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        eventInfo: [
          {
            eventId: 'some-event-2st-semester-no-period-02-05',
            number: 0,
            description: 'info dsk wds',
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          },
        ],
        lessons: [
          {
            eventId: 'some-event-2st-semester-no-period-02-05',
            disciplineTypeId: 'nonSelectedDiscipline-lecture',
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            disciplineType: {
              id: 'nonSelectedDiscipline-lecture',
              disciplineId: 'nonSelectedDiscipline',
              name: EventTypeEnum.LECTURE,
              createdAt: expect.any(Date),
              updatedAt: expect.any(Date),
            },
          },
        ],
      };

      await scheduleService.updateEvent(eventId, data);
      const { event } = await scheduleService.getEvent(eventId, data.week);

      expect(event).toStrictEqual(expectedEvent);
    });
  });

  describe('deleteEvent', () => {
    const attachedDiscipline = {
      createdAt: expect.any(Date),
      description: '',
      disciplineTeachers: [],
      group: {
        cathedraId: 'ipiCathedraId',
        code: 'AA-12',
        createdAt: expect.any(Date),
        educationalProgramId: 'issEducationalProgramId',
        id: 'group',
        admissionYear: 2022,
        updatedAt: expect.any(Date),
        selectiveAmounts: [],
      },
      groupId: 'group',
      id: 'discipline',
      isSelective: false,
      semester: 1,
      subject: {
        createdAt: expect.any(Date),
        id: 'subject',
        name: 'subject',
        updatedAt: expect.any(Date),
      },
      subjectId: 'subject',
      updatedAt: expect.any(Date),
      year: 2022,
    };

    it('should delete an event without associated lessons', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));
      const eventToDelete = {
        id: 'some-event-1st-semester-no-period-09-12',
        name: 'name4',
        groupId: 'group',
        eventsAmount: 1,
        teacherForceChanges: false,
        isCustom: false,
        period: Period.NO_PERIOD,
        group: {
          cathedraId: 'ipiCathedraId',
          code: 'AA-12',
          createdAt: expect.any(Date),
          educationalProgramId: 'issEducationalProgramId',
          id: 'group',
          admissionYear: 2022,
          updatedAt: expect.any(Date),
        },
        eventInfo: [
          {
            createdAt: expect.any(Date),
            description: 'something',
            eventId: 'some-event-1st-semester-no-period-09-12',
            number: 0,
            updatedAt: expect.any(Date),
          },
        ],
        startTime: new Date('2022-09-12T08:30:00'),
        endTime: new Date('2022-09-12T10:00:00'),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        lessons: [],
        url: null,
      };

      const deletedEvent = await scheduleService.deleteEvent(eventToDelete.id);
      expect(deletedEvent.event).toEqual(eventToDelete);
    });

    it('should delete an event with associated lessons and discipline', async () => {
      const deletedEventID = 'anotherGroup-selective-practice-event-1st-semester-every-week-09-12';
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));
      const eventToDelete = {
        id: 'anotherGroup-selective-practice-event-1st-semester-every-week-09-12',
        name: 'name10',
        groupId: 'anotherGroup',
        period: Period.EVERY_WEEK,
        eventsAmount: 18,
        teacherForceChanges: false,
        isCustom: false,
        group: {
          cathedraId: 'istCathedraId',
          code: 'AA-11',
          createdAt: expect.any(Date),
          educationalProgramId: 'isrsEducationalProgramId',
          id: 'anotherGroup',
          admissionYear: 2022,
          updatedAt: expect.any(Date),
        },
        startTime: new Date('2022-09-12T08:30:00'),
        endTime: new Date('2022-09-12T10:00:00'),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        lessons: [
          {
            createdAt: expect.any(Date),
            disciplineType: {
              createdAt: expect.any(Date),
              disciplineId: 'anotherGroup-discipline',
              id: 'anotherGroup-selectiveDiscipline-practice',
              name: 'PRACTICE',
              updatedAt: expect.any(Date),
            },
            disciplineTypeId: 'anotherGroup-selectiveDiscipline-practice',
            eventId: 'anotherGroup-selective-practice-event-1st-semester-every-week-09-12',
            updatedAt: expect.any(Date),
          },
        ],
        url: null,
      };

      const { event: { eventInfo, ...event } } = await scheduleService.deleteEvent(deletedEventID);

      expect(eventInfo.length).toBe(3);
      expect(event).toStrictEqual(eventToDelete);
    });

    it('should delete disciplineTeachers and discipline', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));
      const eventToDelete = {
        id: 'lecture-event-1st-semester-every-fortnight-09-05',
        name: 'name1',
        groupId: 'group',
        eventsAmount: 9,
        teacherForceChanges: false,
        isCustom: false,
        period: Period.EVERY_FORTNIGHT,
        group: {
          cathedraId: 'ipiCathedraId',
          code: 'AA-12',
          createdAt: expect.any(Date),
          educationalProgramId: 'issEducationalProgramId',
          id: 'group',
          admissionYear: 2022,
          updatedAt: expect.any(Date),
        },
        startTime: new Date('2022-09-05T08:30:00.000Z'),
        endTime: new Date('2022-09-05T10:00:00.000Z'),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        lessons: [
          {
            disciplineType: {
              createdAt: expect.any(Date),
              disciplineId: 'discipline',
              id: 'discipline-lecture',
              name: 'LECTURE',
              updatedAt: expect.any(Date),
            },
            createdAt: expect.any(Date),
            disciplineTypeId: 'discipline-lecture',
            eventId: 'lecture-event-1st-semester-every-fortnight-09-05',
            updatedAt: expect.any(Date),
          },
        ],
        url: null,
      };

      const {
        event: { eventInfo, ...event },
        discipline: { disciplineTypes, ...discipline },
      } = await scheduleService.deleteEvent(eventToDelete.id);

      expect(discipline).toStrictEqual(attachedDiscipline);
      expect(eventInfo.length).toBe(2);
      expect(event).toStrictEqual(eventToDelete);
    });

    it('shouldn\'t delete disciplineTeachers and disciplineType', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-09-05T00:01:00'));

      const eventToDelete = {
        id: 'anotherGroup-workout-event-1st-semester-every-fortnight-11-12',
        name: 'name13',
        groupId: 'anotherGroup',
        period: Period.EVERY_FORTNIGHT,
        eventsAmount: 9,
        teacherForceChanges: false,
        isCustom: false,
        group: {
          cathedraId: 'istCathedraId',
          code: 'AA-11',
          createdAt: expect.any(Date),
          educationalProgramId: 'isrsEducationalProgramId',
          id: 'anotherGroup',
          admissionYear: 2022,
          updatedAt: expect.any(Date),
        },
        startTime: new Date('2022-11-12T08:30:00.000Z'),
        endTime: new Date('2022-11-12T10:00:00.000Z'),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        lessons: [
          {
            disciplineType: {
              createdAt: expect.any(Date),
              disciplineId: 'discipline',
              id: 'discipline-lecture',
              name: 'LECTURE',
              updatedAt: expect.any(Date),
            },
            createdAt: expect.any(Date),
            disciplineTypeId: 'discipline-lecture',
            eventId: 'anotherGroup-workout-event-1st-semester-every-fortnight-11-12',
            updatedAt: expect.any(Date),
          },
        ],
        url: null,
      };

      const {
        event: { eventInfo, ...event },
        discipline: { disciplineTypes, ...discipline },
      } = await scheduleService.deleteEvent(eventToDelete.id);

      const disciplineType = await prisma.disciplineType.findFirst({
        where: {
          id: 'discipline-lecture',
        },
      });
      expect(disciplineType).not.toBeNull();
      expect(discipline).toStrictEqual(attachedDiscipline);
      expect(eventInfo.length).toBe(2);
      expect(event).toStrictEqual(eventToDelete);
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
    await prisma.teacher.deleteMany();
    await prisma.speciality.deleteMany();
    await prisma.educationalPrograms.deleteMany();
    await prisma.cathedra.deleteMany();
  });
});
