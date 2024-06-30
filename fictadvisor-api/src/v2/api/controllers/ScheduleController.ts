import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreateEventDTO,
  EventFiltrationDTO,
  GeneralEventFiltrationDTO,
  UpdateEventDTO,
} from '@fictadvisor/utils/requests';
import {
  EventResponse,
  EventsResponse,
  FortnightEventsResponse,
  GeneralEventsResponse,
  TelegramEventsResponse,
  EventInfoResponse,
} from '@fictadvisor/utils/responses';
import { PERMISSION } from '@fictadvisor/utils/security';
import { Access } from '../../security/Access';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { TelegramGuard } from '../../security/TelegramGuard';
import { GroupByEventGuard } from '../../security/group-guard/GroupByEventGuard';
import { GroupByIdPipe } from '../pipes/GroupByIdPipe';
import { EventFiltrationPipe } from '../pipes/EventFiltrationPipe';
import { EventByIdPipe } from '../pipes/EventByIdPipe';
import { EventPipe } from '../pipes/EventPipe';
import { UserByIdPipe } from '../pipes/UserByIdPipe';
import { ScheduleMapper } from '../../mappers/ScheduleMapper';
import { ScheduleService } from '../services/ScheduleService';

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

  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiQuery({
    name: 'parser',
    enum: ['campus', 'rozkpi'],
  })
  @ApiQuery({
    name: 'semester',
    enum: [1, 2],
    description: 'Semester number',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for rozkpi parser',
  })
  @ApiQuery({
    name: 'year',
    description: 'Academic year',
  })
  @ApiQuery({
    name: 'groups',
    required: false,
    description: 'Names of academic groups',
  })
  @ApiEndpoint({
    summary: 'Parse lessons',
    permissions: PERMISSION.SCHEDULE_PARSE,
  })
  @Post('/parse')
  async parse (
    @Query('parser') parser: string,
    @Query('page') page: string,
    @Query('year', ParseIntPipe) year: number,
    @Query('semester', ParseIntPipe) semester: number,
    @Query('groups') groups: string,
  ) {
    const period = {
      year,
      semester,
    };
    return this.scheduleService.parse(parser, page, period, groups);
  }

  @Get('/groups/:groupId/general')
  @ApiQuery({
    name: 'week',
    required: false,
  })
  @ApiOkResponse({
    type: GeneralEventsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      Group with such id is not found
      
    DataNotFoundException: 
      Data were not found`,
  })
  async getGeneralEvents (
    @Param('groupId', GroupByIdPipe) id: string,
    @Query('week') week: number,
    @Query(EventFiltrationPipe) query: GeneralEventFiltrationDTO,
  ) {
    const result = await this.scheduleService.getGeneralGroupEventsWrapper(
      id,
      week,
      query,
    );
    return {
      events: this.scheduleMapper.getEvents(result.events),
      week: result.week,
      startTime: result.startTime,
    };
  }

  @ApiBearerAuth()
  @Get('/groups/:groupId/day')
  @ApiOkResponse({
    type: TelegramEventsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidGroupIdException: 
      Group with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: 'Id of a group which event you want to get',
  })
  @ApiQuery({
    name: 'day',
    required: false,
    description: 'Day of a week which event you want to get',
  })
  @ApiQuery({
    name: 'week',
    required: false,
    description: 'Week in which event you want to get',
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Id of a user which event you want to get',
  })
  @ApiEndpoint({
    summary: 'Get day events for telegram',
    guards: TelegramGuard,
  })
  async getGroupEventsByDay (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Query('day') day: number,
    @Query('week') week: number,
    @Query('userId', UserByIdPipe) userId: string,
  ) {
    const result = await this.scheduleService.getGroupEventsByDay(groupId, day, week, userId);
    return {
      events: this.scheduleMapper.getTelegramEvents(result.events),
    };
  }

  @Access(PERMISSION.GROUPS_$GROUPID_EVENTS_GET, GroupByEventGuard)
  @ApiBearerAuth()
  @Get('/events/:eventId')
  @ApiOkResponse({
    type: EventResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      Event with such id is not found
      
    InvalidWeekException:
      Week parameter is invalid`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  async getEvent (
    @Param('eventId', EventByIdPipe) id: string,
    @Query('week') week: number,
  ) {
    const result = await this.scheduleService.getEvent(id, week);
    return this.scheduleMapper.getEvent(result.event, result.discipline);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: EventInfoResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      Event with such id is not found
      
    InvalidWeekException:
      Week parameter is invalid`,
  })
  @ApiParam({
    name: 'eventId',
    description: 'Id of the certain event',
    required: true,
  })
  @ApiParam({
    name: 'groupId',
    description: 'Id of the group',
    required: true,
  })
  @ApiQuery({
    name: 'week',
    description: 'Week of the event',
    required: true,
  })
  @ApiEndpoint({
    summary: 'Get the information about event and all its pairs',
  })
  @Get('/groups/:groupId/events/:eventId')
  async getEventInfos (
    @Param('eventId', EventByIdPipe) id: string,
    @Query('week') week: number,
  ) {
    const result = await this.scheduleService.getEventInfos(id, week);
    return this.scheduleMapper.getEventInfos(result.event);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: EventResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Group id cannot be empty
      Name is too short (min: 2)
      Name is too long (max: 150)
      Name cannot be empty
      Event type must be an enum
      Teachers must be Array
      Teachers cannot be empty (empty array is required)
      Start time cannot be empty
      Start time must be Date
      End time cannot be empty
      End Time must be Date
      Period cannot be empty
      Period must be an enum
      Url must be a URL address
      Discipline description is too long (max: 2000)
      Event description is too long (max: 2000)
      
    ObjectIsRequiredException:
      DisciplineType is required
      
    InvalidDateException:
      Date is not valid or does not belong to this semester
      
    DataNotFoundException:
      Data were not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiEndpoint({
    summary: 'Create an event',
    permissions: PERMISSION.GROUPS_$GROUPID_EVENTS_CREATE,
    guards: TelegramGuard,
  })
  @Post('/events')
  async createEvent (
    @Body() body: CreateEventDTO,
  ) {
    const result = await this.scheduleService.createGroupEvent(body);
    return this.scheduleMapper.getEvent(result.event, result.discipline);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: EventsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidGroupIdException:
      Group with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'groupId',
    description: 'Id of the group',
    type: String,
    required: true,
  })
  @ApiQuery({
    name: 'week',
    description: 'Week number',
    type: Number,
    required: false,
  })
  @ApiEndpoint({
    summary: 'Get events by group',
    permissions: PERMISSION.GROUPS_$GROUPID_EVENTS_GET,
    guards: TelegramGuard,
  })
  @Get('/groups/:groupId/events')
  async getGroupEvents (
    @Request() req,
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Query('week') week: number,
    @Query(EventFiltrationPipe) query: EventFiltrationDTO,
  ): Promise<EventsResponse> {
    const result = await this.scheduleService.getGroupEvents(
      req.user?.id ?? null,
      groupId,
      week,
      query,
    );
    return {
      events: this.scheduleMapper.getEvents(result.events),
      week: result.week,
      startTime: result.startTime,
    };
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: EventResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      Event with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'groupId',
    description: 'Id of the group',
    type: String,
    required: true,
  })
  @ApiParam({
    name: 'eventId',
    description: 'Id of the event',
    type: String,
    required: true,
  })
  @ApiEndpoint({
    summary: 'Delete a specific event by group',
    permissions: PERMISSION.GROUPS_$GROUPID_EVENTS_DELETE,
    guards: TelegramGuard,
  })
  @Delete('/groups/:groupId/events/:eventId')
  async deleteEvent (
    @Param('eventId', EventByIdPipe) eventId: string,
  ) {
    const result = await this.scheduleService.deleteEvent(eventId);
    return this.scheduleMapper.getEvent(result.event, result.discipline);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: EventResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Name is too short (min: 2)
      Name is too long (max: 150)
      Discipline type must be an enum
      Teachers must be Array
      Start time must be Date
      End time must be Date
      Period must be an enum
      Url must be a URL address
      Discipline description is too long (max: 2000)
      Event description is too long (max: 2000)
    
    ObjectIsRequiredException:
      DisciplineType is required
      StartTime is required
      EndTime is required
      
    InvalidEntityIdException: 
      Event with such id is not found
      Teacher with such id is not found
      Discipline with such id is not found
    
    InvalidWeekException:
      Week parameter is invalid`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'groupId',
    description: 'Id of the certain group',
    type: String,
    required: true,
  })
  @ApiParam({
    name: 'eventId',
    description: 'Id of the certain event',
    type: String,
    required: true,
  })
  @ApiEndpoint({
    summary: 'Update the certain event',
    permissions: PERMISSION.GROUPS_$GROUPID_EVENTS_UPDATE,
    guards: TelegramGuard,
  })
  @Patch('/groups/:groupId/events/:eventId')
  async update (
    @Param('eventId', EventByIdPipe) eventId: string,
    @Body(EventPipe) body: UpdateEventDTO,
  ) {
    await this.scheduleService.updateEvent(eventId, body);
    const result = await this.scheduleService.getEvent(eventId, body.week);
    return this.scheduleMapper.getEvent(result.event, result.discipline);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: FortnightEventsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidGroupIdException:
      Group with such id is not found
      
    DataNotFoundException:
      Data were not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'groupId',
    description: 'Id of a group which event you want to get',
    type: String,
    required: true,
  })
  @ApiQuery({
    name: 'week',
    description: 'Number of week which event you want to get',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'userId',
    description: 'Id of a user which event you want to get',
    type: String,
    required: false,
  })
  @ApiEndpoint({
    summary: 'Get fortnight events for telegram',
    guards: TelegramGuard,
  })
  @Get('/groups/:groupId/fortnight')
  async getFortnightEvents (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Query('week') week: number,
    @Query('userId', UserByIdPipe) userId: string,
    @Query(EventFiltrationPipe) query: EventFiltrationDTO,
  ) {
    const result = await this.scheduleService.getFortnightEvents(groupId, week, userId, query);

    return {
      firstWeekEvents: this.scheduleMapper.getTelegramEvents(result.firstWeekEvents),
      secondWeekEvents: this.scheduleMapper.getTelegramEvents(result.secondWeekEvents),
    };
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: TelegramEventsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidGroupIdException: 
      Group with such id is not found
      
    DataNotFoundException: 
      Data were not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'groupId',
    description: 'Id of a group which event you want to get',
    type: String,
    required: true,
  })
  @ApiQuery({
    name: 'week',
    description: 'Number of week which event you want to get',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'userId',
    description: 'Id of a user which event you want to get',
    type: String,
    required: false,
  })
  @ApiEndpoint({
    summary: 'Get week events for telegram',
    guards: TelegramGuard,
  })
  @Get('/groups/:groupId/week')
  async getGroupEventsByWeek (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Query('week') week: number,
    @Query('userId', UserByIdPipe) userId: string,
    @Query(EventFiltrationPipe) query: EventFiltrationDTO,
  ) {
    const result = await this.scheduleService.getGroupEventsForTelegram(groupId, week, userId, query);
    return {
      events: this.scheduleMapper.getTelegramEvents(result),
    };
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: TelegramEventsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidGroupIdException: 
      Group with such id is not found
      
    DataNotFoundException: 
      Data were not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'groupId',
    description: 'Id of a group which event you want to get',
    type: String,
    required: true,
  })
  @ApiQuery({
    name: 'userId',
    description: 'Id of a user which event you want to get',
    type: String,
    required: false,
  })
  @ApiEndpoint({
    summary: 'Get month events for telegram',
    guards: TelegramGuard,
  })
  @Get('/groups/:groupId/month')
  async getGroupEventsByMonth (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Query('userId', UserByIdPipe) userId: string,
    @Query(EventFiltrationPipe) query: EventFiltrationDTO,
  ) {
    const result = await this.scheduleService.getMonthEvents(groupId, userId, query);
    return {
      events: this.scheduleMapper.getTelegramEvents(result),
    };
  }
}
