import { Body, Controller, Delete, Get, Patch, Param, Put, Post, Request, UseGuards } from '@nestjs/common';
import { PollService } from './PollService';
import { JwtGuard } from '../../security/JwtGuard';
import { GroupByDisciplineTeacherGuard } from '../../security/group-guard/GroupByDisciplineTeacherGuard';
import { CreateAnswersDTO } from "../teacher/dto/CreateAnswersDTO";
import { UpdateQuestionDTO } from "./dto/UpdateQuestionDTO";
import { CreateQuestionsDTO } from "./dto/CreateQuestionDTO";
import { QuestionRoleData } from "./dto/QuestionRoleData";
import { Permission } from "../../security/permission-guard/Permission";
import { PermissionGuard } from "../../security/permission-guard/PermissionGuard";
import { QuestionByIdPipe } from "./dto/QuestionByIdPipe";
import { QuestionByRoleAndIdPipe } from "./dto/QuestionByRoleAndIdPipe";
import { DisciplineTeacherByIdPipe } from "../teacher/dto/DisciplineTeacherByIdPipe";

@Controller({
  version: '2',
  path: '/poll',
})
export class PollController {
  constructor(
    private pollService: PollService,
  ) {}

  @Permission('groups.$groupsId.answers.create')
  @UseGuards(JwtGuard, GroupByDisciplineTeacherGuard, PermissionGuard)
  @Put('/answers/:disciplineTeacherId')
  async createAnswers(
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
    @Request() req,
    @Body() body: CreateAnswersDTO,
  ) {
    return this.pollService.createAnswers(req.user.id, disciplineTeacherId, body);
  }

  @Permission('questions.create')
  @UseGuards(JwtGuard, PermissionGuard)
  async createQuestion(
      @Body() body : CreateQuestionsDTO,
      ) {
    return this.pollService.createQuestions(body);
  }

  @Permission('questions.delete')
  @UseGuards(JwtGuard, PermissionGuard)
  @Delete('/:questionId')
  delete(
      @Param('questionId', QuestionByIdPipe) questionId: string,
  ) {
    return this.pollService.delete(questionId);
  }

  @Permission('questions.update')
  @UseGuards(JwtGuard, PermissionGuard)
  @Patch('/:questionId')
  update(
      @Param('questionId', QuestionByIdPipe) questionId: string,
      @Body() body: UpdateQuestionDTO,
  ) {
    return this.pollService.update(questionId, body);
  }

  @UseGuards(JwtGuard)
  @Get('/:questionId')
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
  @Post('/questions/:questionId/roles/:role')
  deleteRole(
      @Param(QuestionByRoleAndIdPipe) params,
  ){
    return this.pollService.deleteRole(params.questionId, params.role);
  }

}