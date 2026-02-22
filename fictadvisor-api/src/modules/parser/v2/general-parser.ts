import { Injectable } from '@nestjs/common';
import { EventRepository } from '../../../database/v2/repositories/event.repository';
import { DateUtils } from '../../date/date.utils';
import { TeacherRepository } from '../../../database/v2/repositories/teacher.repository';
import { SubjectRepository } from '../../../database/v2/repositories/subject.repository';
import { DbDiscipline } from '../../../database/v2/entities/discipline.entity';
import { DisciplineTeacherRepository } from '../../../database/v2/repositories/discipline-teacher.repository';
import { DisciplineRepository } from '../../../database/v2/repositories/discipline.repository';
import { mapAsync } from '../../../common/utils/array.utils';
import { CampusParser } from './campus-parser';
import { Parser } from './interfaces/parser.interface';
import { GroupService } from '../../group/v2/group.service';
import { weeksPerEvent } from '../../schedule/v2/schedule.service';
import { DateService, FORTNITE, StudyingSemester, WEEK } from '../../date/v2/date.service';
import { DisciplineTypeEnum, EventTypeEnum, ParserTypeEnum, Period } from '@fictadvisor/utils/enums';
import { DbDisciplineType } from '../../../database/v2/entities/discipline-type.entity';
import {
  GroupParsedSchedule,
  ParsedDisciplineType,
  ParsedSchedulePair,
  ParsedScheduleTeacher,
  ParsedScheduleWeek,
} from './types/schedule-parser.types';
import { DisciplineTeacherRoleRepository } from '../../../database/v2/repositories/discipline-teacher-role.repository';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { DbEvent } from '../../../database/v2/entities/event.entity';
import { EventResponse } from '@fictadvisor/utils/responses';
import { Prisma } from '@prisma-client/fictadvisor';
import { DateTime } from 'luxon';
import DisciplineUpdateInput = Prisma.DisciplineUpdateInput;
import EventWhereInput = Prisma.EventWhereInput;

type BaseGeneralParserPair = ParsedSchedulePair & {
  period: Period;
  teacherIds: string[];
}

type DatabasePair = Omit<BaseGeneralParserPair, 'isSelective' | 'teachers'> & {
  id: string;
  disciplineId: string;
  teacherForceChanges: boolean;
  subjectName: string;
  eventsAmount: number;
}

@Injectable()
export class GeneralParser {
  constructor(
    private groupService: GroupService,
    private eventRepository: EventRepository,
    private teacherRepository: TeacherRepository,
    private dateService: DateService,
    private dateUtils: DateUtils,
    private subjectRepository: SubjectRepository,
    private disciplineRepository: DisciplineRepository,
    private disciplineTeacherRepository: DisciplineTeacherRepository,
    private disciplineTeacherRoleRepository: DisciplineTeacherRoleRepository,
    private campusParser: CampusParser,
    @InjectMapper() private mapper: Mapper
  ) {}

  private parserTypes: Record<ParserTypeEnum, Parser> = {
    [ParserTypeEnum.CAMPUS]: this.campusParser,
  };

  static parseTeacherNames(...teacherNames: string[]): ParsedScheduleTeacher[] {
    const result = [];

    for (const teacherName of teacherNames) {
      const parsed = this.parseTeacherName(teacherName);
      if (parsed) result.push(parsed);
    }

    return result;
  }

  static ensureSelectivesAreValid(weeks: GroupParsedSchedule) {
    const names = this.getUniqueSubjectsName(weeks);
    let result = weeks;

    for (const pairName of names) {
      const isSelective = this.checkIfDisciplineIsSelective(result, pairName);
      if (isSelective) result = this.makePairsSelective(result, pairName);
    }
    return result;
  }

  private static makePairsSelective(
    weeks: GroupParsedSchedule,
    pairName: string
  ): GroupParsedSchedule {
    return {
      ...weeks,
      firstWeek: {
        ...weeks.firstWeek,
        pairs: this.makeWeekPairsSelective(weeks.firstWeek.pairs, pairName),
      },
      secondWeek: {
        ...weeks.secondWeek,
        pairs: this.makeWeekPairsSelective(weeks.secondWeek.pairs, pairName),
      },
    };
  }

  private static makeWeekPairsSelective(
    pairs: ParsedSchedulePair[],
    pairName: string
  ): ParsedSchedulePair[] {
    return pairs.map((pair) => ({
      ...pair,
      isSelective: pair.name === pairName ? true : pair.isSelective,
    }));
  }

  private static checkIfDisciplineIsSelective(
    weeks: GroupParsedSchedule,
    pairName: string
  ): boolean {
    return [...weeks.firstWeek.pairs, ...weeks.secondWeek.pairs]
      .filter(({ name }) => name === pairName)
      .some(({ isSelective }) => isSelective);
  }

  private static getUniqueSubjectsName({
    firstWeek,
    secondWeek,
  }: GroupParsedSchedule) {
    const names = [firstWeek, secondWeek].flatMap((week) =>
      week.pairs.map((pair) => pair.name)
    );
    return [...new Set(names)];
  }

  private static parseTeacherName(teacherName: string): ParsedScheduleTeacher {
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

  private async getDates(
    initialIndex: number,
    semesterStartDate: Date
  ): Promise<EventWhereInput[]> {
    const weekCount = await this.getEventsAmount(Period.EVERY_FORTNIGHT);

    const periods = new Array(weekCount).fill(null);
    return periods.map((_, index) => {
      const { startOfWeek, endOfWeek } = this.dateService.getWeekDates(
        semesterStartDate,
        index * 2 + initialIndex
      );

      return {
        startTime: {
          gte: startOfWeek,
          lte: endOfWeek,
        },
      };
    });
  }

  async parse(
    parserType: ParserTypeEnum,
    groupList?: string[],
    period?: StudyingSemester,
    page?: number
  ) {
    const weekNumber = await this.dateService.getCurrentWeek();

    const { isFinished, startDate: semesterStartDate } =
      await this.dateService.getCurrentSemester();

    if (!period && isFinished) {
      return;
    }

    const semester = period
      ? await this.dateService.getSemester(period)
      : await this.dateService.getCurrentSemester();

    const groupsPerPage = 40;

    const parser = this.parserTypes[parserType];
    const groups = (await parser.parseGroups(groupList)).slice(
      ((page ?? 1) - 1) * groupsPerPage,
      page ? page * groupsPerPage : undefined
    );

    const dates = await Promise.all([
      this.getDates(0, semesterStartDate),
      this.getDates(1, semesterStartDate),
    ]);

    for (const group of groups) {
      const [groupSchedule, { id: groupId }] = await Promise.all([
        parser.parseGroupSchedule(group, semester),
        this.groupService.getOrCreate({ code: group.name }),
      ]);

      await this.handleGroupSchedule(
        groupId,
        GeneralParser.ensureSelectivesAreValid(groupSchedule),
        weekNumber,
        semester,
        dates,
        semesterStartDate
      );
    }

    console.log('\nPARSE COMPLETED\n');
  }

  private async handleGroupSchedule(
    groupId: string,
    schedule: GroupParsedSchedule,
    weekNumber: number,
    semester: StudyingSemester,
    dates: [
      EventWhereInput[],
      EventWhereInput[],
    ],
    semesterStartDate: Date
  ) {
    const { firstWeek, secondWeek } = schedule;
    const weeks = [firstWeek, secondWeek];

    const parsedWeeks = await this.prepareParsedPairs(dates, weeks);

    await this.saveWeekSchedule(
      parsedWeeks[this.getWeekIndex(weekNumber)],
      weekNumber,
      groupId,
      semester,
      dates[this.getWeekIndex(weekNumber)],
      semesterStartDate
    );

    await this.saveWeekSchedule(
      parsedWeeks[this.getWeekIndex(weekNumber + 1)],
      weekNumber + 1,
      groupId,
      semester,
      dates[this.getWeekIndex(weekNumber + 1)],
      semesterStartDate
    );
  }

  private getWeekIndex(week: number) {
    return (week + 1) % 2;
  }

  private async saveWeekSchedule(
    parsedPairs: BaseGeneralParserPair[],
    weekNumber: number,
    groupId: string,
    semester: StudyingSemester,
    dates: EventWhereInput[],
    semesterStartDate: Date
  ) {
    const databasePairs = await this.getDatabasePairs(groupId, dates);

    let oldChanged: DatabasePair[] = [];
    const notChanged: DatabasePair[] = [];
    const newChanged: BaseGeneralParserPair[] = [];

    for (const databasePair of databasePairs) {
      const newPairIndex = parsedPairs.findIndex(
        ({ name, startTime, endTime, disciplineType, period }) =>
          databasePair.name === name &&
          databasePair.startTime.getTime() === startTime.getTime() &&
          databasePair.endTime.getTime() === endTime.getTime() &&
          databasePair.disciplineType.name === disciplineType.name &&
          databasePair.period === period
      );

      if (newPairIndex !== -1) {
        databasePair.teacherIds = parsedPairs[newPairIndex].teacherIds;
        notChanged.push({
          ...databasePair,
          period: parsedPairs[newPairIndex].period,
        });

        if (parsedPairs[newPairIndex].isSelective) {
          await this.updateDiscipline(databasePair.disciplineId, true);
        }

        parsedPairs.splice(newPairIndex, 1);
      } else {
        oldChanged.push(databasePair);
      }
    }
    newChanged.push(...parsedPairs);

    oldChanged = await this.handleNewPairs(
      newChanged,
      oldChanged,
      groupId,
      semester
    );

    await Promise.all([
      this.handleNotChanged(notChanged),
      this.handleOldPairs(oldChanged, weekNumber, semesterStartDate),
    ]);
  }

  private async handleNotChanged(pairs: DatabasePair[]) {
    for (const {
      id: eventId,
      disciplineId,
      disciplineType,
      teacherForceChanges,
      teacherIds,
      period,
    } of pairs) {
      await this.eventRepository.updateById(eventId, {
        period,
        eventsAmount: await this.getEventsAmount(period),
      });

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

  private async updateDiscipline(disciplineId: string, isSelective: boolean) {
    return this.disciplineRepository.update(
      { id: disciplineId },
      { isSelective }
    );
  }

  private async handleNewPairs(
    pairs: BaseGeneralParserPair[],
    oldPairs: DatabasePair[],
    groupId: string,
    semester: StudyingSemester
  ) {
    for (const pair of pairs) {
      if (pair.period === Period.NO_PERIOD) {
        await this.savePair(pair, groupId, semester);
        continue;
      }

      const checkCallback = ({
        subjectName,
        disciplineType,
        period,
      }: DatabasePair) =>
        subjectName === pair.name &&
        disciplineType.name === pair.disciplineType.name &&
        period !== Period.NO_PERIOD;

      const defendant = oldPairs.filter(checkCallback);
      oldPairs = oldPairs.filter((p) => !checkCallback(p));

      if (defendant.length) {
        await this.updateDiscipline(
          defendant[0].disciplineId,
          pair.isSelective
        );
      }

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

  private async handleOldPairs(
    oldPairs: DatabasePair[],
    weekNumber: number,
    semesterStartDate: Date
  ) {
    const filteredOld = oldPairs.filter((pair) => {
      const lastPairStartDate = DateTime.fromJSDate(pair.startTime)
        .plus({
          week: pair.eventsAmount * weeksPerEvent[pair.period] - 1,
        })
        .toJSDate();

      const { startOfWeek } = this.dateService.getWeekDates(
        semesterStartDate,
        weekNumber
      );
      return lastPairStartDate >= startOfWeek;
    });

    for (const { id: eventId, startTime, period } of filteredOld) {
      const eventsAmount = await this.calculateEventsAmount(
        startTime,
        period,
        Math.max(0, weekNumber)
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

  private async calculateEventsAmount(
    startOfEvent: Date,
    eventPeriod: Period,
    week: number
  ) {
    const { endOfWeek: eventEndDate } =
      await this.dateService.getDatesOfWeek(week);

    if (startOfEvent > eventEndDate) return 0;
    if (eventPeriod === Period.NO_PERIOD) return 1;

    const eventWeeks = this.dateUtils.getFlooredDifference(
      startOfEvent,
      eventEndDate,
      WEEK
    );
    return Math.floor(eventWeeks / weeksPerEvent[eventPeriod]);
  }

  private async savePair(
    {
      name,
      isSelective,
      disciplineType,
      startTime,
      endTime,
      period,
      teacherIds,
    }: BaseGeneralParserPair,
    groupId: string,
    semester: StudyingSemester
  ) {
    const { id: subjectId } =
      (await this.subjectRepository.findOne({ name })) ??
      (await this.subjectRepository.create({ name: name ?? '' }));

    const discipline = await this.getOrCreateDiscipline(
      {
        subjectId,
        groupId,
        year: semester.year,
        semester: semester.semester,
      },
      disciplineType.name as DisciplineTypeEnum,
      isSelective
    );

    const DbDisciplineType = discipline.disciplineTypes.find(
      (type) => type.name === disciplineType.name
    );

    const event = {
      groupId,
      startTime,
      name,
      endTime,
      period,
    };

    const { id: eventId } =
      (await this.eventRepository.findOne({
        ...event,
        lessons: {
          some: {
            disciplineTypeId: DbDisciplineType.id,
          },
        },
      })) ??
      (await this.eventRepository.create({
        ...event,
        eventsAmount: await this.getEventsAmount(period),
        lessons: {
          create: {
            disciplineTypeId: DbDisciplineType.id,
          },
        },
      }));

    await this.handleTeachers(
      teacherIds,
      discipline,
      DbDisciplineType,
      eventId
    );
  }

  private async getEventsAmount(period: Period) {
    if (period === Period.NO_PERIOD) return 1;

    const { startDate, endDate } = await this.dateService.getCurrentSemester();
    const lastWeek = this.dateUtils.getCeiledDifference(
      startDate,
      new Date(endDate.getTime() - FORTNITE),
      WEEK
    );
    return lastWeek / weeksPerEvent[period];
  }

  private async handleTeachers(
    teacherIds: string[],
    discipline: DbDiscipline,
    disciplineType: DbDisciplineType,
    eventId: string
  ) {
    for (const teacherId of teacherIds) {
      await this.createOrUpdateDisciplineTeacher(
        teacherId,
        discipline.id,
        disciplineType,
        eventId
      );
    }
  }

  private async getOrCreateDiscipline(
    disciplineData: {
      subjectId: string;
      groupId: string;
      year: number;
      semester: number;
    },
    disciplineTypeName: DisciplineTypeEnum,
    isSelective: boolean
  ) {
    const discipline =
      (await this.disciplineRepository.findOne(disciplineData)) ??
      (await this.disciplineRepository.create(disciplineData));

    const updateData: DisciplineUpdateInput = {
      isSelective: discipline.isSelective || isSelective,
    };

    if (
      !discipline.disciplineTypes.some(
        (type) => type.name === disciplineTypeName
      )
    ) {
      updateData.disciplineTypes = {
        create: {
          name: disciplineTypeName,
        },
      };
    }

    return this.disciplineRepository.updateById(discipline.id, updateData);
  }

  private async getOrCreateTeacher({
    lastName,
    firstName,
    middleName,
  }: ParsedScheduleTeacher) {
    const teacherDto = {
      lastName,
      firstName,
      middleName,
    };

    return (
      (await this.teacherRepository.findOne({
        lastName,
        firstName: { startsWith: firstName },
        middleName: { startsWith: middleName },
      })) ?? (await this.teacherRepository.create(teacherDto))
    );
  }

  private async createOrUpdateDisciplineTeacher(
    teacherId: string,
    disciplineId: string,
    disciplineType: ParsedDisciplineType,
    eventId: string
  ) {
    const disciplineTeacherWhere = {
      teacherId,
      disciplineId,
    };

    const disciplineTeacher =
      (await this.disciplineTeacherRepository.findOne(
        disciplineTeacherWhere
      )) ??
      (await this.disciplineTeacherRepository.create({
        ...disciplineTeacherWhere,
        roles: {
          create: {
            disciplineTypeId: disciplineType.id,
          },
        },
      }));

    if (
      !disciplineTeacher.roles.some(
        (role) => role.disciplineType.name === disciplineType.name
      )
    ) {
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

  private async prepareParsedPairs(
    dates: [
      Prisma.Enumerable<EventWhereInput>,
      Prisma.Enumerable<EventWhereInput>,
    ],
    weeks: ParsedScheduleWeek[]
  ): Promise<[BaseGeneralParserPair[], BaseGeneralParserPair[]]> {
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

    return [
      this.filterWeekPairs(dates[0], result[0]),
      this.filterWeekPairs(dates[1], result[1]),
    ];
  }

  private filterWeekPairs(
    dates: Prisma.Enumerable<EventWhereInput>,
    pairs: BaseGeneralParserPair[]
  ) {
    return pairs.filter((pair) =>
      new Array(dates).flat().some(({ startTime }) => {
        const { gte, lte } = startTime as Prisma.DateTimeFilter;
        return gte <= pair.startTime && pair.startTime < lte;
      })
    );
  }

  private calculateEventPeriod(
    weeks: BaseGeneralParserPair[][],
    currentWeekPair: BaseGeneralParserPair,
    weekIndex: number
  ) {
    if (!currentWeekPair.isRecurring) {
      return Period.NO_PERIOD;
    }

    const otherWeekIndex = (weekIndex + 1) % 2;
    const weekOffset = otherWeekIndex ? WEEK : -WEEK;

    const otherWeekMatches = weeks[otherWeekIndex].find(
      ({ name, startTime, endTime, disciplineType }: BaseGeneralParserPair) =>
        currentWeekPair.name === name &&
        currentWeekPair.disciplineType.name === disciplineType.name &&
        currentWeekPair.startTime.getTime() + weekOffset ===
          startTime.getTime() &&
        currentWeekPair.endTime.getTime() + weekOffset === endTime.getTime()
    );

    return otherWeekMatches ? Period.EVERY_WEEK : Period.EVERY_FORTNIGHT;
  }

  private async getDatabasePairs(
    groupId: string,
    dates: EventWhereInput[]
  ): Promise<DatabasePair[]> {
    const events = await this.eventRepository.findMany({
      groupId,
      OR: dates,
      lessons: {
        some: {
          disciplineType: {
            name: {
              in: [
                EventTypeEnum.PRACTICE,
                EventTypeEnum.LECTURE,
                EventTypeEnum.LABORATORY,
              ],
            },
          },
        },
      },
      isCustom: false,
    });

    return mapAsync(events, async (event): Promise<DatabasePair> => {
      const discipline = await this.disciplineRepository.findOne({
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
        this.mapper.map(event, DbEvent, EventResponse, {
          extraArgs: () => ({ discipline }),
        });

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
        isRecurring: period !== Period.NO_PERIOD,
        eventsAmount: event.eventsAmount,
        disciplineType: {
          name: event.lessons[0]?.disciplineType.name,
          id: event.lessons[0]?.disciplineType.id,
        },
      };
    });
  }
}
