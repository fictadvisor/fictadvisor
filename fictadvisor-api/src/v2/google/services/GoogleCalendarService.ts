import { Injectable } from '@nestjs/common';
import { EventWhereInput, StudentWhereInput } from 'prisma';
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
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';


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
    private disciplineRepository: DisciplineRepository,
  ) {}

  async checkUserCalendar (googleId: string): Promise<boolean> {
    if (!googleId)
      throw new GoogleNotLinkedException();

    const accessToken = await this.googleAuthService.getAccessToken(googleId);
    if (!accessToken || !(await this.googleAuthService.hasCalendarPermissions(accessToken)))
      throw new NoGoogleGrantException();

    const { calendarId } = await this.googleUserRepository.findById(googleId);
    if (!calendarId) {
      return false;
    }

    return await this.hasCalendar(googleId, calendarId, accessToken);
  }

  private async hasCalendar (googleId: string, calendarId: string, accessToken: string): Promise<boolean> {
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

  private async deleteCalendar (calendarId: string, accessToken: string): Promise<void> {
    try {
      await this.calendarAPI.deleteCalendar(calendarId, accessToken);
    } catch (e) {}
  }

  async moveCalendar (userId: string, calendarName?: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user)
      throw new InvalidEntityIdException('User');

    if (!user.googleId)
      throw new GoogleNotLinkedException();

    const accessToken = await this.googleAuthService.getAccessToken(user.googleId);
    if (!accessToken || !(await this.googleAuthService.hasCalendarPermissions(accessToken)))
      throw new NoGoogleGrantException();

    const { calendarId: previousCalendarId } = await this.googleUserRepository.findById(user.googleId);
    if (previousCalendarId) {
      await this.deleteCalendar(previousCalendarId, accessToken);
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
          },
        },
      ],
    };

    const events: DbEvent[] = await this.eventRepository.findMany({
      where: {
        ...studentFilter,
        ...dateFilter,
        ...selectiveFilter,
      },
    });

    for (const event of events) {
      const googleEvent = this.getGoogleEvent(event, endDate);
      const createdEvent = await this.calendarAPI.createEvent(calendarId, googleEvent, accessToken);

      if (event.period !== Period.NO_PERIOD) {
        let eventInstances: EventInstancesResponse = null;
        for (const eventInfo of event.eventInfo) {
          if (eventInfo.description) {
            if (!eventInstances) {
              eventInstances = await this.getSortedEventInstances(calendarId, createdEvent.id, accessToken);
            }
            const index = eventInfo.number;
            if (index >= eventInstances.items.length) continue;
            const eventInstance = eventInstances.items[index];
            eventInstance.description = this.getEventDescription(event.url, eventInfo.description);
            await this.calendarAPI.updateEvent(calendarId, eventInstance, accessToken);
          }
        }
      }
    }

    await this.googleUserRepository.updateById(user.googleId, { calendarId });
  }

  private getGoogleEvent (event: DbEvent, semesterEnd: Date): CreateGoogleEventDTO {
    const eventType= event.lessons[0]?.disciplineType.name as unknown as EventTypeEnum ?? EventTypeEnum.OTHER;
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
    };

    if (event.url) {
      googleEvent.description = this.getUrlDescription(event.url);
    }

    if (event.period !== Period.NO_PERIOD) {
      googleEvent.recurrence = [ this.getRecurrenceRule(event, semesterEnd) ];
    }

    return googleEvent;
  }

  private getRecurrenceRule (event: DbEvent, endDate: Date): string {
    const days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    const recurrenceParams = {
      'FREQ': 'WEEKLY',
      'UNTIL': this.toRfcDateString(endDate),
      'BYDAY': days[event.startTime.getDay()],
      'WKST': 'MO',
    };
    if (event.period === Period.EVERY_FORTNIGHT) {
      recurrenceParams['INTERVAL'] = '2';
    }

    const rule = Object.entries(recurrenceParams).map(([key, value]) => {
      return `${key}=${value}`;
    }).join(';');

    return `RRULE:${rule}`;
  }

  private toRfcDateString (date: Date): string {
    const iso = date.toISOString();

    return iso
      .replace(/-/g, '')
      .replace(/:/g, '')
      .split('.')[0]
      + 'Z';
  }

  private getEventDescription (url?: string, text?: string): string {
    let eventDescription = '';
    if (text) {
      eventDescription += this.getTextDescription(text);
    }
    if (url) {
      eventDescription += this.getUrlDescription(url);
    }
    return eventDescription;
  }

  private getTextDescription (text: string): string {
    return `<b>Опис:</b>\n${text}\n`;
  }

  private getUrlDescription (url: string): string {
    return `<b>Посилання:</b>\n${url}\n`;
  }

  private async getSortedEventInstances (
    calendarId: string,
    eventId: string,
    accessToken: string,
  ): Promise<EventInstancesResponse> {
    const instances = await this.calendarAPI.getEventInstances(calendarId, eventId, accessToken);

    instances.items.sort((a, b) => {
      const startDateA = new Date(a.start.dateTime);
      const startDateB = new Date(b.start.dateTime);

      return startDateA.getTime() - startDateB.getTime();
    });

    return instances;
  }

  private async getCalendarData (googleId: string): Promise<{ calendarId: string, accessToken: string } | undefined> {
    const accessToken = await this.googleAuthService.getAccessToken(googleId);
    if (!accessToken || !(await this.googleAuthService.hasCalendarPermissions(accessToken))) {
      return;
    }

    const { calendarId } = await this.googleUserRepository.findById(googleId);
    if (!calendarId || !(await this.hasCalendar(googleId, calendarId, accessToken))) {
      return;
    }

    return { accessToken, calendarId };
  }

  private async createUserEvent (event: DbEvent, semesterEnd: Date, googleId: string): Promise<void> {
    const calendarData = await this.getCalendarData(googleId);
    if (!calendarData) return;

    const { accessToken, calendarId } = calendarData;

    const googleEvent = this.getGoogleEvent(event, semesterEnd);
    const description = event.eventInfo.length ? event.eventInfo[0].description : undefined;
    const eventDescription = this.getEventDescription(event.url, description);
    if (description && event.period === Period.NO_PERIOD) {
      googleEvent.description = eventDescription;
    }

    const createdEvent = await this.calendarAPI.createEvent(
      calendarId,
      googleEvent,
      accessToken,
      true,
    );
    if (description && event.period !== Period.NO_PERIOD) {
      const eventInstances = await this.getSortedEventInstances(
        calendarId,
        createdEvent.id,
        accessToken,
      );
      const firstEvent = eventInstances.items[0];
      firstEvent.description = eventDescription;
      await this.calendarAPI.updateEvent(calendarId, firstEvent, accessToken);
    }
  }

  private async updateUserEvent (event: DbEvent, semesterEnd: Date, googleId: string) {
    const calendarData = await this.getCalendarData(googleId);
    if (!calendarData) return;

    const { calendarId, accessToken } = calendarData;

    const googleEvent = this.getGoogleEvent(event, semesterEnd);
    if (event.period === Period.NO_PERIOD) {
      googleEvent.description = event.eventInfo[0]?.description;
    }
    try {
      await this.calendarAPI.updateEvent(calendarId, googleEvent, accessToken, true);

      if (event.period !== Period.NO_PERIOD) {
        const { items } = await this.getSortedEventInstances(
          calendarId,
          googleEvent.id,
          accessToken,
        );

        for (const eventInfo of event.eventInfo) {
          if (eventInfo.number >= items.length) continue;

          const instanceId = items[eventInfo.number].id;
          const instance = await this.calendarAPI.getEvent(calendarId, instanceId, accessToken);

          instance.description = this.getEventDescription(event.url, eventInfo.description);
          await this.calendarAPI.updateEvent(calendarId, instance, accessToken);
        }
      }
    } catch (e) {
      console.log(e.response.data);
      return;
    }
  }

  private async deleteUserEvent (eventId: string, googleId: string): Promise<void> {
    const calendarData = await this.getCalendarData(googleId);
    if (!calendarData) return;

    const { calendarId, accessToken } = calendarData;

    const googleEventId = this.uuidToB32(eventId);

    try {
      await this.calendarAPI.deleteEvent(calendarId, googleEventId, accessToken, true);
    } catch (e) {
      console.log(e.response.data);
    }
  }

  private async getAssociatedUsers (eventId: string) {
    const event = await this.eventRepository.findById(eventId);

    let selectiveDisciplineFilter: StudentWhereInput = {};
    const disciplineTypeId = event.lessons[0]?.disciplineTypeId;
    if (disciplineTypeId) {
      const discipline = await this.disciplineRepository.find({
        disciplineTypes: {
          some: {
            id: disciplineTypeId,
          },
        },
      });

      if (discipline.isSelective) {
        selectiveDisciplineFilter = {
          selectiveDisciplines: {
            some: {
              discipline: {
                id: discipline.id,
              },
            },
          },
        };
      }
    }

    return await this.userRepository.findMany({
      where: {
        student: {
          group: {
            events: {
              some: {
                id: eventId,
              },
            },
          },
          ...selectiveDisciplineFilter,
        },
      },
    });
  }

  async handleEventCreate (eventId: string): Promise<void> {
    const event = await this.eventRepository.findById(eventId);

    const users = await this.getAssociatedUsers(eventId);

    const { endDate } = await this.dateService.getCurrentSemester();
    for (const user of users) {
      await this.createUserEvent(event, endDate, user.googleId);
    }
  }

  async handleEventUpdate (eventId: string): Promise<void> {
    const event = await this.eventRepository.findById(eventId);

    const users = await this.getAssociatedUsers(eventId);

    const { endDate } = await this.dateService.getCurrentSemester();
    for (const user of users) {
      await this.updateUserEvent(event, endDate, user.googleId);
    }
  }

  async handleEventDelete (eventId: string): Promise<void> {
    const users = await this.getAssociatedUsers(eventId);

    for (const user of users) {
      await this.deleteUserEvent(eventId, user.googleId);
    }
  }

  // Google policy for custom ids  ¯\_(ツ)_/¯

  private uuidToB32 (uuid: string): string {
    return uuid.replace(/-/g, 'v');
  }

  private b32ToUUID (b32: string): string {
    return b32.replace(/v/g, '-');
  }
}
