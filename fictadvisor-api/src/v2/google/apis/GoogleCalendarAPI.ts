import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { CalendarResource } from '../types/calendar/resources/CalendarResource';
import { CreateGoogleEventDTO } from '../types/calendar/CreateGoogleEventDTO';
import { EventResource } from '../types/calendar/resources/EventResource';
import { EventInstancesResponse } from '../types/calendar/EventInstancesResponse';
import { CalendarListResource } from '../types/calendar/resources/CalendarListResource';

const CALENDAR_BASE_URL = 'https://www.googleapis.com/calendar/v3';
export const KYIV_TIMEZONE = 'Europe/Kyiv';

@Injectable()
export class GoogleCalendarAPI {
  private client: AxiosInstance;

  constructor () {
    this.client = axios.create({
      baseURL: CALENDAR_BASE_URL,
    });
  }

  async createCalendar (name: string, accessToken: string): Promise<CalendarResource> {
    const { data } = await this.client.post<CalendarResource>('/calendars', {
      summary: name,
      timeZone: KYIV_TIMEZONE,
    }, {
      headers: this.getAuthHeader(accessToken),
    });

    return data;
  }

  async getCalendar (calendarId: string, accessToken: string): Promise<CalendarResource> {
    const { data } = await this.client.get<CalendarResource>(`/calendars/${calendarId}`, {
      headers: this.getAuthHeader(accessToken),
    });

    return data;
  }

  async getCalendarFromUserList (calendarId: string, accessToken: string): Promise<CalendarListResource> {
    const { data } = await this.client.get<CalendarListResource>(`/users/me/calendarList/${calendarId}`, {
      headers: this.getAuthHeader(accessToken),
    });

    return data;
  }

  async deleteCalendar (calendarId: string, accessToken: string): Promise<void> {
    await this.client.delete(`/calendars/${calendarId}`, {
      headers: this.getAuthHeader(accessToken),
    });
  }

  async createEvent (
    calendarId: string,
    event: CreateGoogleEventDTO,
    accessToken: string,
    sendNotifications = false,
  ): Promise<EventResource> {
    const { data } = await this.client.post<EventResource>(
      `/calendars/${calendarId}/events`,
      event,
      {
        headers: this.getAuthHeader(accessToken),
        params: this.getNotificationParam(sendNotifications),
      });

    return data;
  }

  async getEvent (calendarId: string, eventId: string, accessToken: string): Promise<EventResource> {
    const { data } = await this.client.get<EventResource>(
      `/calendars/${calendarId}/events/${eventId}`,
      {
        headers: this.getAuthHeader(accessToken),
      }
    );

    return data;
  }

  async updateEvent (
    calendarId: string,
    event: CreateGoogleEventDTO,
    accessToken: string,
    sendNotifications = false,
  ): Promise<EventResource> {
    const { data } = await this.client.put<EventResource>(
      `/calendars/${calendarId}/events/${event.id}`,
      event,
      {
        headers: this.getAuthHeader(accessToken),
        params: this.getNotificationParam(sendNotifications),
      }
    );

    return data;
  }

  async deleteEvent (
    calendarId: string,
    eventId: string,
    accessToken: string,
    sendNotifications = false,
  ): Promise<void> {
    await this.client.delete(`/calendars/${calendarId}/events/${eventId}`, {
      headers: this.getAuthHeader(accessToken),
      params: this.getNotificationParam(sendNotifications),
    });
  }

  async getEventInstances (calendarId: string, eventId: string, accessToken: string): Promise<EventInstancesResponse> {
    const { data } = await this.client.get<EventInstancesResponse>(
      `/calendars/${calendarId}/events/${eventId}/instances`,
      {
        headers: this.getAuthHeader(accessToken),
      }
    );

    return data;
  }

  getAuthHeader (accessToken: string) {
    return {
      'Authorization': `Bearer ${accessToken}`,
    };
  }

  getNotificationParam (sendNotifications?: boolean) {
    return {
      sendUpdates: sendNotifications ? 'all' : 'none',
    };
  }
}
