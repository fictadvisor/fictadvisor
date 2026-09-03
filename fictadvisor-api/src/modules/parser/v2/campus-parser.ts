import { Injectable } from '@nestjs/common';
import { Parser } from './interfaces/parser.interface';
import axios from 'axios';
import { DateService, HOUR, MINUTE } from '../../date/v2/date.service';
import { GeneralParser } from './general-parser';
import { SemesterDate } from '@prisma-client/fictadvisor';
import { DateTime } from 'luxon';
import { CAMPUS_PARSER_DAY_NUMBER, CAMPUS_PARSER_DISCIPLINE_TYPE } from './constants/campus.constants';
import {
  CampusParserDay,
  CampusParserGroup,
  CampusParserLecturerProfile,
} from './types/campus-parser.types';
import {
  GroupParsedSchedule,
  ParsedSchedulePair,
  ParsedScheduleWeek,
  ScheduleWeekNumber,
} from './types/schedule-parser.types';

@Injectable()
export class CampusParser implements Parser<CampusParserGroup> {
  // lecturerId -> whether campus links that record to a real staff profile.
  // Filled lazily during a parse run and dropped when the next one starts.
  private lecturerProfiles = new Map<string, boolean>();

  constructor (private dateService: DateService) {}

  async parseGroups (groupNames: string[] = []): Promise<CampusParserGroup[]> {
    this.lecturerProfiles.clear();

    const { data } = await axios.get(
      'https://api.campus.kpi.ua/schedule/groups',
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

    const skippedLecturerIds = await this.getSkippedLecturerIds([
      ...scheduleFirstWeek,
      ...scheduleSecondWeek,
    ]);

    return {
      name,
      firstWeek: this.parseWeek(semester, 0, scheduleFirstWeek, skippedLecturerIds),
      secondWeek: this.parseWeek(semester, 1, scheduleSecondWeek, skippedLecturerIds),
    };
  }

  // Campus lets a department type anything into the lecturer field, so the feed
  // carries entries like "вакансія", "Кондратенко" or "025 - ФІОТ" next to real
  // teachers. A full name is always three words; a shorter or longer one is only
  // trusted when campus itself links that lecturer record to a staff profile.
  private static isFullName (name: string) {
    return name.trim().split(/\s+/).length === 3;
  }

  private async getSkippedLecturerIds (days: CampusParserDay[]) {
    const suspicious = new Set<string>();

    for (const { pairs } of days) {
      for (const { lecturer } of pairs) {
        if (lecturer && !CampusParser.isFullName(lecturer.name)) {
          suspicious.add(lecturer.id);
        }
      }
    }

    const skipped = new Set<string>();

    for (const lecturerId of suspicious) {
      if (!(await this.hasStaffProfile(lecturerId))) {
        skipped.add(lecturerId);
      }
    }

    return skipped;
  }

  private async hasStaffProfile (lecturerId: string) {
    const cached = this.lecturerProfiles.get(lecturerId);
    if (cached !== undefined) return cached;

    let hasProfile: boolean;

    try {
      const { data } = await axios.get<CampusParserLecturerProfile>(
        'https://api.campus.kpi.ua/schedule/lecturer?lecturerId=' + lecturerId,
      );
      hasProfile = data.profile != null;
    } catch {
      // Campus did not answer: keep the suspicious name out until a run can
      // actually confirm the profile behind it.
      hasProfile = false;
    }

    this.lecturerProfiles.set(lecturerId, hasProfile);

    return hasProfile;
  }

  private parseWeek (
    semester: SemesterDate,
    weekNumber: ScheduleWeekNumber,
    week: CampusParserDay[],
    skippedLecturerIds: Set<string>,
  ) {
    const weekPairs = new ParsedScheduleWeek(weekNumber);

    for (const day of week) {
      weekPairs.pairs.push(
        ...this.parseDay(semester, day, weekNumber, skippedLecturerIds),
      );
    }

    return weekPairs;
  }

  private parseDay (
    { startDate }: SemesterDate,
    { day, pairs }: CampusParserDay,
    weekNumber: ScheduleWeekNumber,
    skippedLecturerIds: Set<string>,
  ) {
    const parsedPairs: ParsedSchedulePair[] = [];

    for (const pair of pairs) {
      const {
        name,
        time,
        tag,
        lecturer,
        dates,
      } = pair;

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

      const teacherName =
        lecturer && !skippedLecturerIds.has(lecturer.id) ? lecturer.name : '';
      const parsedTeacherName = GeneralParser.parseTeacherName(teacherName);

      const pairInfo: Omit<
        ParsedSchedulePair,
        'startTime' | 'endTime' | 'isRecurring'
      > = {
        name,
        isSelective,
        teachers: parsedTeacherName ? [parsedTeacherName] : [],
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
