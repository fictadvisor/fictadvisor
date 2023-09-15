import { DateService, DAY, FORTNITE, WEEK } from '../../utils/date/DateService';
import { Injectable } from '@nestjs/common';
import { EventRepository } from '../../database/repositories/EventRepository';
import { DbEvent } from '../../database/entities/DbEvent';
import { Period, DisciplineTypeEnum, DisciplineType } from '@prisma/client';
import { RozParser } from '../../utils/parser/RozParser';
import { ScheduleParser } from '../../utils/parser/ScheduleParser';
import { CreateEventDTO } from '../dtos/CreateEventDTO';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { DisciplineTeacherRepository } from '../../database/repositories/DisciplineTeacherRepository';
import { DisciplineTeacherService } from './DisciplineTeacherService';
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

@Injectable()
export class ScheduleService {

  constructor (
    private dateService: DateService,
    private disciplineTeacherService: DisciplineTeacherService,
    private eventRepository: EventRepository,
    private disciplineRepository: DisciplineRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private disciplineTeacherRoleRepository: DisciplineTeacherRoleRepository,
    private rozParser: RozParser,
    private scheduleParser: ScheduleParser,
    private userService: UserService,
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

  async getIndexOfLesson (week, endOfWeek, event) {
    const { startDate } = await this.dateService.getCurrentSemester();
    const startWeek = Math.ceil((event.startTime.getTime() - startDate.getTime()) / WEEK);
    const endWeek = Math.ceil((event.endTime.getTime() - startDate.getTime()) / WEEK);
    const difference = endOfWeek.getTime() - event.startTime.getTime();
    const index = Math.floor(difference / WEEK);
    if (
      week > endWeek || week < startWeek ||
      (event.period === Period.EVERY_FORTNIGHT && startWeek % 2 !== week % 2)
    ) {
      return null;
    }
    if (event.period === Period.EVERY_FORTNIGHT) {
      return Math.ceil(index / 2);
    }
    return index;
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
      const indexOfLesson = await this.getIndexOfLesson(week, endOfWeek, event);
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


  async getGeneralGroupEventsByDay (id: string, day: number) {
    const week = await this.dateService.getCurrentWeek();

    day = day ? day : (await this.dateService.getCurrentDay()).day;

    const { startOfDay } = await this.dateService.getSpecificDayInWeek(week, day);

    const result = await this.getGeneralGroupEvents(id, week);

    return {
      events: result.events.filter((event) => {
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
    if (event.period !== Period.NO_PERIOD) {
      const { startWeek } = await this.setWeekTime(event, week);

      const eventInfoIndex = (week - startWeek) / (event.period === Period.EVERY_FORTNIGHT ? 2 : 1);
      event.eventInfo[0] = event.eventInfo.find((info) => info.number === eventInfoIndex);
    }

    const discipline = await this.getEventDiscipline(event.id);

    return { event, discipline };
  }

  async setWeekTime (event: DbEvent, week: number): Promise<{ startWeek: number, endWeek: number }> {
    const { startDate } = await this.dateService.getCurrentSemester();
    const startWeek = Math.ceil((event.startTime.getTime() - startDate.getTime()) / WEEK);
    const endWeek = Math.ceil((event.endTime.getTime() - startDate.getTime()) / WEEK);
    if (
      week > endWeek || week < startWeek ||
      (event.period === Period.EVERY_FORTNIGHT && startWeek % 2 !== week % 2)
    ) {
      throw new InvalidWeekException();
    }

    event.startTime.setDate(event.startTime.getDate() + (week - startWeek) * 7);
    event.endTime.setDate(event.endTime.getDate() - (endWeek - week) * 7);

    return { startWeek, endWeek };
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

  private async getEndIndex (startEventDate: Date, endEventDate: Date, period: Period) {
    const divider = period === Period.EVERY_FORTNIGHT ? FORTNITE : WEEK;
    return Math.ceil((endEventDate.getTime() - startEventDate.getTime()) / divider) - 1;
  }

  private async getLastEndDate (indexEndDate: Date, period: Period) {
    const { endDate } = await this.dateService.getCurrentSemester();

    const difference = Math.ceil((endDate.getTime() - FORTNITE - indexEndDate.getTime()) / DAY);
    const divider = period === Period.EVERY_FORTNIGHT ? 14 : 7;
    const count = Math.floor(difference / divider);

    const lastEndDate = indexEndDate.setDate(indexEndDate.getDate() + count * divider);
    return new Date(lastEndDate);
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

  async createGroupEvent (body: CreateEventDTO) {
    await this.checkEventDates(body.startTime, body.endTime);
    if (body.disciplineId && !body.disciplineType) throw new ObjectIsRequiredException('DisciplineType');

    const endTime = body.period === Period.NO_PERIOD
      ? body.endTime
      : await this.getLastEndDate(body.endTime, body.period);

    const endIndex = await this.getEndIndex(body.startTime, body.endTime, body.period);
    const eventInfo = [];
    for (let i = 0; i <= endIndex; i++) {
      eventInfo.push({ number: i });
    }
    eventInfo[0].description = body.eventInfo;

    const event = await this.eventRepository.create({
      groupId: body.groupId,
      name: body.name,
      period: body.period,
      startTime: body.startTime,
      url: body.url,
      endTime,
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
      const indexOfLesson = await this.getIndexOfLesson(week, endOfWeek, event);
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
      const disciplines = await this.disciplineRepository.findMany({
        where: {
          groupId: user.group.id,
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

      groupEvents = groupEvents.filter((event) => {
        const disciplineId = event.lessons[0]?.disciplineType.disciplineId;
        if (!disciplineId) return true;
        return some(disciplines, 'id', disciplineId);
      });
    }

    week = week || await this.dateService.getCurrentWeek();

    return {
      events: groupEvents,
      week,
      startTime: new Date(startOfWeek),
    };
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
      ...durationTime
    } = body;

    let startTime = durationTime.startTime ?? event.startTime;
    if (!durationTime.startTime && durationTime.changeStartDate) throw new ObjectIsRequiredException('startTime');
    if (durationTime.startTime && !durationTime.changeStartDate) {
      startTime = event.startTime;
      startTime.setHours(durationTime.startTime.getHours());
      startTime.setMinutes(durationTime.startTime.getMinutes());
    }

    const endTime = period === Period.NO_PERIOD
      ? durationTime.endTime
      : await this.getLastEndDate(durationTime.endTime ?? event.endTime, period);

    const eventInfoForUpdate = await this.getEventInfoForUpdate(period, startTime, endTime, week, eventInfo, event);

    event = await this.eventRepository.updateById(eventId, {
      name,
      period,
      startTime,
      endTime,
      url,
      eventInfo: eventInfoForUpdate,
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

  private async getEventInfoForUpdate (
    period: Period,
    startTime: Date,
    endTime: Date,
    week: number,
    eventInfo: string,
    event: DbEvent,
  ) {
    const data = {
      update: undefined,
      createMany: undefined,
      deleteMany: undefined,
    };

    if (eventInfo !== undefined) {

      const { endOfWeek } = await this.dateService.getDatesOfWeek(week);
      const indexOfLesson = await this.getIndexOfLesson(week, endOfWeek, event);
      if (indexOfLesson === null || indexOfLesson < 0 || indexOfLesson >= event.eventInfo.length) {
        throw new InvalidWeekException();
      }
      data.update = {
        where: {
          eventId_number: {
            eventId: event.id,
            number: indexOfLesson,
          },
        },
        data: {
          description: eventInfo,
        },
      };
    }

    if (period === Period.NO_PERIOD) {
      data.deleteMany = {
        number: {
          gte: 1,
        },
      };
    } else {
      const countOfPair = await this.getEndIndex(startTime, endTime, period);
      const pairDifference = countOfPair - event.eventInfo.length;

      if (pairDifference > 0) {
        data.createMany = {
          data: this.scheduleParser.getIndexesForEventInfo(event.eventInfo.length, event.eventInfo.length+pairDifference - 1),
        };
      } else if (pairDifference < 0) {
        data.deleteMany = {
          number: {
            gt: countOfPair,
          },
        };
      }
    }
    return data;
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

  async getGeneralFortnightEvents (groupId: string, week: number) {
    week = week || await this.dateService.getCurrentWeek();
    const [firstWeek, secondWeek] = week % 2 === 0 ? [week-1, week] : [week, week+1];
    const { events: firstWeekEvents } = await this.getGeneralGroupEvents(groupId, firstWeek);
    const { events: secondWeekEvents } = await this.getGeneralGroupEvents(groupId, secondWeek);
    return { firstWeekEvents, secondWeekEvents };
  }
}
