import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query, Request,
  UseGuards,
} from '@nestjs/common';
import { ScheduleService } from './ScheduleService';
import { GroupByIdPipe } from '../group/pipe/GroupByIdPipe';
import { Group } from '@prisma/client';
import { DateService } from '../../utils/date/DateService';
import { JwtGuard } from '../../security/JwtGuard';
import { GroupBySemesterLessonGuard } from '../../security/group-guard/GroupBySemesterLessonGuard';
import { GroupByTemporaryLessonGuard } from '../../security/group-guard/GroupByTemporaryLessonGuard';

@Controller({
  version: '2',
  path: '/schedule',
})
export class ScheduleController {
  constructor (
    private scheduleService: ScheduleService,
    private dateService: DateService,
  ) {}


  @Post('/parse')
  async parse (
    @Query('parser') parser: string,
    @Query('page') page: string,
  ) {
    return this.scheduleService.parse(parser, +page);
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
