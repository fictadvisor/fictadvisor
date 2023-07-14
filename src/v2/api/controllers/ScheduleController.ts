import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ScheduleService } from '../services/ScheduleService';
import { GroupByIdPipe } from '../pipes/GroupByIdPipe';
import { Group } from '@prisma/client';
import { DateService } from '../../utils/date/DateService';
import { JwtGuard } from '../../security/JwtGuard';
import { GroupBySemesterLessonGuard } from '../../security/group-guard/GroupBySemesterLessonGuard';
import { GroupByTemporaryLessonGuard } from '../../security/group-guard/GroupByTemporaryLessonGuard';
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

  @Get('/groups/:groupId/static')
  async getStaticLessons (
    @Param('groupId', GroupByIdPipe) group: Group
  ) {
    const current = await this.dateService.getCurrentDay();
    const lessons = await this.scheduleService.getSchedule(group, current.fortnight, 'static');
    return { current, lessons };
  }

  @Get('/groups/:groupId/static/:fortnight')
  async getStaticLessonsFortnight (
    @Param('groupId', GroupByIdPipe) group: Group,
    @Param('fortnight', ParseIntPipe) fortnight: number,
  ) {
    const lessons = await this.scheduleService.getSchedule(group, fortnight, 'static');
    return { lessons };
  }

  @UseGuards(JwtGuard)
  @Get('/groups/:groupId/temporary')
  async getTemporaryLessons (
    @Param('groupId', GroupByIdPipe) group: Group,
  ) {
    const current = await this.dateService.getCurrentDay();
    const lessons = await this.scheduleService.getSchedule(group, current.fortnight, 'temporary');
    return { lessons };
  }

  @UseGuards(JwtGuard)
  @Get('/groups/:groupId/temporary/:fortnight')
  async getTemporaryLessonsFortnight (
    @Param('groupId', GroupByIdPipe) group: Group,
    @Param('fortnight', ParseIntPipe) fortnight: number,
  ) {
    const lessons = await this.scheduleService.getSchedule(group, fortnight, 'temporary');
    return { lessons };
  }

  @UseGuards(JwtGuard, GroupBySemesterLessonGuard)
  @Get('/lessons/static/:lessonId/:fortnight')
  async getStaticLesson (
    @Param('lessonId') id: string,
    @Param('fortnight', ParseIntPipe) fortnight: number,
  ) {
    return this.scheduleService.getFullStaticLesson(id, fortnight);
  }

  @UseGuards(JwtGuard, GroupByTemporaryLessonGuard)
  @Get('/lessons/temporary/:lessonId')
  async getTemporaryLesson (
    @Param('lessonId') id: string,
  ) {
    return this.scheduleService.getFullTemporaryLesson(id);
  }

  @UseGuards(JwtGuard, GroupBySemesterLessonGuard)
  @Patch('/lessons/static/:lessonId/:fortnight')
  async updateFortnightLesson (
    @Param('lessonId') id: string,
    @Param('fortnight', ParseIntPipe) fortnight: number,
    @Body() body,
  ) {
    return this.scheduleService.updateFortnightInfo(id, fortnight, body);
  }

  @UseGuards(JwtGuard, GroupBySemesterLessonGuard)
  @Patch('/lessons/static/:lessonId')
  async updateSemesterLesson (
    @Param('lessonId') id: string,
    @Body() body,
  ) {
    return this.scheduleService.updateSemesterInfo(id, body);
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

  @Access('groups.$groupId.event.create')
  @Post('/groups/:groupId/event')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: EventResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidGroupIdException: 
      Group with such id is not found
      
    InvalidBodyException:
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
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Body() body: CreateEventDTO,
  ) {
    const result = await this.scheduleService.createGroupEvent(groupId, body);
    return this.scheduleMapper.getEvent(result.event, result.discipline);
  }

//   @UseGuards(JwtGuard)
//   @Post('')
//   async createLesson (
//     @Request() req,
//     @Body() body,
//   ) {
//     const lesson = await this.scheduleService.createLesson(body);
//     if (!lesson) {
//       throw new BadRequestException('Invalid create lesson DTO');
//     }
//     if (!body.fortnight) {
//       return this.scheduleService.getFullStaticLesson(lesson.id, body.fortnight);
//     } else {
//       return this.scheduleService.getFullTemporaryLesson(lesson.id);
//     }
//   }
//
}
