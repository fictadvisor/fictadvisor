import { Body, Controller, Delete, Get, Patch, Param, Post } from '@nestjs/common';
import { PollService } from './PollService';
import { UpdateQuestionDTO } from './dto/UpdateQuestionDTO';
import { CreateQuestionWithRolesDTO } from './dto/CreateQuestionDTO';
import { QuestionByIdPipe } from './dto/QuestionByIdPipe';
import { QuestionByRoleAndIdPipe } from './dto/QuestionByRoleAndIdPipe';
import { CreateQuestionRoleDTO } from './dto/CreateQuestionRoleDTO';
import { Access } from 'src/v2/security/Access';

@Controller({
  version: '2',
  path: '/poll',
})
export class PollController {
  constructor (
    private pollService: PollService,
  ) {}

  @Access('questions.create')
  @Post('/questions')
  async createQuestion (
    @Body() body : CreateQuestionWithRolesDTO,
  ) {
    return this.pollService.createQuestions(body);
  }


  @Access('questions.delete')
  @Delete('/questions/:questionId')
  delete (
    @Param('questionId', QuestionByIdPipe) questionId: string,
  ) {
    return this.pollService.delete(questionId);
  }

  @Access('questions.update')
  @Patch('/questions/:questionId')
  update (
    @Param('questionId', QuestionByIdPipe) questionId: string,
    @Body() body: UpdateQuestionDTO,
  ) {
    return this.pollService.update(questionId, body);
  }

  @Get('/questions/:questionId')
  getQuestion (
    @Param('questionId', QuestionByIdPipe) questionId: string,
  ) {
    return this.pollService.getQuestion(questionId);
  }

  @Access('questions.roles.give')
  @Post('/questions/:questionId/roles')
  giveRole (
    @Param('questionId', QuestionByIdPipe) questionId: string,
    @Body() body: CreateQuestionRoleDTO,
  ) {
    return this.pollService.giveRole(body, questionId);
  }

  @Access('question.roles.delete')
  @Delete('/questions/:questionId/roles/:role')
  deleteRole (
    @Param(QuestionByRoleAndIdPipe) params,
  ) {
    return this.pollService.deleteRole(params.questionId, params.role);
  }

}