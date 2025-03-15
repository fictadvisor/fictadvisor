import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EventRepository } from '../../database/v2/repositories/event.repository';
import { DateUtils } from '../date/date.util';
import { TeacherRepository } from '../../database/v2/repositories/teacher.repository';
import { SubjectRepository } from '../../database/v2/repositories/subject.repository';
import { DbDiscipline } from '../../database/v2/entities/discipline.entity';
import { DisciplineTeacherRepository } from '../../database/v2/repositories/discipline-teacher.repository';
import { DisciplineRepository } from '../../database/v2/repositories/discipline.repository';
import { mapAsync } from '../../common/helpers/array.util';
import { RozParser } from './roz-parser';
import { CampusParser } from './campus-parser';
import { Parser } from './interfaces/parser.interface';
import { GroupService } from '../group/v2/group.service';
import { ScheduleMapper } from '../../common/mappers/schedule.mapper';
import { ScheduleService, weeksPerEvent } from '../schedule/v2/schedule.service';
import { DateService, FORTNITE, StudyingSemester, WEEK } from '../date/date.service';
import { DisciplineTypeEnum, ParserTypeEnum, Period } from '@fictadvisor/utils/enums';
import { DbDisciplineType } from '../../database/v2/entities/discipline-type.entity';
import {
  GroupParsedSchedule,
  ParsedSchedulePair,
  ParsedScheduleTeacher,
  ParsedScheduleWeek,
  ParsedDisciplineType,
} from './types/schedule-parser-types';
import { DisciplineTeacherRoleRepository } from '../../database/v2/repositories/discipline-teacher-role.repository';

type BaseGeneralParserPair = ParsedSchedulePair & {
  period: Period;
  teacherIds: string[];
}

type DatabasePair = Omit<BaseGeneralParserPair, 'isSelective' | 'teachers'> & {
  id: string;
  disciplineId: string;
  teacherForceChanges: boolean;
  subjectName: string;
}

@Injectable()
export class GeneralParser {
  constructor (
    @Inject(forwardRef(() => ScheduleService))
    private scheduleService: ScheduleService,
    private groupService: GroupService,
    private eventRepository: EventRepository,
    private teacherRepository: TeacherRepository,
    private dateService: DateService,
    private dateUtils: DateUtils,
    private subjectRepository: SubjectRepository,
    private disciplineRepository: DisciplineRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private disciplineTeacherRoleRepository: DisciplineTeacherRoleRepository,
    private rozParser: RozParser,
    private campusParser: CampusParser,
    private scheduleMapper: ScheduleMapper
  ) {}

  private parserTypes: Record<ParserTypeEnum, Parser> = {
    [ParserTypeEnum.ROZKPI]: this.rozParser,
    [ParserTypeEnum.CAMPUS]: this.campusParser,
  };

  async parse (
    parserType: ParserTypeEnum,
    groupList?: string[],
    period?: StudyingSemester,
    page?: number
  ) {
    const weekNumber = period ? 1 : await this.dateService.getCurrentWeek();

    if (!period) {
      const { isFinished } = await this.dateService.getCurrentSemester();
      if (isFinished) return;
    }

    const semester = period ?
      await this.dateService.getSemester(period) :
      await this.dateService.getCurrentSemester();

    const groupsPerPage = 40;

    const parser = this.parserTypes[parserType];
    const groups = (await parser.parseGroups(groupList)).slice(
      ((page ?? 1) - 1) * groupsPerPage,
      page ? page * groupsPerPage : undefined
    );

    for (const group of groups) {
      const [groupSchedule, { id: groupId }] = await Promise.all([
        parser.parseGroupSchedule(group, semester),
        this.groupService.getOrCreate({ code: group.name }),
      ]);

      await this.handleGroupSchedule(
        groupId,
        groupSchedule,
        weekNumber,
        semester
      );
    }
  }

  private async handleGroupSchedule (
    groupId: string,
    schedule: GroupParsedSchedule,
    weekNumber: number,
    semester: StudyingSemester
  ) {
    const { firstWeek, secondWeek } = schedule;
    const weeks = [firstWeek, secondWeek];
    const parsedWeeks = await this.prepareParsedPairs(weeks);

    await this.saveWeekSchedule(
      parsedWeeks[this.getWeekIndex(weekNumber)],
      weekNumber,
      groupId,
      semester
    );
    await this.saveWeekSchedule(
      parsedWeeks[this.getWeekIndex(weekNumber + 1)],
      weekNumber + 1,
      groupId,
      semester
    );
  }

  private getWeekIndex (week: number) {
    return (week + 1) % 2;
  }

  private async saveWeekSchedule (
    parsedPairs: BaseGeneralParserPair[],
    weekNumber: number,
    groupId: string,
    semester: StudyingSemester
  ) {
    const databasePairs = await this.getDatabasePairs(groupId, weekNumber, semester);

    let oldChanged: DatabasePair[] = [];
    const notChanged: DatabasePair[] = [];
    const newChanged: BaseGeneralParserPair[] = [];

    for (const databasePair of databasePairs) {
      const newPairIndex = parsedPairs.findIndex(
        ({ name, startTime, endTime, disciplineType }) =>
          databasePair.name === name &&
          databasePair.startTime.getTime() === startTime.getTime() &&
          databasePair.endTime.getTime() === endTime.getTime() &&
          databasePair.disciplineType.name === disciplineType.name,
      );

      if (newPairIndex !== -1) {
        databasePair.teacherIds = parsedPairs[newPairIndex].teacherIds;
        notChanged.push(databasePair);
        parsedPairs.splice(newPairIndex, 1);
      } else {
        oldChanged.push(databasePair);
      }
    }
    newChanged.push(...parsedPairs);

    [oldChanged] = await Promise.all([
      this.handleNewPairs(newChanged, oldChanged, groupId, semester),
      this.handleNotChanged(notChanged),
    ]);

    await this.handleOldPairs(oldChanged, weekNumber);
  }

  private async handleNotChanged (pairs: DatabasePair[]) {
    for (const {
      id: eventId,
      disciplineId,
      disciplineType,
      teacherForceChanges,
      teacherIds,
    } of pairs) {
      if (!teacherForceChanges) {
        await this.disciplineTeacherRoleRepository.deleteMany({
          disciplineType: {
            id: disciplineType.id,
          },
        });

        for (const teacherId of teacherIds) {
          await this.createOrUpdateDisciplineTeacher(
            teacherId,
            disciplineId,
            disciplineType,
            eventId
          );
        }
      }
    }
  }

  private async handleNewPairs (
    pairs: BaseGeneralParserPair[],
    oldPairs: DatabasePair[],
    groupId: string,
    semester: StudyingSemester,
  ) {
    for (const pair of pairs) {
      const checkCallback =
        ({ subjectName, disciplineType }: DatabasePair) =>
          subjectName === pair.name &&
          disciplineType.name === pair.disciplineType.name;

      const defendant = oldPairs.filter(checkCallback);
      oldPairs = oldPairs.filter((p) => !checkCallback(p));

      for (const { id } of defendant) {
        await this.eventRepository.updateById(id, {
          eventsAmount: await this.getEventsAmount(pair.period),
          startTime: pair.startTime,
          endTime: pair.endTime,
        });
      }

      if (!defendant.length) {
        await this.savePair(pair, groupId, semester);
      }
    }

    return oldPairs;
  }

  private async handleOldPairs (oldPairs: DatabasePair[], weekNumber: number) {
    for (const { id: eventId, startTime, period } of oldPairs) {
      const eventsAmount = await this.calculateEventsAmount(
        startTime,
        period,
        weekNumber,
      );

      if (eventsAmount) {
        await this.eventRepository.updateById(eventId, {
          eventsAmount,
        });
      } else {
        await this.eventRepository.deleteById(eventId);
      }
    }
  }

  private async calculateEventsAmount (startOfEvent: Date, eventPeriod: Period, week: number) {
    const { endOfWeek: eventEndDate } = (await this.dateService.getDatesOfWeek(week));

    if (
      startOfEvent > eventEndDate ||
      eventPeriod === Period.NO_PERIOD
    ) return 0;

    const eventWeeks = this.dateUtils.getFlooredDifference(startOfEvent, eventEndDate, WEEK);
    return Math.ceil(eventWeeks / weeksPerEvent[eventPeriod]);
  }

  private async savePair (
    {
      name,
      isSelective,
      disciplineType,
      startTime,
      endTime,
      period,
      teachers,
    }: BaseGeneralParserPair,
    groupId: string,
    semester: StudyingSemester,
  ) {
    const { id: subjectId } = await this.subjectRepository.getOrCreate(name ?? '');
    const discipline = await this.getOrCreateDiscipline(
      subjectId,
      groupId,
      semester,
      disciplineType.name,
      isSelective
    );

    const DbDisciplineType = discipline.disciplineTypes.find((type) =>
      type.name === disciplineType.name);

    const { id: eventId } = await this.eventRepository.findOrCreate(
      {
        groupId,
        startTime,
        lessons: {
          some: {
            disciplineTypeId: DbDisciplineType.id,
          },
        },
      },
      {
        name,
        startTime,
        endTime,
        period,
        eventsAmount: await this.getEventsAmount(period),
        groupId: groupId,
        lessons: {
          create: {
            disciplineTypeId: DbDisciplineType.id,
          },
        },
      }
    );

    await this.handleTeachers(
      teachers,
      discipline,
      DbDisciplineType,
      eventId
    );
  }

  private async getEventsAmount (period: Period) {
    const { startDate, endDate } = await this.dateService.getCurrentSemester();
    const lastWeek = this.dateUtils.getCeiledDifference(
      startDate,
      new Date(endDate.getTime() - FORTNITE),
      WEEK
    );
    return lastWeek / weeksPerEvent[period];
  }

  private async handleTeachers (
    teachers: ParsedScheduleTeacher[],
    discipline: DbDiscipline,
    disciplineType: DbDisciplineType,
    eventId: string
  ) {
    for (const teacher of teachers) {
      const { id: teacherId } = await this.getOrCreateTeacher(teacher);
      await this.createOrUpdateDisciplineTeacher(
        teacherId,
        discipline.id,
        disciplineType,
        eventId
      );
    }
  }

  private async getOrCreateDiscipline (
    subjectId: string,
    groupId: string,
    { year, semester }: StudyingSemester,
    disciplineTypeName: DisciplineTypeEnum,
    isSelective: boolean
  ) {
    const discipline = await this.disciplineRepository.getOrCreate({
      subjectId,
      groupId,
      year,
      semester,
    });

    const updateData: any = { isSelective };

    if (!discipline.disciplineTypes.some(
      (type) => type.name === disciplineTypeName
    )) {
      updateData.disciplineTypes = {
        create: {
          name: disciplineTypeName,
        },
      };
    }

    return  this.disciplineRepository.updateById(discipline.id, updateData);
  }

  private async getOrCreateTeacher ({
    lastName,
    firstName,
    middleName,
  }: ParsedScheduleTeacher) {
    if (firstName.length <= 1 || middleName.length <= 1) {
      const teachers = await this.teacherRepository.findMany({
        where: {
          lastName,
          firstName: { startsWith: firstName },
          middleName: { startsWith: middleName },
        },
      });

      if (teachers.length === 1) return teachers[0];
    }

    return this.teacherRepository.getOrCreate({
      lastName,
      firstName,
      middleName,
    });
  }

  private async createOrUpdateDisciplineTeacher (
    teacherId: string,
    disciplineId: string,
    disciplineType: ParsedDisciplineType,
    eventId: string
  ) {
    const disciplineTeacher =
      await this.disciplineTeacherRepository.getOrCreate({
        teacherId,
        disciplineId,
        roles: {
          create: {
            disciplineTypeId: disciplineType.id,
          },
        },
      });

    if (!disciplineTeacher.roles.some((role) =>
      role.disciplineType.name === disciplineType.name
    )) {
      await Promise.all([
        this.disciplineTeacherRepository.updateById(disciplineTeacher.id, {
          roles: {
            create: {
              disciplineTypeId: disciplineType.id,
            },
          },
        }),
        this.eventRepository.updateById(eventId, {
          lessons: {
            deleteMany: {},
            create: {
              disciplineTypeId: disciplineType.id,
            },
          },
        }),
      ]);
    }
  }

  private async prepareParsedPairs (weeks: ParsedScheduleWeek[]): Promise<[BaseGeneralParserPair[], BaseGeneralParserPair[]]> {
    const result: [BaseGeneralParserPair[], BaseGeneralParserPair[]] = [[], []];

    for (const [index, { pairs }] of weeks.entries()) {
      const newPairs: Omit<BaseGeneralParserPair, 'period'>[] = [];

      for (const { teachers, ...pair } of pairs) {
        const teacherIds = await mapAsync(teachers, async (teacher) => {
          const { id } = await this.getOrCreateTeacher(teacher);
          return id;
        });

        newPairs.push({
          ...pair,
          teachers,
          teacherIds,
        });
      }

      result[index] = newPairs as BaseGeneralParserPair[];
    }

    for (const [index, pairs] of result.entries()) {
      for (const pair of pairs) {
        pair.period = this.calculateEventPeriod(result, pair, index);

        if (index === 1 && pair.period === Period.EVERY_WEEK) {
          pair.startTime = new Date(pair.startTime.getTime() - WEEK);
          pair.endTime = new Date(pair.endTime.getTime() - WEEK);
        }
      }
    }

    return result;
  }

  private calculateEventPeriod (weeks: BaseGeneralParserPair[][], currentWeekPair: BaseGeneralParserPair, weekIndex: number) {
    const otherWeekIndex = (weekIndex + 1) % 2;
    const weekOffset = otherWeekIndex ? WEEK : -WEEK;

    const otherWeekMatches = weeks[otherWeekIndex].find(
      ({ name, startTime, endTime, disciplineType }: BaseGeneralParserPair) =>
        currentWeekPair.name === name &&
        currentWeekPair.disciplineType.name === disciplineType.name &&
        currentWeekPair.startTime.getTime() + weekOffset === startTime.getTime() &&
        currentWeekPair.endTime.getTime() + weekOffset === endTime.getTime(),
    );

    return otherWeekMatches ?
      Period.EVERY_WEEK :
      Period.EVERY_FORTNIGHT;
  };

  private async getDatabasePairs (
    groupId: string,
    week: number,
    semester: StudyingSemester,
  ): Promise<DatabasePair[]> {
    const events = (
      await this.scheduleService.getGeneralGroupEvents(groupId, week, false, semester)
    ).events.filter((event) => !event.isCustom);

    return mapAsync(events, async (event): Promise<DatabasePair> => {
      const discipline = await this.disciplineRepository.find({
        disciplineTypes: {
          some: {
            lessons: {
              some: {
                eventId: event.id,
              },
            },
          },
        },
      });

      const { id, name, startTime, endTime, teachers, period } =
        this.scheduleMapper.getEvent(event, discipline);

      return {
        id,
        name,
        startTime,
        endTime,
        disciplineId: discipline.id,
        period,
        subjectName: discipline.subject.name,
        teacherForceChanges: event.teacherForceChanges,
        teacherIds: teachers.map(({ id }) => id),
        disciplineType: {
          name: event.lessons[0]?.disciplineType.name,
          id: event.lessons[0]?.disciplineType.id,
        },
      };
    });
  }

  static parseTeacherNames (...teacherNames: string[]): ParsedScheduleTeacher[] {
    const result = [];

    for (const teacherName of teacherNames) {
      const parsed = this.parseTeacherName(teacherName);
      if (parsed) result.push(parsed);
    }

    return result;
  }

  private static parseTeacherName (teacherName: string): ParsedScheduleTeacher {
    if (!teacherName) return;
    const [middleName, firstName, lastName] = teacherName.split(' ').reverse();

    const teacher = {
      lastName: lastName?.trim()?.replace('.', '') ?? '',
      firstName: firstName?.trim()?.replace('.', '') ?? '',
      middleName: middleName?.trim()?.replace('.', '') ?? '',
    };

    if (!Object.values(teacher).every((value) => value === '')) {
      return teacher;
    }
  }
}
