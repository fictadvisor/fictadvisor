import { Injectable } from '@nestjs/common';
import { DateService } from '../../utils/date/DateService';
import { EventRepository } from '../../database/repositories/EventRepository';
import { DbEvent } from '../../database/entities/DbEvent';
import { Period, DisciplineTypeEnum } from '@prisma/client';
import { RozParser } from '../../utils/parser/RozParser';
import { ScheduleParser } from '../../utils/parser/ScheduleParser';


@Injectable()
export class ScheduleService {

  constructor (
    private dateService: DateService,
    private eventRepository: EventRepository,
    private rozParser: RozParser,
    private scheduleParser: ScheduleParser,
  ) {}

  async parse (parserType, page, period) {
    switch (parserType) {
    case 'rozkpi':
      await this.rozParser.parse(page, period);
      break;
    case 'schedule':
      await this.scheduleParser.parse(period);
      break;
    }
  }

  async getSchedule (group, fortnight, callback) {
    // TODO: implement method that returns all lessons (static or temporary) depending on
    //       group id and fortnight number (see body in Wiki)
  }

  async getFullStaticLesson (id, fortnight) {
    // TODO: add method that returns full static lesson depending on lesson id and fortnight number (see Wiki)
  }

  async getFullTemporaryLesson (id) {
    // TODO: add method that returns full temporary lesson depending on lesson id and fortnight number (see Wiki)
  }

  async updateFortnightInfo (id, fortnight, data) {
    // TODO: create method that updates fortnight lesson info dpending on lesson id and fortnight number (see Wiki)
  }

  async updateSemesterInfo (id, body) {
    // TODO: create method that updates semester lesson info dpending on lesson id (see Wiki)
  }

  async createLesson (lesson) {
    // TODO: implement method that creates temporary or semester lesson and returns it
  }

  getIndexOfLesson (period, startTime, endOfWeek) {
    const difference = endOfWeek.getTime() - startTime.getTime();
    let index = difference / (1000 * 60 * 60 * 24 * 7);
    if (period === Period.EVERY_FORTNIGHT) index /= 2;

    if (index % 1 <= 0.5) {
      return +parseInt(String(index));
    } else {
      return null;
    }
  }

  async getGeneralGroupEvents (id, week) {
    const { startOfWeek, endOfWeek } = week ? await this.dateService.getDatesOfWeek(week) : this.dateService.getDatesOfCurrentWeek();
    const events = await this.eventRepository.findMany({
      where: {
        groupId: id,
        endTime: {
          gte: startOfWeek,
        },
        startTime: {
          lte: endOfWeek,
        },
        lessons: {
          some: {
            disciplineType: {
              name: {
                in: [DisciplineTypeEnum.PRACTICE, DisciplineTypeEnum.LECTURE, DisciplineTypeEnum.LABORATORY],
              },
            },
          },
        },
      },
    }) as unknown as DbEvent[];

    return events
      .filter((event) => {
        const indexOfLesson = this.getIndexOfLesson(event.period, event.startTime, endOfWeek);
        return indexOfLesson !== null;
      });
  }
}
