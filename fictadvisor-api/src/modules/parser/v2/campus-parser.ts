import { Injectable } from '@nestjs/common';
import { Parser } from './interfaces/parser.interface';
import axios from 'axios';
import { DateService, HOUR, MINUTE } from '../../date/v2/date.service';
import { GeneralParser } from './general-parser';
import { SemesterDate } from '@prisma-client/fictadvisor';
import { DateTime } from 'luxon';
import { CAMPUS_PARSER_DAY_NUMBER, CAMPUS_PARSER_DISCIPLINE_TYPE } from './constants/campus.constants';
import { CampusParserDay, CampusParserGroup } from './types/campus-parser.types';
import {
  GroupParsedSchedule,
  ParsedSchedulePair,
  ParsedScheduleWeek,
  ScheduleWeekNumber,
} from './types/schedule-parser.types';

@Injectable()
export class CampusParser implements Parser<CampusParserGroup> {
  constructor (private dateService: DateService) {}

  async parseGroups (groupNames: string[] = []): Promise<CampusParserGroup[]> {
    const { data } = await axios.get(
      'https://api.campus.kpi.ua/schedule/groups'
    );

    let filtered: CampusParserGroup[] = data
      .filter(({ faculty }: CampusParserGroup) => faculty === 'ФІОТ')
      .map(({ id, name }: CampusParserGroup) => ({ id, name }));

    if (groupNames.length) {
      filtered = filtered.filter(({ name }: CampusParserGroup) =>
        groupNames.includes(name),
      );
    }

    return filtered;
  }

  async parseGroupSchedule (
    { id, name }: CampusParserGroup,
    semester: SemesterDate,
  ): Promise<GroupParsedSchedule> {
    const { data } = await axios.get(
      'https://api.campus.kpi.ua/schedule/lessons?groupId=' + id,
    );
    const { scheduleFirstWeek, scheduleSecondWeek } = data;

    return {
      name,
      firstWeek: this.parseWeek(semester, 0, scheduleFirstWeek),
      secondWeek: this.parseWeek(semester, 1, scheduleSecondWeek),
    };
  }

  private parseWeek (
    semester: SemesterDate,
    weekNumber: ScheduleWeekNumber,
    week: CampusParserDay[],
  ) {
    const weekPairs = new ParsedScheduleWeek(weekNumber);

    for (const day of week) {
      weekPairs.pairs.push(...this.parseDay(semester, day, weekNumber));
    }

    return weekPairs;
  }

  private parseDay (
    { startDate }: SemesterDate,
    { day, pairs }: CampusParserDay,
    weekNumber: ScheduleWeekNumber,
  ) {
    const parsedPairs: ParsedSchedulePair[] = [];

    for (const { name, time, tag, lecturer: { name: teacherName }, dates } of pairs) {
      const isSelective = pairs.some(
        ({ name: nameSome, time: timeSome }) =>
          name !== nameSome && time === timeSome,
      );

      const { startOfEvent, endOfEvent } =
        this.dateService.getParserEventTime(
          startDate,
          weekNumber,
          CAMPUS_PARSER_DAY_NUMBER[day],
          time,
        );

      const startTimeEvent = DateTime.fromJSDate(startOfEvent)
        .setZone('Europe/Kyiv', { keepLocalTime: true })
        .toJSDate();

      const endTimeEvent = DateTime.fromJSDate(endOfEvent)
        .setZone('Europe/Kyiv', { keepLocalTime: true })
        .toJSDate();

      const pairInfo: Omit<
        ParsedSchedulePair,
        'startTime' | 'endTime' | 'isRecurring'
      > = {
        name,
        isSelective,
        teachers: GeneralParser.parseTeacherNames(teacherName),
        disciplineType: {
          name: CAMPUS_PARSER_DISCIPLINE_TYPE[tag],
        },
      };

      if (dates.length > 0) {
        for (const date of dates) {
          const { startTime, endTime } = this.mapDate(date, time);

          parsedPairs.push({
            ...pairInfo,
            isRecurring: false,
            startTime,
            endTime,
          });
        }
      } else {
        parsedPairs.push({
          ...pairInfo,
          isRecurring: true,
          startTime: startTimeEvent,
          endTime: endTimeEvent,
        });
      }
    }

    return this.aggregateParsedPairTeachers(parsedPairs);
  }

  private mapDate (dateString: string, time: string) {
    const [hours, minutes] = time.split(':').map((number) => +number);
    const parsedDate = new Date(dateString);

    const startTime = DateTime.fromObject(
      {
        year: parsedDate.getFullYear(),
        month: parsedDate.getMonth() + 1,
        day: parsedDate.getDate(),
        hour: hours,
        minute: minutes,
      },
      { zone: 'Europe/Kyiv' },
    ).toJSDate();

    const minutesAfterHour = 35;
    const endTime = new Date(
      startTime.getTime() + HOUR + minutesAfterHour * MINUTE,
    );

    return { startTime, endTime };
  }

  private aggregateParsedPairTeachers (dayPairs: ParsedSchedulePair[]) {
    const result: ParsedSchedulePair[] = [];

    for (const dayPair of dayPairs) {
      const samePairIndex = result.findIndex(({ name, disciplineType, startTime, endTime }) =>
        name === dayPair.name &&
        disciplineType.name === dayPair.disciplineType.name &&
        startTime.getTime() === dayPair.startTime.getTime() &&
        endTime.getTime() === dayPair.endTime.getTime(),
      );

      if (samePairIndex === -1) {
        result.push(dayPair);
      } else {
        result[samePairIndex].teachers.push(...dayPair.teachers);
      }
    }

    return result;
  }
}
