import {Body, Controller, Delete, Get, Patch, Param, Put, Post, Request, UseGuards} from '@nestjs/common';
import { PollService } from './PollService';
import { JwtGuard } from '../../security/JwtGuard';
import { GroupByDisciplineTeacherGuard } from '../../security/group-guard/GroupByDisciplineTeacherGuard';
import { CreateAnswersDTO } from "./dto/CreateAnswersDTO";
import { UpdateQuestionDTO } from "./dto/UpdateQuestionDTO";
import { CreateQuestionsDTO } from "./dto/CreateQuestionDTO";
import { QuestionRoleData } from "./dto/QuestionRoleData";
import { TeacherRole } from "@prisma/client";

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

  @UseGuards(JwtGuard)
  async createQuestion(
      @Body() body : CreateQuestionsDTO,
      ) {
    return this.pollService.createQuestions(body);
  }

  @Delete('/:questionId')
  delete(
      @Param('questionId') questionId: string,
  ) {
    return this.pollService.delete(questionId);
  }

  @Patch('/:questionId')
  update(
      @Param('questionId') questionId: string,
      @Body() body: UpdateQuestionDTO,
  ) {
    return this.pollService.update(questionId, body);
  }

  @UseGuards(JwtGuard)
  @Get('/:questionId')
  getQuestion(
      @Param('questionId') questionId: string,
  ){
    return this.pollService.getQuestion(questionId);
  }

  @UseGuards(JwtGuard)
  @Post('/questions/:questionId/roles')
  giveRole(
      @Param('questionId') questionId: string, body: QuestionRoleData,
  ){
    return this.pollService.giveRole(body, questionId);
  }

  @UseGuards(JwtGuard)
  @Post('/questions/:questionId/roles/:role')
  deleteRole(
      @Param('questionId') questionId: string,
      @Param() params: TeacherRole,
  ){
    return this.pollService.deleteRole(questionId, params);
  }


}