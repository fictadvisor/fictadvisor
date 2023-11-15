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
import { ScheduleService } from '../services/ScheduleService';
import { GroupByIdPipe } from '../pipes/GroupByIdPipe';
import { DateService } from '../../utils/date/DateService';
import { ScheduleMapper } from '../../mappers/ScheduleMapper';
import { Access } from '../../security/Access';
import { PERMISSION } from '../../security/PERMISSION';
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
import { CreateEventDTO, CreateSimpleTelegramEvent } from '../dtos/CreateEventDTO';
import { EventResponse } from '../responses/EventResponse';
import { GroupByEventGuard } from '../../security/group-guard/GroupByEventGuard';
import {
  EventsResponse,
  FortnightEventsResponse,
  GeneralEventsResponse,
  TelegramEventsResponse,
} from '../responses/EventsResponse';
import { TelegramGuard } from '../../security/TelegramGuard';
import { EventFiltrationDTO } from '../dtos/EventFiltrationDTO';
import { GeneralEventFiltrationDTO } from '../dtos/GeneralEventFiltrationDTO';
import { EventFiltrationPipe } from '../pipes/EventFiltrationPipe';
import { EventByIdPipe } from '../pipes/EventByIdPipe';
import { UpdateEventDTO } from '../dtos/UpdateEventDTO';
import { EventPipe } from '../pipes/EventPipe';
import { UserByIdPipe } from '../pipes/UserByIdPipe';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { SimpleTelegramEventInfoResponse } from '../responses/TelegramGeneralEventInfoResponse';

@ApiTags('Schedule')
@Controller({
  version: '2',
  path: '/schedule',
})
export class ScheduleController {
  constructor (
    private scheduleService: ScheduleService,
    private dateService: DateService,
    private scheduleMapper: ScheduleMapper,
  ) {}

  @Access(PERMISSION.SCHEDULE_PARSE)
  @ApiBearerAuth()
  @Post('/parse')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiQuery({
    name: 'parser',
    enum: ['schedule', 'rozkpi'],
  })
  @ApiQuery({
    name: 'semester',
    enum: [1, 2],
  })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiQuery({
    name: 'groups',
    required: false,
  })
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
    @Query('userId', UserByIdPipe) userId: string,
  ) {
    const result = await this.scheduleService.getGroupEventsByDay(groupId, day, userId);
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

  @Access(PERMISSION.GROUPS_$GROUPID_EVENTS_CREATE)
  @Post('/events')
  @ApiBearerAuth()
  @ApiParam({
    name: 'groupId',
    type: String,
    required: true,
  })
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
      Discipline type must be an enum
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
  async createEvent (
    @Body() body: CreateEventDTO,
  ) {
    const result = await this.scheduleService.createGroupEvent(body);
    return this.scheduleMapper.getEvent(result.event, result.discipline);
  }

  @Access(PERMISSION.GROUPS_$GROUPID_EVENTS_GET)
  @Get('/groups/:groupId/events')
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
  @ApiQuery({
    type: Number,
    name: 'week',
    required: false,
  })
  async getGroupEvents (
    @Request() req,
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Query('week') week: number,
    @Query(EventFiltrationPipe) query: EventFiltrationDTO,
  ) {
    const result = await this.scheduleService.getGroupEvents(
      req.user.id,
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

  @Access(PERMISSION.GROUPS_$GROUPID_EVENTS_DELETE)
  @Delete('/groups/:groupId/events/:eventId')
  @ApiBearerAuth()
  @ApiParam({
    name: 'groupId',
    type: String,
    required: true,
  })
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
  async deleteEvent (
    @Param('eventId', EventByIdPipe) id: string,
  ) {
    const result = await this.scheduleService.deleteEvent(id);
    return this.scheduleMapper.getEvent(result.event, result.discipline);
  }

  @Access(PERMISSION.GROUPS_$GROUPID_EVENTS_UPDATE)
  @ApiBearerAuth()
  @Patch('/groups/:groupId/events/:eventId')
  @ApiParam({
    name: 'groupId',
    type: String,
    required: true,
  })
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
  async update (
    @Param('eventId', EventByIdPipe) eventId: string,
    @Body(EventPipe) body: UpdateEventDTO,
  ) {
    await this.scheduleService.updateEvent(eventId, body);

    try {
      const result = await this.scheduleService.getEvent(eventId, body.week);
      return this.scheduleMapper.getEvent(result.event, result.discipline);
    } catch (err) {
      if (err.name === 'InvalidWeekException') {
        return null;
      }
    }
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
    required: true,
    description: 'Id of a group which event you want to get',
  })
  @ApiQuery({
    name: 'week',
    required: false,
    description: 'Number of week which event you want to get',
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Id of a user which event you want to get',
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
  ) {
    const result = await this.scheduleService.getFortnightEvents(groupId, week, userId);

    return {
      firstWeekEvents: this.scheduleMapper.getTelegramEvents(result.firstWeekEvents),
      secondWeekEvents: this.scheduleMapper.getTelegramEvents(result.secondWeekEvents),
    };
  }

  @ApiBearerAuth()
  @Get('/groups/:groupId/week')
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
    required: true,
    description: 'Id of a group which event you want to get',
  })
  @ApiQuery({
    name: 'week',
    required: false,
    description: 'Number of week which event you want to get',
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Id of a user which event you want to get',
  })
  @ApiEndpoint({
    summary: 'Get week events for telegram',
    guards: TelegramGuard,
  })
  async getGroupEventsByWeek (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Query('week') week: number,
    @Query('userId', UserByIdPipe) userId: string,
  ) {
    const result = await this.scheduleService.getGroupEventsForTelegram(groupId, week, userId);
    return {
      events: this.scheduleMapper.getTelegramEvents(result),
    };
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: SimpleTelegramEventInfoResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Group id cannot be empty
      Group id must be in UUID format
      Name is too short (min: 2)
      Name is too long (max: 150)
      Name cannot be empty
      Start time cannot be empty
      Start time must be Date
      End time cannot be empty
      End Time must be Date
      Period cannot be empty
      Period must be an enum
      Url must be a URL address
      Event description is too long (max: 2000)
      
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
    summary: 'Creates simple event without labs, practices and lectures',
    guards: TelegramGuard,
  })
  @Post('/events/simple')
  async createSimpleTelegramEvent (
    @Body() body: CreateSimpleTelegramEvent,
  ) {
    const result = await this.scheduleService.createGroupEvent({
      ...body,
      teachers: [],
    });
    return this.scheduleMapper.getSimpleTelegramEvent(result.event);
  }
}
