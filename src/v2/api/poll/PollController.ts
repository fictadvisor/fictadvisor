import { Body, Controller, Param, Put, Request, UseGuards } from '@nestjs/common';
import { PollService } from './PollService';
import { JwtGuard } from '../../security/JwtGuard';
import { GroupByDisciplineTeacherGuard } from '../../security/group-guard/GroupByDisciplineTeacherGuard';
import {CreateAnswersDTO} from "./dto/CreateAnswersDTO";

@Controller({
  version: '2',
  path: '/poll',
})
export class PollController {
  constructor(
    private pollService: PollService,
  ) {}

  @UseGuards(JwtGuard, GroupByDisciplineTeacherGuard)
  @Put('/answers/:disciplineTeacherId')
  async createAnswers(
    @Param('disciplineTeacherId') disciplineTeacherId: string,
    @Request() req,
    @Body() body: CreateAnswersDTO,
  ) {
    return this.pollService.createAnswers(req.user.id, disciplineTeacherId, body);
  }

}