import { DateService, FORTNITE, WEEK } from '../../utils/date/DateService';
import { Injectable } from '@nestjs/common';
import { EventRepository } from '../../database/repositories/EventRepository';
import { DbEvent } from '../../database/entities/DbEvent';
import { Period, DisciplineTypeEnum, DisciplineType } from '@prisma/client';
import { RozParser } from '../../utils/parser/RozParser';
import { ScheduleParser } from '../../utils/parser/ScheduleParser';
import { CreateEventDTO } from '../dtos/CreateEventDTO';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { DisciplineTeacherRepository } from '../../database/repositories/DisciplineTeacherRepository';
import { AttachLessonDTO } from '../dtos/AttachLessonDTO';
import { InvalidDateException } from '../../utils/exceptions/InvalidDateException';
import { ObjectIsRequiredException } from '../../utils/exceptions/ObjectIsRequiredException';
import { DisciplineTeacherRoleRepository } from '../../database/repositories/DisciplineTeacherRoleRepository';
import { filterAsync, every, find, some } from '../../utils/ArrayUtil';
import { DbDiscipline, DbDiscipline_DisciplineTeacher } from '../../database/entities/DbDiscipline';
import { InvalidWeekException } from '../../utils/exceptions/InvalidWeekException';
import { UserService } from './UserService';
import { EventFiltrationDTO } from '../dtos/EventFiltrationDTO';
import { GeneralEventFiltrationDTO } from '../dtos/GeneralEventFiltrationDTO';
import { UpdateEventDTO } from '../dtos/UpdateEventDTO';
import { TeacherRoleAdapter } from '../../mappers/TeacherRoleAdapter';
import { StudentRepository } from '../../database/repositories/StudentRepository';
import { NoPermissionException } from '../../utils/exceptions/NoPermissionException';
import { DateUtils } from '../../utils/date/DateUtils';

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
    private scheduleParser: ScheduleParser,
    private userService: UserService,
    private studentRepository: StudentRepository,
    private dateUtils: DateUtils,
  ) {}

  async parse (parserType, page, period, groups) {
    const groupList = groups ? groups.trim().split(';') : [];

    switch (parserType) {
    case 'rozkpi':
      await this.rozParser.parse(period, groupList, page);
      break;
    case 'schedule':
      await this.scheduleParser.parse(period, groupList);
      break;
    }
  }

  async getIndexOfLesson (week: number, event) {
    const { startDate } = await this.dateService.getCurrentSemester();
    const startWeek = this.dateUtils.getCeiledDifference(startDate, event.startTime, WEEK);
    if (event.period === Period.NO_PERIOD && week - startWeek !== 0) return null;
    const index = (week - startWeek) / weeksPerEvent[event.period];
    if (index < 0 || index % 1 !== 0) return null;
    else return index;
  }

  async getGeneralGroupEvents (id: string, week: number) {
    const { startOfWeek, endOfWeek } = week ? await this.dateService.getDatesOfWeek(week) : this.dateService.getDatesOfCurrentWeek();
    const events = await this.eventRepository.findMany({
      where: {
        groupId: id,
        endTime: {
          gte: startOfWeek,
        },
        startTime: {
          lte: endOfWeek,
        },
        lessons: {
          some: {
            disciplineType: {
              name: {
                in: [DisciplineTypeEnum.PRACTICE, DisciplineTypeEnum.LECTURE, DisciplineTypeEnum.LABORATORY],
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
    const result  = await filterAsync(events, async (event) => {
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

    const events  = await this.getGroupEventsForTelegram(groupId, week, userId);

    return {
      events: events.filter((event) => {
        const startTime = new Date(event.startTime);
        startTime.setHours(0, 0, 0, 0);
        return (startOfDay.getTime() - startTime.getTime()) % WEEK === 0;
      }),
    };
  }

  async getEvent (id: string, week: number): Promise<{ event: DbEvent, discipline: DbDiscipline }> {
    if (!week) {
      throw new InvalidWeekException();
    }

    const event = await this.eventRepository.findById(id);

    if (event.period === Period.NO_PERIOD) {
      const discipline = await this.getEventDiscipline(event.id);
      return { event, discipline };
    }
    const index = await this.getIndexOfLesson(week, event);

    if (index === null)  throw new InvalidWeekException();

    await this.setWeekTime(event, week);
    event.eventInfo[0] = event.eventInfo.find((info) => info.number === index) ?? null;
    const discipline = await this.getEventDiscipline(event.id);
    return { event, discipline };
  }

  async setWeekTime (event: DbEvent, week: number): Promise<{ startWeek: number }> {
    const { startDate } = await this.dateService.getCurrentSemester();
    const startWeek = this.dateUtils.getCeiledDifference(startDate, event.startTime, WEEK);
    event.startTime.setDate(event.startTime.getDate() + (week - startWeek) * 7);
    event.endTime.setDate(event.endTime.getDate() + (week - startWeek) * 7);
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
    if (!some(discipline.disciplineTypes, 'name', data.disciplineType)) {
      discipline = await this.disciplineRepository.updateById(discipline.id, {
        disciplineTypes: {
          create: {
            name: data.disciplineType,
          },
        },
      });
    }

    const { id } = find(discipline.disciplineTypes, 'name', data.disciplineType);

    for (const teacherId of data.teachers) {
      const role = TeacherRoleAdapter[data.disciplineType];
      const disciplineTeacher = await this.disciplineTeacherRepository.getOrCreate({ teacherId, disciplineId: discipline.id });
      if (!some(disciplineTeacher.roles, 'role', role)) {
        await this.disciplineTeacherRoleRepository.create({
          disciplineTeacherId: disciplineTeacher.id,
          disciplineTypeId: id,
          role,
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
      (addLecture && disciplineTypes.includes(DisciplineTypeEnum.LECTURE)) ||
      (addLaboratory && disciplineTypes.includes(DisciplineTypeEnum.LABORATORY)) ||
      (addPractice && disciplineTypes.includes(DisciplineTypeEnum.PRACTICE)) ||
      (otherEvents && (!disciplineTypes.length || disciplineTypes.includes(DisciplineTypeEnum.CONSULTATION) || disciplineTypes.includes(DisciplineTypeEnum.EXAM) || disciplineTypes.includes(DisciplineTypeEnum.WORKOUT)))
    );
  }

  async validateTeacherDiscipline (teacherId: string, disciplineId: string) {
    const disciplineTeacher = await this.disciplineTeacherRepository.findMany({
      where: {
        teacherId,
        disciplineId,
      },
    });
    return !!disciplineTeacher.length;
  }

  async validateTeachersDiscipline (teachers: string[], disciplineId : string) {
    for (const teacherId of teachers) {
      const hasDiscipline = await this.validateTeacherDiscipline(teacherId, disciplineId);
      if (!hasDiscipline) return true;
    }
    return false;
  }

  async calculateEventsAmount (startOfEvent: Date, eventPeriod: string) {
    const { endDate } = await this.dateService.getCurrentSemester();
    const endSemester = new Date(endDate.getTime() - FORTNITE);
    if (startOfEvent > endSemester || eventPeriod === Period.NO_PERIOD) {
      return 1;
    }
    const eventWeeks = this.dateUtils.getCeiledDifference(startOfEvent, endSemester, WEEK);
    return Math.ceil(eventWeeks / weeksPerEvent[eventPeriod]);
  }

  async createGroupEvent (body: CreateEventDTO) {
    await this.checkEventDates(body.startTime, body.endTime);
    if (body.disciplineId && !body.disciplineType) throw new ObjectIsRequiredException('DisciplineType');

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
      event: { ...result.event, endTime: body.endTime },
      discipline: result.discipline,
    };
  }

  async getAllGroupEvents (
    groupId: string,
    week: number,
    query: EventFiltrationDTO,
  ) {
    const { startOfWeek, endOfWeek } = week ? await this.dateService.getDatesOfWeek(week) : this.dateService.getDatesOfCurrentWeek();
    const events = await this.eventRepository.findMany({
      where: {
        groupId,
        endTime: {
          gte: startOfWeek,
        },
        startTime: {
          lte: endOfWeek,
        },
      },
    });

    let result = await filterAsync(events, async (event) => {
      const indexOfLesson = await this.getIndexOfLesson(week, event);
      return indexOfLesson !== null;
    });

    if (query.addLecture !== undefined || query.addPractice !== undefined || query.addLaboratory !== undefined || query.otherEvents !== undefined) {
      result = result.filter((event) =>
        this.disciplineTypesFilter(event, query.addLecture, query.addLaboratory, query.addPractice, query.otherEvents)
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

    const user = await this.userService.getUser(userId);
    if (user.group.id !== groupId) {
      return await this.getGeneralGroupEvents(groupId, week);
    }

    let groupEvents = await this.getAllGroupEvents(groupId, week, query);

    if (query.showOwnSelective) {
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

  async checkEventInfo (eventId: string, index: number) {
    const data = await this.eventRepository.find({
      id: eventId,
    });
    if (data.eventInfo) {
      for (const eventInfo of data.eventInfo) {
        if (eventInfo.number === index) {
          return true;
        }
      }
    }
    return false;
  }

  async createOrUpdateEventInfo (eventInfo: string, eventId: string, index: number) {
    const hasEventInfo = await this.checkEventInfo(eventId, index);
    if (hasEventInfo) {
      return this.eventRepository.updateById(eventId, {
        eventInfo: {
          update: {
            where: { eventId_number: { eventId, number: index } },
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

  async deleteEventInfo (eventId: string, index: number) {
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
      disciplineType,
      teachers,
      period = event.period,
      url,
      disciplineInfo,
      eventInfo,
      endTime,
      ...durationTime
    } = body;

    let startTime = durationTime.startTime ?? event.startTime;
    if (!durationTime.startTime && durationTime.changeStartDate) throw new ObjectIsRequiredException('startTime');
    if (durationTime.startTime && !durationTime.changeStartDate && period !== Period.NO_PERIOD) {
      startTime = event.startTime;
      startTime.setHours(durationTime.startTime.getHours());
      startTime.setMinutes(durationTime.startTime.getMinutes());
    }

    const eventsAmount = await this.calculateEventsAmount(startTime, period);

    let teacherForceChanges = false;

    if (event.teacherForceChanges) {
      teacherForceChanges = true;
    }

    if (teachers && disciplineId && !event.teacherForceChanges) {
      teacherForceChanges = await this.validateTeachersDiscipline(teachers, disciplineId);
    }

    const index = await this.getIndexOfLesson(week, event);
    if (index === null) throw new InvalidWeekException();

    if (eventInfo) {
      await this.createOrUpdateEventInfo(eventInfo, eventId, index);
    } else if (eventInfo === '' || eventInfo === null) {
      await this.deleteEventInfo(eventId, index);
    }

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
    if (!disciplineId && !disciplineType && !teachers && !disciplineInfo) return;
    if ((!disciplineId || !disciplineType) && !lesson) throw new ObjectIsRequiredException('disciplineType');

    const discipline = await this.updateDiscipline(
      disciplineId,
      lesson?.disciplineType.disciplineId,
      disciplineType,
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
          disciplineTypeId: find(discipline.disciplineTypes, 'name', disciplineType ?? lesson.disciplineType.name).id,
        },
      },
    });
  }

  async updateDiscipline (
    newDisciplineId: string | undefined,
    presentDisciplineId: string | undefined,
    newType: DisciplineTypeEnum | undefined,
    presentType: DisciplineType | undefined,
    disciplineInfo: string | undefined,
    teachers: string[] = [],
  ) {
    if (presentDisciplineId) {
      await this.clearDiscipline(presentDisciplineId, presentType);
    }

    await this.prepareDiscipline(
      newDisciplineId ?? presentDisciplineId,
      newType ?? presentType.name,
      teachers
    );

    return this.disciplineRepository.updateById(newDisciplineId ?? presentDisciplineId, {
      description: disciplineInfo,
    });
  }

  async clearDiscipline (
    disciplineId: string,
    type: DisciplineType,
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
        if (roles.length === 1 && roles.some((r) => r.role === TeacherRoleAdapter[type.name])) {
          update.disciplineTeachers.deleteMany.OR.push({
            teacherId,
            disciplineId,
          });
        }
      });

      await this.disciplineRepository.updateById(disciplineId, update);
    }
  }

  async prepareDiscipline (
    disciplineId: string,
    newType: DisciplineTypeEnum,
    teachers: string[],
  ) {
    let discipline = await this.disciplineRepository.findById(disciplineId);

    let disciplineType = find(discipline.disciplineTypes, 'name', newType);
    if (!disciplineType) {
      discipline = await this.disciplineRepository.updateById(disciplineId, {
        disciplineTypes: {
          create: {
            name: newType,
          },
        },
      });
      disciplineType = find(discipline.disciplineTypes, 'name', newType);
    }

    const removedTeachers = discipline.disciplineTeachers.filter(({ teacherId }) => !teachers.includes(teacherId));
    await this.removeTeachers(removedTeachers, disciplineType.id);

    for (const teacherId of teachers) {
      const role = TeacherRoleAdapter[disciplineType.name];
      const disciplineTeacher = await this.disciplineTeacherRepository.getOrCreate({ teacherId, disciplineId });
      if (!some(disciplineTeacher.roles, 'role', role)) {
        await this.disciplineTeacherRoleRepository.create({
          disciplineTeacherId: disciplineTeacher.id,
          disciplineTypeId: disciplineType.id,
          role,
        });
      }
    }
  }

  async getFortnightEvents (groupId: string, week: number, userId: string) {
    week = week || await this.dateService.getCurrentWeek();
    const [firstWeek, secondWeek] = week % 2 === 0 ? [week-1, week] : [week, week+1];
    const firstWeekEvents = await this.getGroupEventsForTelegram(groupId, firstWeek, userId);
    const secondWeekEvents = await this.getGroupEventsForTelegram(groupId, secondWeek, userId);
    return { firstWeekEvents, secondWeekEvents };
  }

  async getGroupEventsForTelegram (groupId: string, week: number, userId: string) {
    const student = userId
      ? await this.studentRepository.findById(userId)
      : undefined;

    if (student && student.groupId !== groupId) throw new NoPermissionException();


    week = week || await this.dateService.getCurrentWeek();
    const eventFiltration = {
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
}
