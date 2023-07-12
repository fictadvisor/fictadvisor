import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ScheduleService } from '../services/ScheduleService';
import { GroupByIdPipe } from '../pipes/GroupByIdPipe';
import { DateService } from '../../utils/date/DateService';
import { ScheduleMapper } from '../../mappers/ScheduleMapper';
import { Access } from '../../security/Access';
import {
  ApiBadRequestResponse,
  ApiBearerAuth, ApiForbiddenResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GeneralEventResponse } from '../responses/GeneralEventResponse';
import { CreateEventDTO } from '../dtos/CreateEventDTO';
import { EventResponse } from '../responses/EventResponse';
import { EventByIdPipe } from '../pipes/EventByIdPipe';
import { GroupByEventGuard } from '../../security/group-guard/GroupByEventGuard';

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

  @Access('schedule.parse')
  @Post('/parse')
  async parse (
    @Query('parser') parser: string,
    @Query('page') page: string,
    @Query('year', ParseIntPipe) year: number,
    @Query('semester', ParseIntPipe) semester: number,
  ) {
    const period = {
      year,
      semester,
    };
    return this.scheduleService.parse(parser, +page, period);
  }

  @Get('/groups/:groupId/general')
  @ApiQuery({
    name: 'week',
    required: false,
  })
  @ApiOkResponse({
    type: [GeneralEventResponse],
  })
  @ApiBadRequestResponse({
    description: `\n
                  InvalidEntityIdException: Group with such id is not found\n
                  DataNotFoundException: Data was not found`,
  })
  async getGeneralEvents (
    @Param('groupId', GroupByIdPipe) id: string,
    @Query('week') week: number,
  ) {
    const events = await this.scheduleService.getGeneralGroupEvents(id, week);
    return this.scheduleMapper.getGeneralEvents(events);
  }

  @Access('groups.$groupId.events.get', GroupByEventGuard)
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

  @Access('groups.$groupId.events.create')
  @Post('/events')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: EventResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Group id cannot be empty
      Name is too short (min: 2)
      Name is too long (max: 100)
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
      Data was not found`,
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
}
