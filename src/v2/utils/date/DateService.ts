import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { DataNotFoundException } from '../exceptions/DataNotFoundException';

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

  async getPreviousSemesters (isLastFinished?: boolean) {
    const { semesters, isFinished } = await this.getAllPreviousSemesters();
    if (isFinished === isLastFinished || isLastFinished === undefined) return semesters;
    return semesters.slice(1);
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
    const { startDate }  = await this.getCurrentSemester();

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
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const currentDay = currentDate.getDay() ? currentDate.getDay() : 7;
    const startOfWeek = new Date(currentDate.getTime() - (currentDay - 1) * DAY);
    const endOfWeek = new Date(startOfWeek.getTime() + DAY * 7);
    return { startOfWeek, endOfWeek };
  }

  async getDatesOfWeek (week) {
    const { startOfWeek, endOfWeek } = this.getDatesOfCurrentWeek();
    const currentWeek = await this.getCurrentWeek();
    const difference = week - currentWeek;
    startOfWeek.setDate(startOfWeek.getDate() + difference * 7);
    endOfWeek.setDate(endOfWeek.getDate() + difference * 7);
    return { startOfWeek, endOfWeek };
  }

  async isPreviousSemesterToCurrent (semester: number, year: number) {
    const curSemester = await this.getCurrentSemester();

    return this.isPreviousSemester(curSemester, { semester, year });
  }

  isPreviousSemester (curSem: CurrentSemester, compSem: StudyingSemester) {
    const cur = curSem.year + (curSem.semester - 1)/2;
    const comp = compSem.year + (compSem.semester - 1)/2;
    return curSem.isFinished ? comp <= cur : comp < cur;
  }

  getPreviousSemester (semester, year) {
    return semester === 1
      ? { semester: 2, year: year - 1 }
      : { semester: 1, year };
  }
}
