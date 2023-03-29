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
}