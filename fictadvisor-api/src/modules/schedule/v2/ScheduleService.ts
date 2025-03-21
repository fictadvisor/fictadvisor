import { Injectable } from '@nestjs/common';
import {
  AttachLessonDTO,
  CreateEventDTO,
  CreateFacultyEventDTO,
  EventFiltrationDTO,
  GeneralEventFiltrationDTO,
  ParseScheduleQueryDTO,
  UpdateEventDTO,
} from '@fictadvisor/utils/requests';
import { EventTypeEnum, ParserTypeEnum } from '@fictadvisor/utils/enums';
import { DisciplineTypeEnum, Period } from '@prisma/client/fictadvisor';
import { DateTime } from 'luxon';
import { DateService, FORTNITE, StudyingSemester, WEEK } from '../../date/DateService';
import { DateUtils } from '../../date/DateUtils';
import { every, everyAsync, filterAsync, find, some } from '../../../common/helpers/arrayUtils';
import { UserService } from '../../user/v2/UserService';
import { DbEvent } from '../../../database/v2/entities/DbEvent';
import { DbDiscipline } from '../../../database/v2/entities/DbDiscipline';
import { DbDisciplineType } from '../../../database/v2/entities/DbDisciplineType';
import { EventRepository } from '../../../database/v2/repositories/EventRepository';
import { DisciplineRepository } from '../../../database/v2/repositories/DisciplineRepository';
import { DisciplineTeacherRepository } from '../../../database/v2/repositories/DisciplineTeacherRepository';
import { DisciplineTeacherRoleRepository } from '../../../database/v2/repositories/DisciplineTeacherRoleRepository';
import { StudentRepository } from '../../../database/v2/repositories/StudentRepository';
import { InvalidDateException } from '../../../common/exceptions/InvalidDateException';
import { ObjectIsRequiredException } from '../../../common/exceptions/ObjectIsRequiredException';
import { InvalidWeekException } from '../../../common/exceptions/InvalidWeekException';
import { NoPermissionException } from '../../../common/exceptions/NoPermissionException';
import { GroupRepository } from '../../../database/v2/repositories/GroupRepository';
import { GeneralParser } from '../../parser/GeneralParser';
import { Cron } from '@nestjs/schedule';
import { DbDisciplineTeacher } from '../../../database/v2/entities/DbDisciplineTeacher';

export const weeksPerEvent = {
  EVERY_WEEK: WEEK / WEEK,
  EVERY_FORTNIGHT: FORTNITE / WEEK,
  NO_PERIOD: 1,
};

@Injectable()
export class ScheduleService {

  constructor (
    private dateService: DateService,
    private eventRepository: EventRepository,
    private disciplineRepository: DisciplineRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private disciplineTeacherRoleRepository: DisciplineTeacherRoleRepository,
    private userService: UserService,
    private studentRepository: StudentRepository,
    private dateUtils: DateUtils,
    private groupRepository: GroupRepository,
    private generalParser: GeneralParser,
  ) {}

  async parse (query: ParseScheduleQueryDTO): Promise<void> {
    const { parser, page, year, semester, groups } = query;
    const period: StudyingSemester = { year, semester };
    const groupList = groups ? groups.trim().split(';') : [];
    await this.generalParser.parse(parser, groupList, period, page);
  }

  @Cron('0 3 * * *')
  async autoParse () {
    await this.generalParser.parse(ParserTypeEnum.CAMPUS);
  }

  private async getSemesterStartDate (semester?: StudyingSemester) {
    const { startDate } = semester ?
      await this.dateService.getSemester(semester) :
      await this.dateService.getCurrentSemester();

    return startDate;
  }

  async getIndexOfLesson (week: number, event: DbEvent, semesterStartDate: Date): Promise<number | null> {
    const startWeek = Math.ceil((event.startTime.getTime() - semesterStartDate.getTime()) / WEEK);
    if (event.period === Period.NO_PERIOD && week - startWeek !== 0) return null;
    const index = (week - startWeek) / weeksPerEvent[event.period];
    if (index < 0 || index % 1 !== 0 || index >= event.eventsAmount) return null;
    return index;
  }

  async getGeneralGroupEvents (
    groupId: string,
    week?: number,
    setWeekTime = true,
    semester?: StudyingSemester,
  ): Promise<{ events: DbEvent[], week: number, startTime: Date }> {
    const startOfSemester = await this.getSemesterStartDate(semester);

    const { startOfWeek, endOfWeek } = week ?
      await this.dateService.getDatesOfWeek(week, semester) :
      this.dateService.getDatesOfCurrentWeek();

    const events: DbEvent[] = await this.eventRepository.findMany({
      groupId,
      startTime: {
        gte: startOfSemester,
        lte: endOfWeek,
      },
      lessons: {
        some: {
          disciplineType: {
            name: {
              in: [EventTypeEnum.PRACTICE, EventTypeEnum.LECTURE, EventTypeEnum.LABORATORY],
            },
          },
        },
      },
      period: {
        notIn: [Period.NO_PERIOD],
      },
    });

    week = week || await this.dateService.getCurrentWeek();
    const result = await filterAsync(events, async (event) => {
      const indexOfLesson = await this.getIndexOfLesson(week, event, startOfSemester);
      return indexOfLesson !== null;
    });

    if (setWeekTime) {
      for (const event of result) {
        await this.setWeekTime(event, week, startOfSemester);
      }
    }

    return {
      events: result,
      week,
      startTime: new Date(startOfWeek),
    };
  }

  async getGeneralGroupEventsWrapper (
    groupId: string,
    query: GeneralEventFiltrationDTO,
    week?: number,
  ): Promise<{ events: DbEvent[], week: number, startTime: Date }> {
    const result = await this.getGeneralGroupEvents(groupId, week);
    const { addLecture, addPractice, addLaboratory } = query;

    if (addLecture !== undefined || addPractice !== undefined || addLaboratory !== undefined) {
      result.events = result.events.filter((event) =>
        this.eventTypeFilter(event, addLecture, addLaboratory, addPractice)
      );
    }

    return result;
  }


  async getGroupEventsByDay (
    groupId: string,
    userId?: string,
    week?: number,
    day?: number,
  ): Promise<DbEvent[]> {
    week = week || await this.dateService.getCurrentWeek();
    day = day || (await this.dateService.getCurrentDay()).day;

    const { startOfDay } = await this.dateService.getSpecificDayInWeek(week, day);

    const events = await this.getGroupEventsForTelegram(groupId, week, userId);

    return events.filter((event) => {
      const startTime = new Date(event.startTime);
      startTime.setHours(0, 0, 0, 0);
      return (startOfDay.getTime() - startTime.getTime()) % WEEK === 0;
    });
  }

  private async getEventInfos (id: string, week: number): Promise<{ event: DbEvent, discipline: DbDiscipline, index?: number }> {
    if (!week) throw new InvalidWeekException();

    const event = await this.eventRepository.findOne({ id });
    const discipline = await this.getEventDiscipline(event.id);

    if (event.period === Period.NO_PERIOD) return { event, discipline };

    const semesterStartDate = await this.getSemesterStartDate();
    const index = await this.getIndexOfLesson(week, event, semesterStartDate);
    if (index === null) throw new InvalidWeekException();

    await this.setWeekTime(event, week, semesterStartDate);
    return { event, discipline, index };
  }

  async getEvent (id: string, week: number): Promise<{ event: DbEvent, discipline: DbDiscipline }> {
    const { event, discipline, index } = await this.getEventInfos(id, week);
    if (index !== undefined) {
      event.eventInfo[0] = event.eventInfo.find((info) => info.number === index) ?? null;
    }
    return { event, discipline };
  }

  private async setWeekTime (event: DbEvent, week: number, semesterStartDate: Date): Promise<{ startWeek: number }> {
    const {
      startTime,
      endTime,
    } = await this.addEventTimezones(event);

    const startWeek = this.dateUtils.getCeiledDifference(semesterStartDate, startTime, WEEK);
    event.startTime = DateTime.fromJSDate(startTime).setZone('Europe/Kyiv').plus({ weeks: week - startWeek }).toJSDate();
    event.endTime = DateTime.fromJSDate(endTime).setZone('Europe/Kyiv').plus({ weeks: week - startWeek }).toJSDate();
    return { startWeek };
  }

  private addTimezone (time: Date) {
    return DateTime.fromJSDate(time).setZone('Europe/Kyiv').toJSDate();
  }

  async addEventTimezones ({ startTime, endTime, ...events }: DbEvent) {
    startTime = this.addTimezone(startTime);
    endTime = this.addTimezone(endTime);

    return { startTime, endTime, ...events };
  }

  private async getEventDiscipline (eventId: string): Promise<DbDiscipline> {
    return this.disciplineRepository.findOne({
      disciplineTypes: {
        some: {
          lessons: {
            some: {
              eventId,
            },
          },
        },
      },
    });
  }

  private async checkEventDates (startTime: Date, endTime: Date): Promise<void> {
    const { startDate, endDate } = await this.dateService.getCurrentSemester();
    if (startTime > endTime || startDate > startTime || endTime > endDate) throw new InvalidDateException();
  }

  private async attachLesson (eventId: string, data: AttachLessonDTO): Promise<{ event: DbEvent, discipline: DbDiscipline }> {
    let discipline = await this.disciplineRepository.findOne({ id: data.disciplineId });
    if (!some(discipline.disciplineTypes, 'name', data.eventType)) {
      discipline = await this.disciplineRepository.updateById(discipline.id, {
        disciplineTypes: {
          create: {
            name: data.eventType as DisciplineTypeEnum ?? null,
          },
        },
      });
    }

    const { id } = find(discipline.disciplineTypes, 'name', data.eventType);

    for (const teacherId of data.teacherIds) {
      const teacher = { teacherId, disciplineId: discipline.id };
      const disciplineTeacher =
        await this.disciplineTeacherRepository.findOne(teacher) ??
        await this.disciplineTeacherRepository.create(teacher);

      if (!some(disciplineTeacher.roles.map(({ disciplineType }) => disciplineType), 'name', data.eventType)) {
        await this.disciplineTeacherRoleRepository.create({
          disciplineTeacherId: disciplineTeacher.id,
          disciplineTypeId: id,
        });
      }
    }

    return {
      event: await this.eventRepository.updateById(eventId, {
        lessons: {
          create: { disciplineTypeId: id },
        },
      }),
      discipline: await this.disciplineRepository.updateById(data.disciplineId, {
        description: data.disciplineInfo,
      }),
    };
  }

  private eventTypeFilter (
    event: DbEvent,
    addLecture: boolean,
    addLaboratory: boolean,
    addPractice: boolean,
    addOtherEvents?: boolean,
  ): boolean {
    if (!event.lessons.length) return !!addOtherEvents;
    const typeFilter: Record<DisciplineTypeEnum, boolean> = {
      [DisciplineTypeEnum.LECTURE]: addLecture,
      [DisciplineTypeEnum.PRACTICE]: addPractice,
      [DisciplineTypeEnum.LABORATORY]: addLaboratory,
      [DisciplineTypeEnum.CONSULTATION]: addOtherEvents,
      [DisciplineTypeEnum.EXAM]: addOtherEvents,
      [DisciplineTypeEnum.WORKOUT]: addOtherEvents,
    };
    return event.lessons.some((lesson) => typeFilter[lesson.disciplineType.name]);
  }

  private async teacherHasDiscipline (teacherId: string, disciplineId: string): Promise<boolean> {
    const disciplineTeacher = await this.disciplineTeacherRepository.findMany({
      teacherId,
      disciplineId,
    });
    return !!disciplineTeacher.length;
  }

  private async teachersHaveDiscipline (teacherIds: string[], disciplineId : string): Promise<boolean> {
    return everyAsync(teacherIds, (id) => this.teacherHasDiscipline(id, disciplineId));
  }

  private async calculateEventsAmount (startOfEvent: Date, eventPeriod: string) {
    const { endDate } = await this.dateService.getCurrentSemester();
    const endSemester = new Date(endDate.getTime() - FORTNITE);
    if (startOfEvent > endSemester || eventPeriod === Period.NO_PERIOD) {
      return 1;
    }
    const eventWeeks = this.dateUtils.getCeiledDifference(startOfEvent, endSemester, WEEK);
    return Math.ceil(eventWeeks / weeksPerEvent[eventPeriod]);
  }

  async createGroupEvent (body: CreateEventDTO): Promise<{ event: DbEvent, discipline?: DbDiscipline }> {
    await this.checkEventDates(body.startTime, body.endTime);
    if (body.disciplineId && !body.eventType) throw new ObjectIsRequiredException('eventType');

    const eventsAmount = await this.calculateEventsAmount(body.startTime, body.period);
    const teacherForceChanges = !(await this.teachersHaveDiscipline(body.teacherIds, body.disciplineId));

    const eventInfo = body.eventInfo ? {
      number: 0,
      description: body.eventInfo,
    } : undefined;

    const event = await this.eventRepository.create({
      groupId: body.groupId,
      name: body.name,
      url: body.url,
      startTime: body.startTime,
      endTime: body.endTime,
      period: body.period,
      eventsAmount,
      isCustom: true,
      teacherForceChanges,
      eventInfo: {
        create: eventInfo,
      },
    });

    return body.disciplineId
      ? await this.attachLesson(event.id, body as AttachLessonDTO)
      : { event };
  }

  async createFacultyEvent (body: CreateFacultyEventDTO): Promise<DbEvent[]> {
    await this.checkEventDates(body.startTime, body.endTime);

    const eventInfo = [];
    if (body.eventInfo) {
      eventInfo.push({ number: 0, description: body.eventInfo });
    }

    const groups = await this.groupRepository.findMany({});
    const createdEvents: DbEvent[] = [];

    for (const group of groups) {
      const event = await this.eventRepository.create({
        groupId: group.id,
        name: body.name,
        period: Period.NO_PERIOD,
        startTime: body.startTime,
        isCustom: true,
        endTime: body.endTime,
        url: body.url,
        eventInfo: {
          createMany: { data: eventInfo },
        },
      });
      createdEvents.push(event);
    }

    return createdEvents;
  }

  async getGroupEvents (
    groupId: string,
    week: number,
    query: EventFiltrationDTO,
  ): Promise<DbEvent[]> {
    const { endOfWeek } = week ? await this.dateService.getDatesOfWeek(week) : this.dateService.getDatesOfCurrentWeek();
    const semesterStartDate = await this.getSemesterStartDate();
    const events = await this.eventRepository.findMany({
      groupId,
      startTime: {
        lte: endOfWeek,
      },
    });

    let result = await filterAsync(events, async (event) => {
      const indexOfLesson = await this.getIndexOfLesson(week, event, semesterStartDate);
      return indexOfLesson !== null;
    });

    if (query.addLecture !== undefined || query.addPractice !== undefined || query.addLaboratory !== undefined || query.addOtherEvents !== undefined) {
      result = result.filter((event) =>
        this.eventTypeFilter(event, query.addLecture, query.addLaboratory, query.addPractice, query.addOtherEvents)
      );
    }

    for (const event of result) {
      if (event.period !== Period.NO_PERIOD) {
        await this.setWeekTime(event, week, semesterStartDate);
      }
    }

    return result;
  }

  async getGroupEventsWrapper (
    groupId: string,
    query: EventFiltrationDTO,
    userId?: string,
    week?: number,
  ): Promise<{ events: DbEvent[], week: number, startTime: Date }> {
    week = week || await this.dateService.getCurrentWeek();
    const { startOfWeek } = await this.dateService.getDatesOfWeek(week);

    if (userId) {
      const user = await this.userService.getUser(userId);
      if (user.group.id !== groupId) {
        return await this.getGeneralGroupEvents(groupId, week);
      }
    }

    let events = await this.getGroupEvents(groupId, week, query);

    if (userId && query.showOwnSelective) {
      events = await this.filtrateOwnSelective(groupId, userId, events);
    }

    return {
      events,
      week,
      startTime: new Date(startOfWeek),
    };
  }

  private async filtrateOwnSelective (groupId: string, userId: string, events: DbEvent[]): Promise<DbEvent[]> {
    const disciplines = await this.disciplineRepository.findMany({
      groupId: groupId,
      OR: [
        {
          isSelective: false,
        }, {
          selectiveDisciplines: {
            some: {
              studentId: userId,
            },
          },
        },
      ],
    });

    return events.filter((event) => {
      const disciplineId = event.lessons[0]?.disciplineType.disciplineId;
      if (!disciplineId) return true;
      return some(disciplines, 'id', disciplineId);
    });
  }

  private async removeDisciplineTeachers (
    disciplineTeachers: DbDisciplineTeacher[],
    disciplineTypeId: string,
  ): Promise<void> {
    for (const { id, roles } of disciplineTeachers) {
      if (every(roles, 'disciplineTypeId', disciplineTypeId)) {
        await this.disciplineTeacherRepository.deleteById(id);
      }
    }
  }

  async deleteEvent (id: string): Promise<{ event: DbEvent, discipline?: DbDiscipline }> {
    const event = await this.eventRepository.deleteById(id);
    const lesson = event.lessons[0];

    if (lesson) {
      const target = await this.eventRepository.findOne({
        lessons: {
          some: {
            disciplineTypeId: lesson.disciplineTypeId,
          },
        },
      });

      const discipline = await this.disciplineRepository.findOne({ id: lesson.disciplineType.disciplineId });

      if (!target) {
        await this.removeDisciplineTeachers(discipline.disciplineTeachers, lesson.disciplineTypeId);
        await this.disciplineRepository.updateById(discipline.id, {
          disciplineTypes: {
            delete: {
              id: lesson.disciplineTypeId,
            },
          },
        });
      }
      return { event, discipline };
    }
    return { event };
  }

  private async checkEventInfo (eventId: string, index: number): Promise<boolean> {
    const data = await this.eventRepository.findOne({ id: eventId });
    return data.eventInfo && some(data.eventInfo, 'number', index);
  }

  private async createOrUpdateEventInfo (eventInfo: string, eventId: string, index: number): Promise<DbEvent> {
    const hasEventInfo = await this.checkEventInfo(eventId, index);
    if (hasEventInfo) {
      return this.eventRepository.updateById(eventId, {
        eventInfo: {
          update: {
            where: {
              eventId_number: {
                eventId,
                number: index,
              },
            },
            data: {
              description: eventInfo,
            },
          },
        },
      });
    }
    return this.eventRepository.updateById(eventId, {
      eventInfo: {
        create: {
          number: index,
          description: eventInfo,
        },
      },
    });
  }

  private async deleteEventInfo (eventId: string, index: number): Promise<DbEvent> {
    const hasEventInfo = await this.checkEventInfo(eventId, index);
    if (hasEventInfo) {
      return this.eventRepository.updateById(eventId, {
        eventInfo: {
          delete: {
            eventId_number: { eventId, number: index },
          },
        },
      });
    }
  }

  async updateEvent (eventId: string, body: UpdateEventDTO): Promise<void> {
    let event = await this.eventRepository.findOne({ id: eventId });
    const {
      week,
      name,
      disciplineId,
      eventType,
      teachers: teacherIds,
      period = event.period,
      url,
      disciplineInfo,
      eventInfo,
    } = body;

    const { startTime, endTime } = this.getNewDateTime(event, body);

    const eventsAmount = await this.calculateEventsAmount(startTime, period);

    const teacherForceChanges = teacherIds && disciplineId && !event.teacherForceChanges ?
      !(await this.teachersHaveDiscipline(teacherIds, disciplineId)) :
      event.teacherForceChanges;

    const semesterStartDate = await this.getSemesterStartDate()
    const index = await this.getIndexOfLesson(week, event, semesterStartDate);
    if (index === null) throw new InvalidWeekException();

    if (eventInfo) await this.createOrUpdateEventInfo(eventInfo, eventId, index);
    else if (eventInfo !== undefined) await this.deleteEventInfo(eventId, index);

    event = await this.eventRepository.updateById(eventId, {
      name,
      period,
      startTime,
      endTime,
      eventsAmount,
      teacherForceChanges,
      url,
    });

    const lesson = event?.lessons[0];
    if (!disciplineId && !eventType && !teacherIds && !disciplineInfo) return;
    if ((!disciplineId || !eventType) && !lesson) throw new ObjectIsRequiredException('disciplineType');

    const discipline = await this.updateDiscipline(
      disciplineId,
      lesson?.disciplineType.disciplineId,
      eventType,
      lesson?.disciplineType,
      disciplineInfo,
      teacherIds,
    );

    await this.eventRepository.updateById(eventId, {
      lessons: {
        deleteMany: {
          eventId,
        },
        create: {
          disciplineTypeId: find(discipline.disciplineTypes, 'name', eventType ?? lesson.disciplineType.name).id,
        },
      },
    });
  }

  private getNewDateTime (event: DbEvent, {
    startTime,
    endTime,
    changeStartDate,
    changeEndDate,
    period,
  }: UpdateEventDTO) {
    if (!startTime && changeStartDate) throw new ObjectIsRequiredException('startTime');
    if (!endTime && changeEndDate) throw new ObjectIsRequiredException('endTime');

    let newStartTime = startTime ?? event.startTime;

    if (startTime && !changeStartDate && period !== Period.NO_PERIOD) {
      newStartTime = new Date(event.startTime);
      newStartTime.setHours(
        startTime.getHours(),
        startTime.getMinutes(),
      );
    }

    const newEndTime = new Date(newStartTime);
    newEndTime.setHours(
      (endTime ?? event.endTime).getHours(),
      (endTime ?? event.endTime).getMinutes(),
    );

    return {
      startTime: newStartTime,
      endTime: newEndTime,
    };
  }

  private async updateDiscipline (
    newDisciplineId?: string,
    presentDisciplineId?: string,
    newEventType?: EventTypeEnum,
    presentDisciplineType?: DbDisciplineType,
    disciplineInfo?: string,
    teachers: string[] = [],
  ): Promise<DbDiscipline> {
    if (presentDisciplineId) {
      await this.clearDiscipline(presentDisciplineId, presentDisciplineType);
    }

    await this.prepareDiscipline(
      newDisciplineId ?? presentDisciplineId,
      newEventType ?? (presentDisciplineType.name as unknown as EventTypeEnum ?? EventTypeEnum.OTHER),
      teachers
    );

    return this.disciplineRepository.updateById(newDisciplineId ?? presentDisciplineId, {
      description: disciplineInfo,
    });
  }

  private async clearDiscipline (
    disciplineId: string,
    type: DbDisciplineType,
  ): Promise<void> {
    const update: any = {
      disciplineTypes: {
        delete: undefined,
      },
      disciplineTeachers: {
        deleteMany: {
          OR: [],
        },
      },
    };

    const events = await this.eventRepository.count({
      lessons: {
        some: {
          disciplineTypeId: type.id,
        },
      },
    });

    if (events === 1) {
      const discipline = await this.disciplineRepository.findOne({ id: disciplineId });

      update.disciplineTypes.delete = {
        id: type.id,
      };

      for (const { teacherId, disciplineId, roles } of discipline.disciplineTeachers) {
        if (roles.length === 1 && roles[0].disciplineType.name === type.name) {
          update.disciplineTeachers.deleteMany.OR.push({
            teacherId,
            disciplineId,
          });
        }
      }

      await this.disciplineRepository.updateById(disciplineId, update);
    }
  }

  private async prepareDiscipline (
    disciplineId: string,
    newType: EventTypeEnum,
    teachers: string[],
  ): Promise<void> {
    let discipline = await this.disciplineRepository.findOne({ id: disciplineId });

    let disciplineType = find(discipline.disciplineTypes, 'name', newType);
    if (!disciplineType) {
      discipline = await this.disciplineRepository.updateById(disciplineId, {
        disciplineTypes: {
          create: {
            name: newType as DisciplineTypeEnum ?? null,
          },
        },
      });
      disciplineType = find(discipline.disciplineTypes, 'name', newType);
    }

    await this.disciplineRepository.updateById(disciplineId, {
      disciplineTypes: {
        update: {
          where: {
            id: disciplineType.id,
          },
          data: {
            disciplineTeacherRoles: {
              deleteMany: {},
            },
          },
        },
      },
    });

    const removedTeachers = discipline.disciplineTeachers.filter(({ teacherId }) => !teachers.includes(teacherId));
    await this.removeDisciplineTeachers(removedTeachers, disciplineType.id);

    for (const teacherId of teachers) {
      const teacher = { teacherId, disciplineId };
      const disciplineTeacher =
        await this.disciplineTeacherRepository.findOne(teacher) ??
        await this.disciplineTeacherRepository.create(teacher);

      if (!some(disciplineTeacher.roles.map(({ disciplineType }) => disciplineType), 'id', disciplineType.id)) {
        await this.disciplineTeacherRoleRepository.create({
          disciplineTeacherId: disciplineTeacher.id,
          disciplineTypeId: disciplineType.id,
        });
      }
    }
  }

  async getFortnightEvents (
    groupId: string,
    query: EventFiltrationDTO,
    week?: number,
    userId?: string,
  ): Promise<{ firstWeekEvents: DbEvent[], secondWeekEvents: DbEvent[] }> {
    week = week || await this.dateService.getCurrentWeek();
    const [firstWeek, secondWeek] = (week % 2 === 0) ? [week - 1, week] : [week, week + 1];
    const firstWeekEvents = await this.getGroupEventsForTelegram(groupId, firstWeek, userId, query);
    const secondWeekEvents = await this.getGroupEventsForTelegram(groupId, secondWeek, userId, query);
    return { firstWeekEvents, secondWeekEvents };
  }

  async getGroupEventsForTelegram (
    groupId: string,
    week: number,
    userId?: string,
    query?: EventFiltrationDTO,
  ): Promise<DbEvent[]> {
    const student = userId
      ? await this.studentRepository.findOne({ userId })
      : undefined;

    if (student && student.groupId !== groupId) throw new NoPermissionException();

    week = week || await this.dateService.getCurrentWeek();
    const eventFiltration = query || {
      addLecture: true,
      addPractice: true,
      addLaboratory: true,
      otherEvents: true,
    } as EventFiltrationDTO;

    if (!userId) {
      return (await this.getGeneralGroupEvents(groupId, week)).events;
    }

    const events = await this.getGroupEvents(groupId, week, eventFiltration);

    return await this.filtrateOwnSelective(groupId, userId, events);
  }
}
