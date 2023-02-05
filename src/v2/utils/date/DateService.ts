import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { ConfigService } from '@nestjs/config';

export const DAY = 1000 * 60 * 60 * 24;
export const WEEK = DAY * 7;
export const FORTNITE = WEEK * 2;
export interface CurrentDate {
  fortnight: number,
  week: number,
  day: number,
}

@Injectable()
export class DateService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async getCurrentYearAndSemester() {
    const { currentYear, currentSemester } = this.config.get<{
      currentYear: number,
      currentSemester: number
    }>('dates');
    return {
      year : currentYear,
      semester : currentSemester,
    };
  }
  async getDateVar(name: string): Promise<Date> {
    const { date } = await this.prisma.dateVar.findUnique({
      where: {
        name,
      },
    });
    return date;
  }
  async getCurrent(): Promise<CurrentDate> {
    const { currentYear, currentSemester } = this.config.get('dates');
    const { startDate } = await this.prisma.startDate.findFirst({
      select: {
        startDate: true,
      },
      where: {
        year: currentYear,
        semester: currentSemester,
      },
    });

    const difference = new Date().getTime() - startDate.getTime();
    const fortnight = Math.ceil(difference / FORTNITE);

    let week = Math.ceil(difference / WEEK) % 2;
    if (week === 0) week = 2;

    let day = Math.ceil(difference / DAY) % 7;
    if (day === 0) day = 7;

    return { fortnight, week, day };
  }

}