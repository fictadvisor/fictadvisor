import { Injectable } from '@nestjs/common';
import { DateService, FORTNITE, WEEK } from '../date/DateService';
import { EventRepository } from '../../database/repositories/EventRepository';
import { Period } from '@prisma/client';
import { weeksPerEvent } from '../../api/services/ScheduleService';
import { DateUtils } from '../date/DateUtils';
import { SchedulePairType } from './ScheduleParserTypes';
import { TeacherRepository } from '../../database/repositories/TeacherRepository';

@Injectable()
export class GeneralParser {
  constructor (
    private eventRepository: EventRepository,
    private teacherRepository: TeacherRepository,
    private dateService: DateService,
    private dateUtils: DateUtils,
  ) {}

  async findEvent (startOfEvent: Date, groupId: string, disciplineTypeId: string) {
    return this.eventRepository.find({
      OR: [
        {
          startTime: startOfEvent,
          groupId: groupId,
          lessons: {
            some: {
              disciplineTypeId,
            },
          },
        },
        {
          startTime: new Date(startOfEvent.getTime() - WEEK),
          groupId: groupId,
          lessons: {
            some: {
              disciplineTypeId,
            },
          },
        },
      ],
    });
  }

  async getEventsAmount (period: Period) {
    const { startDate, endDate } = await this.dateService.getCurrentSemester();
    const lastWeek = this.dateUtils.getCeiledDifference(startDate, new Date(endDate.getTime() - FORTNITE), WEEK);
    return lastWeek / weeksPerEvent[period];
  }

  async createEvent (
    name: string,
    startOfEvent: Date,
    endOfEvent: Date,
    groupId: string,
    disciplineTypeId: string,
    period: Period,
  ) {
    await this.eventRepository.create({
      name,
      startTime: startOfEvent,
      endTime: endOfEvent,
      period,
      eventsAmount: await this.getEventsAmount(period),
      groupId: groupId,
      lessons: {
        create: {
          disciplineTypeId,
        },
      },
    });
  }

  async updateEventPeriod (period: Period, eventId: string) {
    await this.eventRepository.updateById(eventId, {
      period,
      eventsAmount: await this.getEventsAmount(period),
    });
  }

  async handleEvent (pair: SchedulePairType, startOfEvent: Date, endOfEvent: Date, groupId: string, disciplineTypeId: string) {
    const event = await this.findEvent(startOfEvent, groupId, disciplineTypeId);

    if (!event) {
      await this.createEvent(pair.name, startOfEvent, endOfEvent, groupId, disciplineTypeId, Period.EVERY_FORTNIGHT);
    } else if (
      event.startTime.getTime() === startOfEvent.getTime() - WEEK &&
      event.period === Period.EVERY_FORTNIGHT
    ) {
      await this.updateEventPeriod(Period.EVERY_WEEK, event.id);
    }
  }

  async getTeacherFullInitials (lastName: string, firstName: string, middleName: string) {
    if (firstName.length <= 1 || middleName.length <= 1) {
      const teachers = await this.teacherRepository.findMany({
        where: { lastName, firstName: { startsWith: firstName }, middleName: { startsWith: middleName } },
      });

      if (teachers.length === 1) return teachers[0];
    }

    return await this.teacherRepository.getOrCreate({
      lastName,
      firstName,
      middleName,
    });
  }
}