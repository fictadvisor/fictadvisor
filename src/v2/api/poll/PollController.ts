import { Body, Controller, Delete, Get, Patch, Param, Post, UseGuards } from '@nestjs/common';
import { PollService } from './PollService';
import { JwtGuard } from '../../security/JwtGuard';
import { UpdateQuestionDTO } from "./dto/UpdateQuestionDTO";
import { CreateQuestionsDTO } from "./dto/CreateQuestionDTO";
import { QuestionRoleData } from "./dto/QuestionRoleData";
import { Permission } from "../../security/permission-guard/Permission";
import { PermissionGuard } from "../../security/permission-guard/PermissionGuard";
import { QuestionByIdPipe } from "./dto/QuestionByIdPipe";
import { QuestionByRoleAndIdPipe } from "./dto/QuestionByRoleAndIdPipe";

@Controller({
  version: '2',
  path: '/poll',
})
export class PollController {
  constructor(
    private pollService: PollService,
  ) {}

  @Permission('questions.create')
  @UseGuards(JwtGuard, PermissionGuard)
  @Post('/questions')
  async createQuestion(
    @Body() body : CreateQuestionsDTO,
  ) {
    return this.pollService.createQuestions(body);
  }

  @Permission('questions.delete')
  @UseGuards(JwtGuard, PermissionGuard)
  @Delete('/questions/:questionId')
  delete(
    @Param('questionId', QuestionByIdPipe) questionId: string,
  ) {
    return this.pollService.delete(questionId);
  }

  @Permission('questions.update')
  @UseGuards(JwtGuard, PermissionGuard)
  @Patch('/questions/:questionId')
  update(
    @Param('questionId', QuestionByIdPipe) questionId: string,
    @Body() body: UpdateQuestionDTO,
  ) {
    return this.pollService.update(questionId, body);
  }

  @Get('/questions/:questionId')
  getQuestion(
    @Param('questionId', QuestionByIdPipe) questionId: string,
  ){
    return this.pollService.getQuestion(questionId);
  }

  @Permission('questions.roles.give')
  @UseGuards(JwtGuard, PermissionGuard)
  @Post('/questions/:questionId/roles')
  giveRole(
    @Param('questionId', QuestionByIdPipe) questionId: string, body: QuestionRoleData,
  ){
    return this.pollService.giveRole(body, questionId);
  }

  @Permission('question.roles.delete')
  @UseGuards(JwtGuard, PermissionGuard)
  @Delete('/questions/:questionId/roles/:role')
  deleteRole(
    @Param(QuestionByRoleAndIdPipe) params,
  ){
    return this.pollService.deleteRole(params.questionId, params.role);
  }

}