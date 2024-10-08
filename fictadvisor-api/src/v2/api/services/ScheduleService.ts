import { Injectable } from '@nestjs/common';
import {
  CreateEventDTO,
  AttachLessonDTO,
  EventFiltrationDTO,
  GeneralEventFiltrationDTO,
  UpdateEventDTO,
  CreateFacultyEventDTO,
} from '@fictadvisor/utils/requests';
import { EventTypeEnum } from '@fictadvisor/utils/enums';
import { DateService, FORTNITE, WEEK } from '../../utils/date/DateService';
import { DateUtils } from '../../utils/date/DateUtils';
import { every, filterAsync, find, some } from '../../utils/ArrayUtil';
import { RozParser } from '../../utils/parser/RozParser';
import { CampusParser } from '../../utils/parser/CampusParser';
import { UserService } from './UserService';
import { DbEvent } from '../../database/entities/DbEvent';
import { DbDiscipline, DbDiscipline_DisciplineTeacher } from '../../database/entities/DbDiscipline';
import { DbDisciplineType } from '../../database/entities/DbDisciplineType';
import { DisciplineTypeEnum, Period } from '@prisma/client';
import { EventRepository } from '../../database/repositories/EventRepository';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { DisciplineTeacherRepository } from '../../database/repositories/DisciplineTeacherRepository';
import { DisciplineTeacherRoleRepository } from '../../database/repositories/DisciplineTeacherRoleRepository';
import { StudentRepository } from '../../database/repositories/StudentRepository';
import { InvalidDateException } from '../../utils/exceptions/InvalidDateException';
import { ObjectIsRequiredException } from '../../utils/exceptions/ObjectIsRequiredException';
import { InvalidWeekException } from '../../utils/exceptions/InvalidWeekException';
import { NoPermissionException } from '../../utils/exceptions/NoPermissionException';
import { DateTime } from 'luxon';
import { GroupRepository } from '../../database/repositories/GroupRepository';

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
    private rozParser: RozParser,
    private userService: UserService,
    private studentRepository: StudentRepository,
    private dateUtils: DateUtils,
    private campusParser: CampusParser,
    private groupRepository: GroupRepository,
  ) {}

  private parserTypes =  {
    rozkpi: async (period, groupList, page) => {
      await this.rozParser.parse(period, groupList, page);
    },
    campus: async (period, groupList) => {
      await this.campusParser.parse(period, groupList);
    },
  };

  async parse (parserType, page, period, groups) {
    const groupList = groups ? groups.trim().split(';') : [];
    await this.parserTypes[parserType](period, groupList, page);
  }

  async getIndexOfLesson (week: number, event) {
    const { startDate } = await this.dateService.getCurrentSemester();
    const startWeek = Math.ceil((event.startTime.getTime() - startDate.getTime()) / WEEK);
    if (event.period === Period.NO_PERIOD && week - startWeek !== 0) return null;
    const index = (week - startWeek) / weeksPerEvent[event.period];
    if (index < 0 || index % 1 !== 0 || index >= event.eventsAmount) return null;
    return index;
  }

  async getGeneralGroupEvents (id: string, week: number) {
    const { startOfWeek, endOfWeek } = week ? await this.dateService.getDatesOfWeek(week) : this.dateService.getDatesOfCurrentWeek();
    const events = await this.eventRepository.findMany({
      where: {
        groupId: id,
        startTime: {
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
      },
    }) as unknown as DbEvent[];

    week = week || await this.dateService.getCurrentWeek();
    const result = await filterAsync(events, async (event) => {
      const indexOfLesson = await this.getIndexOfLesson(week, event);
      return indexOfLesson !== null;
    });

    for (const event of result) {
      await this.setWeekTime(event, week);
    }

    return {
      events: result,
      week,
      startTime: new Date(startOfWeek),
    };
  }

  async getGeneralGroupEventsWrapper (
    id: string,
    week: number,
    query: GeneralEventFiltrationDTO,
  ) {
    const result = await this.getGeneralGroupEvents(id, week);

    if (query.addLecture !== undefined || query.addPractice !== undefined || query.addLaboratory !== undefined) {
      result.events = result.events.filter((event) =>
        this.disciplineTypesFilter(event, query.addLecture, query.addLaboratory, query.addPractice)
      );
    }

    return result;
  }


  async getGroupEventsByDay (groupId: string, day: number, week: number, userId: string) {
    week = week || await this.dateService.getCurrentWeek();
    day = day || (await this.dateService.getCurrentDay()).day;

    const { startOfDay } = await this.dateService.getSpecificDayInWeek(week, day);

    const events = await this.getGroupEventsForTelegram(groupId, week, userId);

    return {
      events: events.filter((event) => {
        const startTime = new Date(event.startTime);
        startTime.setHours(0, 0, 0, 0);
        return (startOfDay.getTime() - startTime.getTime()) % WEEK === 0;
      }),
    };
  }

  async getEventInfos (id: string, week: number): Promise<{ event: DbEvent, discipline: DbDiscipline, index?: number }> {
    if (!week) throw new InvalidWeekException();

    const event = await this.eventRepository.findById(id);
    const discipline = await this.getEventDiscipline(event.id);

    if (event.period === Period.NO_PERIOD) return { event, discipline };

    const index = await this.getIndexOfLesson(week, event);
    if (index === null) throw new InvalidWeekException();

    await this.setWeekTime(event, week);
    return { event, discipline, index };
  }

  async getEvent (id: string, week: number): Promise<{ event: DbEvent, discipline: DbDiscipline }> {
    const { event, discipline, index } = await this.getEventInfos(id, week);
    if (event.period === Period.NO_PERIOD) return { event, discipline };
    event.eventInfo[0] = event.eventInfo.find((info) => info.number === index) ?? null;
    return { event, discipline };
  }

  private async setWeekTime (event: DbEvent, week: number): Promise<{ startWeek: number }> {
    const { startDate } = await this.dateService.getCurrentSemester();
    const startWeek = this.dateUtils.getCeiledDifference(startDate, event.startTime, WEEK);
    event.startTime = DateTime.fromJSDate(event.startTime).setZone('Europe/Kyiv').plus({ weeks: week - startWeek }).toJSDate();
    event.endTime = DateTime.fromJSDate(event.endTime).setZone('Europe/Kyiv').plus({ weeks: week - startWeek }).toJSDate();
    return { startWeek };
  }

  private async getEventDiscipline (eventId: string) {
    return this.disciplineRepository.find({
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

  private async checkEventDates (startTime: Date, endTime: Date) {
    const { startDate, endDate } = await this.dateService.getCurrentSemester();
    if (startTime > endTime || startDate > startTime || endTime > endDate) throw new InvalidDateException();
  }

  private async attachLesson (eventId: string, data: AttachLessonDTO): Promise<{ event: DbEvent, discipline: DbDiscipline }> {
    let discipline = await this.disciplineRepository.findById(data.disciplineId);
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

    for (const teacherId of data.teachers) {
      const disciplineTeacher = await this.disciplineTeacherRepository.getOrCreate({ teacherId, disciplineId: discipline.id });
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

  private disciplineTypesFilter (
    event: DbEvent,
    addLecture: boolean,
    addLaboratory: boolean,
    addPractice: boolean,
    otherEvents?: boolean,
  ) {
    const disciplineTypes = event.lessons.map((lesson) => lesson.disciplineType.name);
    return (
      (addLecture && disciplineTypes.includes(EventTypeEnum.LECTURE as any)) ||
      (addLaboratory && disciplineTypes.includes(EventTypeEnum.LABORATORY as any)) ||
      (addPractice && disciplineTypes.includes(EventTypeEnum.PRACTICE as any)) ||
      (otherEvents && (!disciplineTypes.length ||
        disciplineTypes.includes(EventTypeEnum.CONSULTATION as any) ||
        disciplineTypes.includes(EventTypeEnum.EXAM as any) ||
        disciplineTypes.includes(EventTypeEnum.WORKOUT as any))
      )
    );
  }

  private async validateTeacherDiscipline (teacherId: string, disciplineId: string) {
    const disciplineTeacher = await this.disciplineTeacherRepository.findMany({
      where: {
        teacherId,
        disciplineId,
      },
    });
    return !!disciplineTeacher.length;
  }

  private async validateTeachersDiscipline (teachers: string[], disciplineId : string) {
    for (const teacherId of teachers) {
      const hasDiscipline = await this.validateTeacherDiscipline(teacherId, disciplineId);
      if (!hasDiscipline) return true;
    }
    return false;
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

  async createFacultyEvent (body: CreateFacultyEventDTO) {
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

  async createGroupEvent (body: CreateEventDTO) {
    await this.checkEventDates(body.startTime, body.endTime);
    if (body.disciplineId && !body.eventType) throw new ObjectIsRequiredException('DisciplineType');

    const eventsAmount = await this.calculateEventsAmount(body.startTime, body.period);
    const teacherForceChanges = await this.validateTeachersDiscipline(body.teachers, body.disciplineId);

    const eventInfo = [];
    if (body.eventInfo) {
      eventInfo.push({ number: 0 });
      eventInfo[0].description = body.eventInfo;
    }

    const event = await this.eventRepository.create({
      groupId: body.groupId,
      name: body.name,
      period: body.period,
      startTime: body.startTime,
      url: body.url,
      eventsAmount,
      isCustom: true,
      teacherForceChanges,
      endTime: body.endTime,
      eventInfo: {
        createMany: { data: eventInfo },
      },
    });

    if (!body.disciplineId) {
      return {
        event: { ...event, endTime: body.endTime },
      };
    }

    const result = await this.attachLesson(event.id, body as AttachLessonDTO);

    return {
      event: { ...result.event, endTime: body.endTime } as DbEvent,
      discipline: result.discipline,
    };
  }

  async getAllGroupEvents (
    groupId: string,
    week: number,
    query: EventFiltrationDTO,
  ) {
    const { endOfWeek } = week ? await this.dateService.getDatesOfWeek(week) : this.dateService.getDatesOfCurrentWeek();
    const events = await this.eventRepository.findMany({
      where: {
        groupId,
        startTime: {
          lte: endOfWeek,
        },
      },
    });

    let result = await filterAsync(events, async (event) => {
      const indexOfLesson = await this.getIndexOfLesson(week, event);
      return indexOfLesson !== null;
    });

    if (query.addLecture !== undefined || query.addPractice !== undefined || query.addLaboratory !== undefined || query.addOtherEvents !== undefined) {
      result = result.filter((event) =>
        this.disciplineTypesFilter(event, query.addLecture, query.addLaboratory, query.addPractice, query.addOtherEvents)
      );
    }

    for (const event of result) {
      if (event.period !== Period.NO_PERIOD) {
        await this.setWeekTime(event, week);
      }
    }

    return result;
  }

  async getGroupEvents (
    userId: string,
    groupId: string,
    week: number,
    query: EventFiltrationDTO,
  ) {
    const { startOfWeek } = week ? await this.dateService.getDatesOfWeek(week) : this.dateService.getDatesOfCurrentWeek();

    if (userId) {
      const user = await this.userService.getUser(userId);
      if (user.group.id !== groupId) {
        return await this.getGeneralGroupEvents(groupId, week);
      }
    }

    let groupEvents = await this.getAllGroupEvents(groupId, week, query);

    if (userId && query.showOwnSelective) {
      groupEvents = await this.filtrateOwnSelective(groupId, userId, groupEvents);
    }

    week = week || await this.dateService.getCurrentWeek();

    return {
      events: groupEvents,
      week,
      startTime: new Date(startOfWeek),
    };
  }

  private async filtrateOwnSelective (groupId: string, userId: string, events: DbEvent[]) {
    const disciplines = await this.disciplineRepository.findMany({
      where: {
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
      },
    });

    return events.filter((event) => {
      const disciplineId = event.lessons[0]?.disciplineType.disciplineId;
      if (!disciplineId) return true;
      return some(disciplines, 'id', disciplineId);
    });
  }

  private async removeTeachers (teachers: DbDiscipline_DisciplineTeacher[], disciplineTypeId: string) {
    for (const teacher of teachers) {
      if (every(teacher.roles, 'disciplineTypeId', disciplineTypeId)) {
        await this.disciplineTeacherRepository.deleteById(teacher.id);
      }
    }
  }

  async deleteEvent (id: string): Promise<{ event: DbEvent, discipline?: DbDiscipline }> {
    const event = await this.eventRepository.deleteById(id);
    const lesson = event.lessons[0];

    if (lesson) {
      const target = await this.eventRepository.find({
        lessons: {
          some: {
            disciplineTypeId: lesson.disciplineTypeId,
          },
        },
      });

      const discipline = await this.disciplineRepository.findById(lesson.disciplineType.disciplineId);

      if (!target) {
        await this.removeTeachers(discipline.disciplineTeachers, lesson.disciplineTypeId);
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

  private async checkEventInfo (eventId: string, index: number) {
    const data = await this.eventRepository.find({
      id: eventId,
    });
    return data.eventInfo && some(data.eventInfo, 'number', index);
  }

  private async createOrUpdateEventInfo (eventInfo: string, eventId: string, index: number) {
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

  private async deleteEventInfo (eventId: string, index: number) {
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

  async updateEvent (eventId: string, body: UpdateEventDTO) {
    let event = await this.eventRepository.findById(eventId);
    const {
      week,
      name,
      disciplineId,
      eventType,
      teachers,
      period = event.period,
      url,
      disciplineInfo,
      eventInfo,
    } = body;

    const { startTime, endTime } = this.getNewDateTime(event, body);

    const eventsAmount = await this.calculateEventsAmount(startTime, period);

    const teacherForceChanges = teachers && disciplineId && !event.teacherForceChanges ?
      await this.validateTeachersDiscipline(teachers, disciplineId) :
      event.teacherForceChanges;

    const index = await this.getIndexOfLesson(week, event);
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
    if (!disciplineId && !eventType && !teachers && !disciplineInfo) return;
    if ((!disciplineId || !eventType) && !lesson) throw new ObjectIsRequiredException('disciplineType');

    const discipline = await this.updateDiscipline(
      disciplineId,
      lesson?.disciplineType.disciplineId,
      eventType,
      lesson?.disciplineType,
      disciplineInfo,
      teachers,
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

    const result = {
      startTime: startTime ?? event.startTime,
      endTime: endTime ?? event.endTime,
    };

    if (period !== Period.NO_PERIOD) {
      if (startTime && !changeStartDate) {
        result.startTime = new Date(
          event.startTime.setHours(startTime.getHours(), startTime.getMinutes())
        );
      }

      if (endTime && !changeEndDate) {
        result.endTime = new Date(
          event.endTime.setHours(endTime.getHours(), endTime.getMinutes())
        );
      }
    }

    return result;
  }

  private async updateDiscipline (
    newDisciplineId: string | undefined,
    presentDisciplineId: string | undefined,
    newType: EventTypeEnum | undefined,
    presentType: DbDisciplineType | undefined,
    disciplineInfo: string | undefined,
    teachers: string[] = [],
  ) {
    if (presentDisciplineId) {
      await this.clearDiscipline(presentDisciplineId, presentType);
    }

    await this.prepareDiscipline(
      newDisciplineId ?? presentDisciplineId,
      newType ?? (presentType.name as unknown as EventTypeEnum ?? EventTypeEnum.OTHER),
      teachers
    );

    return this.disciplineRepository.updateById(newDisciplineId ?? presentDisciplineId, {
      description: disciplineInfo,
    });
  }

  private async clearDiscipline (
    disciplineId: string,
    type: DbDisciplineType,
  ) {
    const update = {
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
      const discipline = await this.disciplineRepository.findById(disciplineId);

      update.disciplineTypes.delete = {
        id: type.id,
      };

      discipline.disciplineTeachers.map(({ teacherId, disciplineId, roles }) => {
        if (roles.length === 1 && roles[0].disciplineType.name === type.name) {
          update.disciplineTeachers.deleteMany.OR.push({
            teacherId,
            disciplineId,
          });
        }
      });

      await this.disciplineRepository.updateById(disciplineId, update);
    }
  }

  private async prepareDiscipline (
    disciplineId: string,
    newType: EventTypeEnum,
    teachers: string[],
  ) {
    let discipline = await this.disciplineRepository.findById(disciplineId);

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
    await this.removeTeachers(removedTeachers, disciplineType.id);

    for (const teacherId of teachers) {
      const disciplineTeacher = await this.disciplineTeacherRepository.getOrCreate({ teacherId, disciplineId });
      if (!some(disciplineTeacher.roles.map(({ disciplineType }) => disciplineType), 'name', disciplineType.name)) {
        await this.disciplineTeacherRoleRepository.create({
          disciplineTeacherId: disciplineTeacher.id,
          disciplineTypeId: disciplineType.id,
        });
      }
    }
  }

  async getFortnightEvents (groupId: string, week: number, userId: string, query: EventFiltrationDTO) {
    week = week || await this.dateService.getCurrentWeek();
    const [firstWeek, secondWeek] = week % 2 === 0 ? [week-1, week] : [week, week+1];
    const firstWeekEvents = await this.getGroupEventsForTelegram(groupId, firstWeek, userId, query);
    const secondWeekEvents = await this.getGroupEventsForTelegram(groupId, secondWeek, userId, query);
    return { firstWeekEvents, secondWeekEvents };
  }

  async getGroupEventsForTelegram (groupId: string, week: number, userId: string, query?: EventFiltrationDTO) {
    const student = userId
      ? await this.studentRepository.findById(userId)
      : undefined;

    if (student && student.groupId !== groupId) throw new NoPermissionException();


    week = week || await this.dateService.getCurrentWeek();
    const eventFiltration = query || {
      addLecture: true,
      addPractice: true,
      addLaboratory: true,
      otherEvents: true,
    };

    const events = await this.getAllGroupEvents(groupId, week, eventFiltration);

    return userId
      ? await this.filtrateOwnSelective(groupId, userId, events)
      : events;
  }

  async getMonthEvents (groupId: string, userId: string, query: EventFiltrationDTO) {
    const { startOfMonth, endOfMonth } = await this.dateService.getDatesOfMonth();
    const startWeek = await this.dateService.getWeekByDate(startOfMonth);
    const endWeek = await this.dateService.getWeekByDate(endOfMonth);
    let events = [];
    for (let week = startWeek; week <= endWeek; week++) {
      const weekEvents = await this.getGroupEventsForTelegram(groupId, week, userId, query);
      events = events.concat(weekEvents);
    }

    events = events.filter((event) => {
      const startTime = new Date(event.startTime);
      return (startTime.getTime() - startOfMonth.getTime() >= 0) && (endOfMonth.getTime() - startTime.getTime() >= 0);
    });

    return events;
  }
}
