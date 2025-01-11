import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { DataNotFoundException } from '../exceptions/DataNotFoundException';
import { DataMissingException } from '../exceptions/DataMissingException';
import { DateTime } from 'luxon';

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

@Injectable()
export class DateService {
  constructor (
    private prisma: PrismaService,
  ) {}

  getSemester (period: StudyingSemester) {
    return this.prisma.semesterDate.findFirst({
      where: {
        semester: period.semester,
        year: period.year,
      },
    });
  }

  async getCurrentSemester (): Promise<CurrentSemester> {
    const semester = await this.prisma.semesterDate.findFirst({
      where: {
        startDate: {
          lte: new Date(),
        },
      },
      orderBy: {
        startDate: 'desc',
      },
    });

    if (!semester) {
      throw new DataNotFoundException();
    }
    return {
      ...semester,
      isFinished: semester.endDate < new Date(),
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

  async getDateVar (name: string): Promise<Date> {
    const { date } = await this.prisma.dateVar.findFirst({
      where: {
        name,
      },
    });
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

  async getCurrentWeek () {
    const { startDate } = await this.getCurrentSemester();
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

  async getDatesOfWeek (week: number) {
    const currentWeek = await this.getCurrentWeek();
    const difference = week - currentWeek;
    const { startOfWeek, endOfWeek } = this.getDatesOfCurrentWeek();

    return {
      startOfWeek: DateTime.fromJSDate(startOfWeek).plus({ week: difference }).toJSDate(),
      endOfWeek: DateTime.fromJSDate(endOfWeek).plus({ week: difference }).toJSDate(),
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

  checkYearAndSemester (year: number, semester: number) {
    if ((year && !semester) || (!year && semester)) {
      throw new DataMissingException();
    }
  }

  async getEventTime (pairTime: string, startOfSemester: Date, week: number, day: number) {
    const [hours, minutes] = pairTime
      .split(':')
      .map((number) => +number);
    const minutesAfterHour = 35;
    const startOfEvent = new Date(startOfSemester.getTime() + week * WEEK + (day - 1) * DAY + hours * HOUR + minutes * MINUTE);
    const endOfEvent = new Date(startOfEvent.getTime() + HOUR + minutesAfterHour * MINUTE);

    return { startOfEvent, endOfEvent };
  }

  getEventTimeRozKpi (startOfSemester: Date, week: number, day: number, time: string) {
    const [startHours, startMinutes] = time.split(':').map((s) => parseInt(s));
    const minutesAfterHour = 35;
    const startOfEvent = new Date(startOfSemester.getTime() + week * WEEK + (day - 1) * DAY + startHours * HOUR + startMinutes * MINUTE);
    const endOfEvent = new Date(startOfEvent.getTime() + HOUR + minutesAfterHour * MINUTE);
    return { startOfEvent, endOfEvent };
  }
}
