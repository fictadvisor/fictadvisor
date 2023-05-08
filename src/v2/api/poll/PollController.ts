import { Body, Controller, Delete, Get, Patch, Param, Post } from '@nestjs/common';
import { PollService } from './PollService';
import { CreateQuestionWithRolesDTO } from './dto/CreateQuestionWithRolesDTO';
import { Access } from 'src/v2/security/Access';
import { QuestionByIdPipe } from './pipe/QuestionByIdPipe';
import { QuestionByRoleAndIdPipe } from './pipe/QuestionByRoleAndIdPipe';
import { UserByIdPipe } from '../user/UserByIdPipe';
import { QuestionMapper } from './QuestionMapper';
import { UpdateQuestionWithRolesDTO } from './dto/UpdateQuestionWithRolesDTO';
import { CreateQuestionRoleDTO } from './dto/CreateQuestionRoleDTO';

@Controller({
  version: '2',
  path: '/poll',
})
export class PollController {
  constructor (
    private pollService: PollService,
    private questionMapper: QuestionMapper,
  ) {}

  @Access('questions.create')
  @Post('/questions')
  async create (
    @Body() body : CreateQuestionWithRolesDTO,
  ) {
    const question = await this.pollService.create(body);
    return this.questionMapper.getQuestionWithRoles(question);
  }

  @Access('users.$userId.poll.teachers.get')
  @Get('/teachers/:userId')
  async getPollDisciplineTeachers (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    const teachers = await this.pollService.getDisciplineTeachers(userId);
    return {
      teachers,
    };
  }

  @Access('questions.delete')
  @Delete('/questions/:questionId')
  async delete (
    @Param('questionId', QuestionByIdPipe) questionId: string,
  ) {
    const question = await this.pollService.deleteById(questionId);
    return this.questionMapper.getQuestionWithRoles(question);
  }

  @Access('questions.update')
  @Patch('/questions/:questionId')
  async update (
    @Param('questionId', QuestionByIdPipe) questionId: string,
    @Body() body: UpdateQuestionWithRolesDTO,
  ) {
    const question = await this.pollService.updateById(questionId, body);
    return this.questionMapper.getQuestionWithRoles(question);
  }

  @Get('/questions/:questionId')
  async getQuestion (
    @Param('questionId', QuestionByIdPipe) questionId: string,
  ) {
    const question = await this.pollService.getQuestionById(questionId);
    return this.questionMapper.getQuestionWithRoles(question);
  }

  @Access('questions.roles.give')
  @Post('/questions/:questionId/roles')
  async giveRole (
    @Param('questionId', QuestionByIdPipe) questionId: string,
    @Body() body: CreateQuestionRoleDTO,
  ) {
    const question = await this.pollService.giveRole(body, questionId);
    return this.questionMapper.getQuestionWithRoles(question);
  }

  @Access('question.roles.delete')
  @Delete('/questions/:questionId/roles/:role')
  async deleteRole (
    @Param(QuestionByRoleAndIdPipe) params,
  ) {
    const question = await this.pollService.deleteRole(params.questionId, params.role);
    return this.questionMapper.getQuestionWithRoles(question);
  }

}