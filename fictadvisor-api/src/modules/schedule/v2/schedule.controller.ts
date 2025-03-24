import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ParseScheduleQueryDTO,
  CreateEventDTO,
  CreateFacultyEventDTO,
  EventFiltrationDTO,
  GeneralEventFiltrationDTO,
  UpdateEventDTO,
} from '@fictadvisor/utils/requests';
import {
  EventResponse,
  EventsResponse,
  WeekEventsResponse,
  WeekGeneralEventsResponse,
  FortnightTelegramEventsResponse,
  TelegramEventsResponse,
} from '@fictadvisor/utils/responses';
import { PERMISSION } from '@fictadvisor/utils/security';
import { ApiEndpoint } from '../../../common/decorators/api-endpoint.decorator';
import { GetUser } from '../../../common/decorators/get-user.decorator';
import { TelegramGuard } from '../../../common/guards/telegram/telegram.guard';
import { GroupByEventGuard } from '../../../common/guards/group/v2/group-by-event.guard';
import { GroupByIdPipe } from '../../../common/pipes/group-by-id.pipe';
import { EventFiltrationPipe } from '../../../common/pipes/event-filtration.pipe';
import { EventByIdPipe } from '../../../common/pipes/event-by-id.pipe';
import { EventPipe } from '../../../common/pipes/event.pipe';
import { UserByIdPipe } from '../../../common/pipes/user-by-id.pipe';
import { ScheduleMapper } from '../../../common/mappers/schedule.mapper';
import { ScheduleService } from './schedule.service';
import { ScheduleTimeConvertPipe } from '../../../common/pipes/schedule-time-convert.pipe';
import { ScheduleDocumentation } from '../../../common/documentation/modules/v2/schedule';

@ApiTags('Schedule')
@Controller({
  version: '2',
  path: '/schedule',
})
export class ScheduleController {
  constructor (
    private scheduleService: ScheduleService,
    private scheduleMapper: ScheduleMapper,
  ) {}

  @ApiEndpoint({
    summary: 'Parse lessons',
    documentation: ScheduleDocumentation.PARSE,
    permissions: PERMISSION.SCHEDULE_PARSE,
  })
  @Post('/parse')
  async parse (
    @Query() query: ParseScheduleQueryDTO,
  ): Promise<void> {
    return this.scheduleService.parse(query);
  }

  @ApiEndpoint({
    summary: 'Get event by id',
    documentation: ScheduleDocumentation.GET_EVENT,
    guards: GroupByEventGuard,
    permissions: PERMISSION.GROUPS_$GROUPID_EVENTS_GET,
  })
  @Get('/events/:eventId')
  async getEvent (
    @Param('eventId', EventByIdPipe) id: string,
    @Query('week') week: number,
  ): Promise<EventResponse> {
    const { event, discipline } = await this.scheduleService.getEvent(id, week);
    return this.scheduleMapper.getEvent(event, discipline);
  }

  @ApiEndpoint({
    summary: 'Get group\'s general events by week',
    documentation: ScheduleDocumentation.GET_GENERAL_EVENTS,
  })
  @Get('/groups/:groupId/general')
  async getGeneralEvents (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Query(EventFiltrationPipe) query: GeneralEventFiltrationDTO,
    @Query('week') week?: number,
  ): Promise<WeekGeneralEventsResponse> {
    const result = await this.scheduleService.getGeneralGroupEventsWrapper(groupId, query, week);
    return {
      events: this.scheduleMapper.getShortEvents(result.events),
      week: result.week,
      startTime: result.startTime,
    };
  }

  @ApiEndpoint({
    summary: 'Get all group events by week',
    documentation: ScheduleDocumentation.GET_GROUP_EVENTS,
    permissions: PERMISSION.GROUPS_$GROUPID_EVENTS_GET,
    guards: TelegramGuard,
  })
  @Get('/groups/:groupId/events')
  async getGroupEvents (
    @GetUser('id') userId,
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Query(EventFiltrationPipe) query: EventFiltrationDTO,
    @Query('week') week?: number,
  ): Promise<WeekEventsResponse> {
    const result = await this.scheduleService.getGroupEventsWrapper(
      groupId,
      query,
      userId,
      week,
    );
    return {
      events: this.scheduleMapper.getShortEvents(result.events),
      week: result.week,
      startTime: result.startTime,
    };
  }

  @ApiEndpoint({
    summary: 'Get group events by day for telegram',
    documentation: ScheduleDocumentation.GET_GROUP_EVENTS_BY_DAY,
    guards: TelegramGuard,
  })
  @Get('/groups/:groupId/day')
  async getGroupEventsByDay (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Query('userId', UserByIdPipe) userId?: string,
    @Query('week') week?: number,
    @Query('day') day?: number,
  ): Promise<TelegramEventsResponse> {
    const events = await this.scheduleService.getGroupEventsByDay(groupId, userId, week, day);
    return { events: this.scheduleMapper.getTelegramShortEvents(events) };
  }

  @ApiEndpoint({
    summary: 'Get week events for telegram',
    documentation: ScheduleDocumentation.GET_GROUP_EVENTS_BY_WEEK,
    guards: TelegramGuard,
  })
  @Get('/groups/:groupId/week')
  async getGroupEventsByWeek (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Query(EventFiltrationPipe) query: EventFiltrationDTO,
    @Query('week') week?: number,
    @Query('userId', UserByIdPipe) userId?: string,
  ): Promise<TelegramEventsResponse> {
    const events = await this.scheduleService.getGroupEventsForTelegram(groupId, week, userId, query);
    return {
      events: this.scheduleMapper.getTelegramShortEvents(events),
    };
  }

  @ApiEndpoint({
    summary: 'Get group events by fortnight for telegram',
    documentation: ScheduleDocumentation.GET_GROUP_EVENTS_BY_FORTNIGHT,
    guards: TelegramGuard,
  })
  @Get('/groups/:groupId/fortnight')
  async getGroupEventsByFortnight (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Query(EventFiltrationPipe) query: EventFiltrationDTO,
    @Query('week') week?: number,
    @Query('userId', UserByIdPipe) userId?: string,
  ): Promise<FortnightTelegramEventsResponse> {
    const { firstWeekEvents, secondWeekEvents } = await this.scheduleService.getFortnightEvents(
      groupId,
      query,
      week,
      userId,
    );

    return {
      firstWeekEvents: this.scheduleMapper.getTelegramShortEvents(firstWeekEvents),
      secondWeekEvents: this.scheduleMapper.getTelegramShortEvents(secondWeekEvents),
    };
  }

  @ApiEndpoint({
    summary: 'Create an event',
    documentation: ScheduleDocumentation.CREATE_EVENT,
    permissions: PERMISSION.GROUPS_$GROUPID_EVENTS_CREATE,
    guards: TelegramGuard,
  })
  @Post('/events')
  async createEvent (
    @Body(ScheduleTimeConvertPipe) body: CreateEventDTO,
  ) {
    const result = await this.scheduleService.createGroupEvent(body);
    result.event = await this.scheduleService.addEventTimezones(result.event);
    return this.scheduleMapper.getEvent(result.event, result.discipline);
  }

  @ApiEndpoint({
    summary: 'Create a general faculty event',
    documentation: ScheduleDocumentation.CREATE_FACULTY_EVENT,
    permissions: PERMISSION.FACULTY_EVENTS_CREATE,
  })
  @Post('/facultyEvents')
  async createFacultyEvent (
    @Body(ScheduleTimeConvertPipe) body: CreateFacultyEventDTO,
  ): Promise<EventsResponse> {
    const events = await this.scheduleService.createFacultyEvent(body);
    return { events: this.scheduleMapper.getShortEvents(events) };
  }

  @ApiEndpoint({
    summary: 'Update the certain event',
    documentation: ScheduleDocumentation.UPDATE_EVENT,
    permissions: PERMISSION.GROUPS_$GROUPID_EVENTS_UPDATE,
    guards: TelegramGuard,
  })
  @Patch('/groups/:groupId/events/:eventId')
  async update (
    @Param('eventId', EventByIdPipe) eventId: string,
    @Body(EventPipe, ScheduleTimeConvertPipe) body: UpdateEventDTO,
  ): Promise<EventResponse> {
    await this.scheduleService.updateEvent(eventId, body);
    const result = await this.scheduleService.getEvent(eventId, body.week);
    return this.scheduleMapper.getEvent(result.event, result.discipline);
  }

  @ApiEndpoint({
    summary: 'Delete a specific event by group',
    documentation: ScheduleDocumentation.DELETE_EVENT,
    permissions: PERMISSION.GROUPS_$GROUPID_EVENTS_DELETE,
    guards: TelegramGuard,
  })
  @Delete('/groups/:groupId/events/:eventId')
  async deleteEvent (
    @Param('eventId', EventByIdPipe) eventId: string,
  ): Promise<EventResponse> {
    const { event, discipline } = await this.scheduleService.deleteEvent(eventId);
    return this.scheduleMapper.getEvent(event, discipline);
  }
}
