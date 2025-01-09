import { Injectable } from '@nestjs/common';
import { Parser } from './Parser';
import axios from 'axios';
import { DateService } from '../date/DateService';
import { GeneralParser } from './GeneralParser';
import { SemesterDate } from '@prisma/client';
import {
  CAMPUS_PARSER_DAY_NUMBER,
  CAMPUS_PARSER_DISCIPLINE_TYPE,
  CampusParserDay,
  CampusParserGroup,
} from './CampusParserTypes';
import {
  GroupParsedSchedule,
  ParsedSchedulePair,
  ParsedScheduleWeek,
  ScheduleWeekNumber,
} from './ScheduleParserTypes';

@Injectable()
export class CampusParser implements Parser<CampusParserGroup> {
  constructor (private dateService: DateService) {}

  async parseGroups (groupNames: string[]): Promise<CampusParserGroup[]> {
    const { data } = await axios.get(
      'https://api.campus.kpi.ua/schedule/groups'
    );

    let filtered: CampusParserGroup[] = data.data
      .filter(({ faculty }: CampusParserGroup) => faculty === 'ФІОТ')
      .map(({ id, name }: CampusParserGroup) => ({ id, name }));

    if (groupNames.length) {
      filtered = filtered.filter(({ name }: CampusParserGroup) =>
        groupNames.includes(name)
      );
    }

    return filtered;
  }

  async parseGroupSchedule (
    { id, name }: CampusParserGroup,
    semester: SemesterDate
  ): Promise<GroupParsedSchedule> {
    const { data } = await axios.get(
      'https://api.campus.kpi.ua/schedule/lessons?groupId=' + id
    );
    const { scheduleFirstWeek, scheduleSecondWeek } = data.data;

    return {
      name,
      firstWeek: this.parseWeek(semester, 0, scheduleFirstWeek),
      secondWeek: this.parseWeek(semester, 1, scheduleSecondWeek),
    };
  }

  private parseWeek (
    semester: SemesterDate,
    weekNumber: ScheduleWeekNumber,
    week: CampusParserDay[]
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
    weekNumber: ScheduleWeekNumber
  ) {
    const parsedPairs: ParsedSchedulePair[] = [];

    for (const { name, time, tag, teacherName } of pairs) {
      if (!teacherName) continue;

      const isSelective = pairs.some(
        ({ name: nameSome, time: timeSome }) =>
          name !== nameSome && time === timeSome
      );

      const { startOfEvent: startTime, endOfEvent: endTime } =
        this.dateService.getParserEventTime(
          startDate,
          weekNumber,
          CAMPUS_PARSER_DAY_NUMBER[day],
          time
        );

      parsedPairs.push({
        name,
        isSelective,
        startTime,
        endTime,
        teachers: [GeneralParser.parseTeacherName(teacherName)],
        disciplineType: {
          name: CAMPUS_PARSER_DISCIPLINE_TYPE[tag],
        },
      });
    }

    return parsedPairs;
  }
}
