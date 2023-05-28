import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { DataNotFoundException } from '../exceptions/DataNotFoundException';


export const DAY = 1000 * 60 * 60 * 24;
export const WEEK = DAY * 7;
export const FORTNITE = WEEK * 2;

export interface CurrentSemester {
  year: number,
  semester: number,
  startDate: Date,
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
  async getCurrentSemester (): Promise<CurrentSemester> {
    const semester = await this.prisma.startDate.findFirst({
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
    return semester;
  }
  async getDateVar (name: string): Promise<Date> {
    const { date } = await this.prisma.dateVar.findUnique({
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
    return  Math.ceil(difference / WEEK);
  }

  getDatesOfCurrentWeek () {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const currentDay = currentDate.getDay() ? currentDate.getDay() : 7;
    const startOfWeek = new Date(currentDate.getTime() - (currentDay-1)*DAY);
    const endOfWeek = (new Date(startOfWeek.getTime() + DAY*7));
    return { startOfWeek, endOfWeek };
  }

  async getDatesOfWeek (week) {
    const { startOfWeek, endOfWeek } = this.getDatesOfCurrentWeek();
    const currentWeek = await this.getCurrentWeek();
    const difference = week - currentWeek;
    startOfWeek.setDate(startOfWeek.getDate() + difference*7);
    endOfWeek.setDate(endOfWeek.getDate() + difference*7);
    return { startOfWeek, endOfWeek };
  }
  async isPreviousSemester (semester: number, year: number) {
    const curSemester = await this.getCurrentSemester();
    return this.earlierSemester(curSemester, { semester, year });
  }

  earlierSemester (curSem: StudyingSemester, compSem: StudyingSemester) {
    return (compSem.semester < curSem.semester && compSem.year === curSem.year) || (compSem.year < curSem.year);
  }

}