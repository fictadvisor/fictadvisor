import { Injectable } from '@nestjs/common';
import { EventWhereInput } from 'prisma';
import { EventTypeEnum, Period } from '@fictadvisor/utils/enums';
import { GoogleConfigService } from '../../config/GoogleConfigService';
import { GoogleAuthService } from './GoogleAuthService';
import { GoogleCalendarAPI, KYIV_TIMEZONE } from '../apis/GoogleCalendarAPI';
import { NoGoogleGrantException } from '../../utils/exceptions/NoGoogleGrantException';
import { GoogleUserRepository } from '../../database/repositories/GoogleUserRepository';
import { EventRepository } from '../../database/repositories/EventRepository';
import { DateService } from '../../utils/date/DateService';
import { GoogleNotLinkedException } from '../../utils/exceptions/GoogleNotLinkedException';
import { UserRepository } from '../../database/repositories/UserRepository';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { DbEvent } from '../../database/entities/DbEvent';
import { CreateGoogleEventDTO } from '../types/calendar/CreateGoogleEventDTO';
import { EventInstancesResponse } from '../types/calendar/EventInstancesResponse';


const EventColorAdapter: Record<EventTypeEnum, string> = {
  [EventTypeEnum.LECTURE]: '9',
  [EventTypeEnum.PRACTICE]: '6',
  [EventTypeEnum.LABORATORY]: '2',
  [EventTypeEnum.CONSULTATION]: '10',
  [EventTypeEnum.EXAM]: '3',
  [EventTypeEnum.WORKOUT]: '4',
  [EventTypeEnum.OTHER]: '8',
};


@Injectable()
export class GoogleCalendarService {
  constructor (
    private config: GoogleConfigService,
    private googleAuthService: GoogleAuthService,
    private dateService: DateService,
    private calendarAPI: GoogleCalendarAPI,
    private googleUserRepository: GoogleUserRepository,
    private eventRepository: EventRepository,
    private userRepository: UserRepository,
  ) {}

  async checkUserCalendar(googleId: string): Promise<boolean> {
    if (!googleId)
      throw new GoogleNotLinkedException();

    const accessToken = await this.googleAuthService.getAccessToken(googleId);
    if (!accessToken || !(await this.googleAuthService.hasCalendarPermissions(accessToken)))
      throw new NoGoogleGrantException();

    const { calendarId } = await this.googleUserRepository.findById(googleId);
    if (!calendarId) {
      return false;
    }

    try {
      await this.calendarAPI.getCalendarFromUserList(calendarId, accessToken);
    } catch (e) {
      await this.googleUserRepository.updateById(googleId, {
        calendarId: null,
      });
      await this.deleteCalendar(calendarId, accessToken);

      return false;
    }

    return true;
  }

  private async deleteCalendar(calendarId: string, accessToken: string): Promise<void> {
    try {
      await this.calendarAPI.deleteCalendar(calendarId, accessToken);
    } catch (e) {}
  }

  async moveCalendar(userId: string, calendarName?: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user)
      throw new InvalidEntityIdException('User');

    if (!user.googleId)
      throw new GoogleNotLinkedException();

    const accessToken = await this.googleAuthService.getAccessToken(user.googleId);
    if (!accessToken || !(await this.googleAuthService.hasCalendarPermissions(accessToken)))
      throw new NoGoogleGrantException();

    const { calendarId: previosCalendarId } = await this.googleUserRepository.findById(user.googleId);
    if (previosCalendarId) {
      await this.deleteCalendar(previosCalendarId, accessToken);
    }

    calendarName = calendarName ?? 'FICE Advisor';
    const { id: calendarId } = await this.calendarAPI.createCalendar(calendarName, accessToken);

    const { startDate, endDate } = await this.dateService.getCurrentSemester();

    const studentFilter: EventWhereInput = {
      group: {
        students: {
          some: { userId },
        },
      },
    };
    const dateFilter: EventWhereInput = {
      startTime: {
        gte: startDate,
        lt: endDate,
      },
    };
    const selectiveFilter: EventWhereInput = {
      OR: [
        {
          lessons: {
            some: {
              disciplineType: {
                discipline: {
                  OR: [
                    {
                      isSelective: false,
                    },
                    {
                      isSelective: true,
                      selectiveDisciplines: {
                        some: {
                          studentId: userId,
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          lessons: {
            none: {},
          }
        }
      ]
    };

    const events: DbEvent[] = await this.eventRepository.findMany({
      where: {
        ...studentFilter,
        ...dateFilter,
        ...selectiveFilter,
      }
    });

    for (const event of events) {
      const googleEvent = this.getGoogleEvent(event, endDate);
      const createdEvent = await this.calendarAPI.createEvent(calendarId, googleEvent, accessToken);

      if (event.period !== Period.NO_PERIOD) {
        let eventInstances: EventInstancesResponse = null;
        for (const eventInfo of event.eventInfo) {
          if (eventInfo.description) {
            if (!eventInstances) {
              eventInstances = await this.calendarAPI.getEventInstances(calendarId, createdEvent.id, accessToken);
            }
            const index = eventInfo.number - 1;
            const eventInstance = eventInstances.items[index];
            eventInstance.description = this.getTextDescription(eventInfo.description);
            if (event.url) {
              eventInstance.description += `\n${this.getUrlDescription(event.url)}`;
            }
            await this.calendarAPI.updateEvent(calendarId, eventInstance.id, eventInstance, accessToken);
          }
        }
      }
    }

    await this.googleUserRepository.updateById(user.googleId, { calendarId });
  }


  private getGoogleEvent(event: DbEvent, semesterEnd: Date): CreateGoogleEventDTO {
    const eventType= event.lessons[0]?.disciplineType.name as EventTypeEnum ?? EventTypeEnum.OTHER;
    const googleEvent: CreateGoogleEventDTO = {
      id: this.uuidToB32(event.id),
      summary: event.name,
      start: {
        dateTime: event.startTime.toISOString(),
        timeZone: KYIV_TIMEZONE,
      },
      end: {
        dateTime: event.endTime.toISOString(),
        timeZone: KYIV_TIMEZONE,
      },
      colorId: EventColorAdapter[eventType],
    }

    if (event.url) {
      googleEvent.description = this.getUrlDescription(event.url);
    }

    if (event.period !== Period.NO_PERIOD) {
      googleEvent.recurrence = [ this.getRecurrenceRule(event, semesterEnd) ];
    }

    return googleEvent;
  }

  private getRecurrenceRule(event: DbEvent, endDate: Date): string {
    const days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    const recurrenceParams = {
      'FREQ': 'WEEKLY',
      'UNTIL': this.toRfcDateString(endDate),
      'BYDAY': days[event.startTime.getDay()],
      'WKST': 'MO',
    };
    if (event.period == Period.EVERY_FORTNIGHT) {
      recurrenceParams['INTERVAL'] = '2';
    }

    const rule = Object.entries(recurrenceParams).map(([key, value]) => {
      return `${key}=${value}`;
    }).join(';');

    return `RRULE:${rule}`;
  }

  private toRfcDateString(date: Date): string {
    const iso = date.toISOString();

    return iso
      .replace(/-/g, '')
      .replace(/:/g, '')
      .split('.')[0]
      + 'Z';
  }

  private getTextDescription(text: string): string {
    return `<b>Опис:</b>\n${text}`;
  }

  private getUrlDescription(url: string): string {
    return `<b>Посилання:</b>\n${url}`;
  }

  // Google policy for custom ids  ¯\_(ツ)_/¯

  private uuidToB32(uuid: string): string {
    return uuid.split('-').join('v');
  }

  private b32ToUUID(b32: string): string {
    return b32.split('v').join('-');
  }
}
