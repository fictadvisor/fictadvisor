import { Injectable } from '@nestjs/common';
import { DateService, DAY, FORTNITE, WEEK } from '../../utils/date/DateService';
import { EventRepository } from '../../database/repositories/EventRepository';
import { DbEvent } from '../../database/entities/DbEvent';
import { Period, DisciplineTypeEnum } from '@prisma/client';
import { RozParser } from '../../utils/parser/RozParser';
import { ScheduleParser } from '../../utils/parser/ScheduleParser';
import { CreateEventDTO } from '../dtos/CreateEventDTO';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { DisciplineTeacherRepository } from '../../database/repositories/DisciplineTeacherRepository';
import { DisciplineTeacherService } from './DisciplineTeacherService';
import { TeacherRoleAdapter } from '../../mappers/TeacherRoleAdapter';
import { AttachLessonDTO } from '../dtos/AttachLessonDTO';
import { InvalidDateException } from '../../utils/exceptions/InvalidDateException';
import { ObjectIsRequiredException } from '../../utils/exceptions/ObjectIsRequiredException';
import { DisciplineTeacherRoleRepository } from '../../database/repositories/DisciplineTeacherRoleRepository';
import { filterAsync, find, some } from '../../utils/ArrayUtil';
import { DbDiscipline } from '../../database/entities/DbDiscipline';
import { InvalidWeekException } from '../../utils/exceptions/InvalidWeekException';
import { UserService } from './UserService';


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

  getIndexOfLesson (period, startTime, endOfWeek) {
    const difference = endOfWeek.getTime() - startTime.getTime();
    let index = difference / (1000 * 60 * 60 * 24 * 7);

    if (period === Period.EVERY_WEEK) {
      return +parseInt(String(index));
    } else if (period === Period.EVERY_FORTNIGHT) {
      index /= 2;
      if (index % 1 <= 0.5) {
        return +parseInt(String(index));
      } else {
        return null;
      }
    } else if (period === Period.NO_PERIOD) {
      return 0;
    }
  }

  async getGeneralGroupEvents (id, week) {
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

    const result  = events
      .filter((event) => {
        const indexOfLesson = this.getIndexOfLesson(event.period, event.startTime, endOfWeek);
        return indexOfLesson !== null;
      });

    for (const event of result) {
      await this.setWeekTime(event, week);
    }

    return {
      events: result,
      week,
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
      event.eventInfo[0] = event.eventInfo[eventInfoIndex];
    }

    const discipline = await this.getEventDiscipline(event.id);

    return { event, discipline };
  }

  private async setWeekTime (event: DbEvent, week: number): Promise<{ startWeek: number, endWeek: number }> {
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

    const difference = Math.ceil((endDate.getTime() - indexEndDate.getTime()) / DAY);
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

  async createGroupEvent (body: CreateEventDTO) {
    await this.checkEventDates(body.startTime, body.endTime);
    if (body.disciplineId && !body.disciplineType) throw new ObjectIsRequiredException('DisciplineType');

    const endTime = body.period === Period.NO_PERIOD
      ? body.endTime
      : await this.getLastEndDate(body.endTime, body.period);

    const endIndex  = await this.getEndIndex(body.startTime, body.endTime, body.period);
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

  async getAllGroupEvents (groupId, week) {
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

    const result  = events
      .filter((event) => {
        const indexOfLesson = this.getIndexOfLesson(event.period, event.startTime, endOfWeek);
        return indexOfLesson !== null;
      });

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
    isOwnSelected: boolean,
    week: number,
  ) {

    const user = await this.userService.getUser(userId);
    if (user.group.id !== groupId) {
      return await this.getGeneralGroupEvents(groupId, week);
    }

    const groupEvents = await this.getAllGroupEvents(groupId, week);

    if (isOwnSelected) {
      const userSelective = await this.userService.getSelectiveDisciplines(userId);
      await filterAsync(groupEvents, async (event) => {
        const lesson = event.lessons[0];
        const discipline = await this.disciplineRepository.findById(lesson.disciplineType.disciplineId);

        if (!discipline.isSelective) return true;

        return some(userSelective, 'id', lesson.disciplineType.disciplineId);
      });
    }

    week = week || await this.dateService.getCurrentWeek();

    return {
      events: groupEvents,
      week,
    };
  }
}
