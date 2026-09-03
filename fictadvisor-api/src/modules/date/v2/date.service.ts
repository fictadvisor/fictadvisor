import { Injectable } from '@nestjs/common';
import { SemesterDate } from '@prisma-client/fictadvisor';
import { PrismaService } from '../../../database/v2/prisma.service';
import { DataNotFoundException } from '../../../common/exceptions/data-not-found.exception';
import { DataMissingException } from '../../../common/exceptions/data-missing.exception';
import { DateTime } from 'luxon';
import {
  CreateSemesterDateDTO,
  UpdatePollDatesDTO,
  UpdateSemesterDateDTO,
} from '@fictadvisor/utils/requests';
import { AlreadyExistException } from '../../../common/exceptions/already-exist.exception';
import { InvalidDateException } from '../../../common/exceptions/invalid-date.exception';
import { ScheduleDayNumber } from '../../parser/v2/types/schedule-parser.types';

export const MINUTE = 1000 * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;
export const WEEK = DAY * 7;
export const FORTNITE = WEEK * 2;

export interface CurrentSemester {
  year: number,
  semester: number,
  startDate: Date,
  endDate: Date,
  isFinished: boolean,
}

export interface StudyingSemester {
  year: number,
  semester: number,
}

export interface CurrentDay {
  fortnight: number,
  week: number,
  day: number,
}

// During a break (the current semester is already finished and the next one
// hasn't started) endDate is in the past, so cache the row for at least this
// long instead — otherwise the cache would expire on every read and the
// redundant lookups would come back. Bounded so a newly-started semester is
// picked up soon after its startDate.
const FINISHED_SEMESTER_CACHE_TTL = 10 * MINUTE;

@Injectable()
export class DateService {
  private currentSemesterCache: { row: SemesterDate; expires: number } | null =
    null;

  constructor (private prisma: PrismaService) {}

  /** Returns null when the semester has no row — `getSemester` throws instead. */
  async findSemester (period: StudyingSemester) {
    return this.prisma.semesterDate.findUnique({
      where: {
        year_semester: period,
      },
    });
  }

  async getSemester (period: StudyingSemester) {
    const semester = await this.findSemester(period);

    if (!semester) {
      throw new DataNotFoundException();
    }

    return semester;
  }

  async getCurrentSemester (): Promise<CurrentSemester> {
    const now = new Date();

    let semester =
      this.currentSemesterCache &&
      this.currentSemesterCache.expires > now.getTime() &&
      this.currentSemesterCache.row.startDate <= now
        ? this.currentSemesterCache.row
        : null;

    if (!semester) {
      semester = await this.prisma.semesterDate.findFirst({
        where: {
          startDate: {
            lte: now,
          },
        },
        orderBy: {
          startDate: 'desc',
        },
      });

      if (!semester) {
        throw new DataNotFoundException();
      }

      this.currentSemesterCache = {
        row: semester,
        // Valid for the whole active semester; once it has ended, fall back to
        // a bounded TTL so we keep caching through the break yet still pick up
        // the next semester shortly after it starts.
        expires: Math.max(
          semester.endDate.getTime() + 1000,
          now.getTime() + FINISHED_SEMESTER_CACHE_TTL,
        ),
      };
    }

    return {
      ...semester,
      isFinished: semester.endDate < now,
    };
  }

  async getAllPreviousSemesters () {
    const semesters = await this.prisma.semesterDate.findMany({
      where: {
        startDate: {
          lte: new Date(),
        },
      },
      orderBy: {
        startDate: 'desc',
      },
    });

    const isFinished = semesters[0].endDate < new Date();

    return {
      isFinished,
      semesters,
    };
  }

  async getYears (): Promise<number[]> {
    const set = new Set<number>();
    const { semesters } = await this.getAllPreviousSemesters();
    for (const semester of semesters) {
      set.add(semester.year);
    }
    return Array.from(set);
  }

  async getPreviousSemesters (isLastFinished: boolean) {
    const { semesters, isFinished } = await this.getAllPreviousSemesters();
    if (isFinished === isLastFinished || isFinished) return { semesters };
    return { semesters: semesters.slice(1) };
  }

  /** Every semester ever configured, including ones that have not started. */
  async getAllSemesters () {
    return this.prisma.semesterDate.findMany({
      orderBy: [
        { year: 'desc' },
        { semester: 'desc' },
      ],
    });
  }

  async createSemester (data: CreateSemesterDateDTO) {
    DateService.checkOrder(data.startDate, data.endDate);

    const { year, semester } = data;
    if (await this.findSemester({ year, semester })) {
      throw new AlreadyExistException('Semester');
    }

    const created = await this.prisma.semesterDate.create({ data });
    this.currentSemesterCache = null;

    return created;
  }

  async updateSemester (period: StudyingSemester, data: UpdateSemesterDateDTO) {
    const semester = await this.getSemester(period);

    DateService.checkOrder(
      data.startDate ?? semester.startDate,
      data.endDate ?? semester.endDate,
    );

    const updated = await this.prisma.semesterDate.update({
      where: { year_semester: period },
      data,
    });
    // The cached row may be the one that just moved, and a stale copy would
    // keep the whole API on the wrong semester until the TTL runs out.
    this.currentSemesterCache = null;

    return updated;
  }

  async deleteSemester (period: StudyingSemester) {
    await this.getSemester(period);

    await this.prisma.semesterDate.delete({
      where: { year_semester: period },
    });
    this.currentSemesterCache = null;
  }

  // The poll of a semester is bounded by two named date variables rather than
  // by columns of its own, so they are read and written as a pair.
  static getPollDateNames (period: StudyingSemester) {
    return {
      start: `START_POLL_${period.year}_${period.semester}`,
      end: `END_POLL_${period.year}_${period.semester}`,
    };
  }

  async getPollDates () {
    const semesters = await this.getAllSemesters();
    const names = semesters.flatMap((period) => {
      const { start, end } = DateService.getPollDateNames(period);
      return [start, end];
    });

    const dateVars = await this.prisma.dateVar.findMany({
      where: { name: { in: names } },
    });
    const dateByName = new Map(dateVars.map(({ name, date }) => [name, date]));

    return semesters.map(({ year, semester }) => {
      const { start, end } = DateService.getPollDateNames({ year, semester });
      return {
        year,
        semester,
        startPoll: dateByName.get(start) ?? null,
        endPoll: dateByName.get(end) ?? null,
      };
    });
  }

  async setPollDates (period: StudyingSemester, { startPoll, endPoll }: UpdatePollDatesDTO) {
    await this.getSemester(period);
    DateService.checkOrder(startPoll, endPoll);

    const { start, end } = DateService.getPollDateNames(period);

    for (const [name, date] of [[start, startPoll], [end, endPoll]] as [string, Date][]) {
      await this.prisma.dateVar.upsert({
        where: { name },
        update: { date },
        create: { name, date },
      });
    }

    return {
      ...period,
      startPoll,
      endPoll,
    };
  }

  async deletePollDates (period: StudyingSemester) {
    const { start, end } = DateService.getPollDateNames(period);

    const { count } = await this.prisma.dateVar.deleteMany({
      where: { name: { in: [start, end] } },
    });

    // Nothing to delete means the semester never had borders — the panel lists
    // only the ones that do, so this is a stale view rather than a no-op.
    if (!count) throw new DataNotFoundException();
  }

  private static checkOrder (from: Date, to: Date) {
    if (from.getTime() >= to.getTime()) throw new InvalidDateException();
  }

  async getDateVar (name: string): Promise<Date> {
    const { date } = (await this.prisma.dateVar.findFirst({
      where: {
        name,
      },
    }))!;
    return date;
  }

  async getCurrentDay (): Promise<CurrentDay> {
    const { startDate } = await this.getCurrentSemester();

    const difference = new Date().getTime() - startDate.getTime();
    const fortnight = Math.ceil(difference / FORTNITE);

    let week = Math.ceil(difference / WEEK) % 2;
    if (week === 0) week = 2;

    let day = new Date().getDay();
    if (day === 0) day = 7;

    return { fortnight, week, day };
  }

  async getCurrentWeek (semester?: StudyingSemester) {
    const { startDate } = (
      semester
        ? await this.getSemester(semester)
        : await this.getCurrentSemester()
    )!;

    const difference = new Date().getTime() - startDate.getTime();
    return Math.ceil(difference / WEEK);
  }

  getDatesOfCurrentWeek () {
    const currentDate = DateTime.now();

    return {
      startOfWeek: currentDate.startOf('week').toJSDate(),
      endOfWeek: currentDate.endOf('week').toJSDate(),
    };
  }

  async getDatesOfWeek (week: number, semester?: StudyingSemester) {
    const currentWeek = await this.getCurrentWeek(semester);
    const difference = week - currentWeek;
    const { startOfWeek, endOfWeek } = this.getDatesOfCurrentWeek();

    return {
      startOfWeek: DateTime.fromJSDate(startOfWeek)
        .plus({ week: difference })
        .toJSDate(),
      endOfWeek: DateTime.fromJSDate(endOfWeek)
        .plus({ week: difference })
        .toJSDate(),
    };
  }

  async isPreviousSemesterToCurrent (semester: number, year: number) {
    const curSemester = await this.getCurrentSemester();

    return this.isPreviousSemester(curSemester, { semester, year });
  }

  isPreviousSemester (curSem: CurrentSemester, compSem: StudyingSemester) {
    const cur = curSem.year + (curSem.semester - 1) / 2;
    const comp = compSem.year + (compSem.semester - 1) / 2;
    return curSem.isFinished ? comp <= cur : comp < cur;
  }

  getPreviousSemester (semester: number, year: number) {
    return semester === 1
      ? { semester: 2, year: year - 1 }
      : { semester: 1, year };
  }

  async getSpecificDayInWeek (week: number, dayOfWeek: number) {
    const { startOfWeek } = await this.getDatesOfWeek(week);
    const day = DateTime.fromJSDate(startOfWeek).plus({ days: dayOfWeek - 1 });

    return {
      startOfDay: day.startOf('day').toJSDate(),
      endOfDay: day.endOf('day').toJSDate(),
    };
  }

  checkYearAndSemester (year?: number, semester?: number) {
    if ((year && !semester) || (!year && semester)) {
      throw new DataMissingException();
    }
  }

  getWeekDates (semesterStartDate: Date, week: number) {
    const startOfWeek = DateTime.fromJSDate(semesterStartDate).startOf('week');

    const endOfWeek = DateTime.fromJSDate(semesterStartDate).endOf('week');

    return {
      startOfWeek: startOfWeek.plus({ week: week - 1 }).toJSDate(),
      endOfWeek: endOfWeek.plus({ week: week - 1 }).toJSDate(),
    };
  }

  getParserEventTime (
    startOfSemester: Date,
    week: number,
    day: ScheduleDayNumber,
    time: string,
  ) {
    const [hours, minutes] = time.split(':').map((number) => +number);
    const minutesAfterHour = 35;
    const startOfEvent = new Date(
      startOfSemester.getTime() +
        week * WEEK +
        (day - 1) * DAY +
        hours * HOUR +
        minutes * MINUTE,
    );
    const endOfEvent = new Date(
      startOfEvent.getTime() + HOUR + minutesAfterHour * MINUTE,
    );

    return { startOfEvent, endOfEvent };
  }
}
