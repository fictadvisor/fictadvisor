import { Body, Controller, Delete, Get, Patch, Param, Post } from '@nestjs/common';
import { PollService } from '../services/PollService';
import { CreateQuestionWithRolesDTO } from '../dtos/CreateQuestionWithRolesDTO';
import { Access } from 'src/v2/security/Access';
import { QuestionByIdPipe } from '../pipes/QuestionByIdPipe';
import { QuestionByRoleAndIdPipe } from '../pipes/QuestionByRoleAndIdPipe';
import { UserByIdPipe } from '../pipes/UserByIdPipe';
import { QuestionMapper } from '../../mappers/QuestionMapper';
import { UpdateQuestionWithRolesDTO } from '../dtos/UpdateQuestionWithRolesDTO';
import { CreateQuestionRoleDTO } from '../dtos/CreateQuestionRoleDTO';
import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { QuestionWithRolesResponse } from '../responses/QuestionWithRolesResponse';
import { PollDisciplineTeachersResponse } from '../responses/PollDisciplineTeachersResponse';
import { TeacherRole } from '@prisma/client';


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
  @ApiBearerAuth()
  @Post('/questions')
  @ApiOkResponse({
    type: QuestionWithRolesResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidBodyException:\n
                  Visibility parameter is not a boolean
                  Visibility parameter can not be empty
                  Requirement parameter is not a boolean
                  Requirement parameter can not be empty`,
  })
  @ApiForbiddenResponse({
    description: `NoPermissionException:\n
                  You do not have permission to perform this action`,
  })
  async create (
    @Body() body : CreateQuestionWithRolesDTO,
  ) {
    const question = await this.pollService.create(body);
    return this.questionMapper.getQuestionWithRoles(question);
  }

  @Access('users.$userId.poll.teachers.get')
  @ApiBearerAuth()
  @Get('/teachers/:userId')
  @ApiOkResponse({
    type: [PollDisciplineTeachersResponse],
  })
  @ApiBadRequestResponse({
    description: `InvalidEntityIdException:\n 
                  User with such id is not found`,
  })
  @ApiForbiddenResponse({
    description: `NoPermissionException:\n
                  You do not have permission to perform this action`,
  })
  async getPollDisciplineTeachers (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return this.pollService.getDisciplineTeachers(userId);
  }

  @Access('questions.delete')
  @ApiBearerAuth()
  @Delete('/questions/:questionId')
  @ApiOkResponse({
    type: QuestionWithRolesResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidEntityIdException:\n
                  Question with such id is not found`,
  })
  @ApiForbiddenResponse({
    description: `NoPermissionException:\n
                  You do not have permission to perform this action`,
  })
  async delete (
    @Param('questionId', QuestionByIdPipe) questionId: string,
  ) {
    const question = await this.pollService.deleteById(questionId);
    return this.questionMapper.getQuestionWithRoles(question);
  }

  @Access('questions.update')
  @ApiBearerAuth()
  @Patch('/questions/:questionId')
  @ApiOkResponse({
    type: QuestionWithRolesResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidBodyException:Type is not an enum
                  InvalidEntityIdException: Question with such id is not found`,
  })
  @ApiForbiddenResponse({
    description: `NoPermissionException:\n
                  You do not have permission to perform this action`,
  })
  async update (
    @Param('questionId', QuestionByIdPipe) questionId: string,
    @Body() body: UpdateQuestionWithRolesDTO,
  ) {
    const question = await this.pollService.updateById(questionId, body);
    return this.questionMapper.getQuestionWithRoles(question);
  }

  @Get('/questions/:questionId')
  @ApiOkResponse({
    type: QuestionWithRolesResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidEntityIdException:\n
                  question with such id is not found`,
  })
  async getQuestion (
    @Param('questionId', QuestionByIdPipe) questionId: string,
  ) {
    const question = await this.pollService.getQuestionById(questionId);
    return this.questionMapper.getQuestionWithRoles(question);
  }

  @Access('questions.roles.give')
  @ApiBearerAuth()
  @Post('/questions/:questionId/roles')
  @ApiOkResponse({
    type: QuestionWithRolesResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidBodyException: Role can not be empty
                  InvalidBodyException: Visibility parameter is not a boolean
                  InvalidBodyException: Visibility parameter can not be empty
                  InvalidBodyException: Requirement parameter is not a boolean
                  InvalidEntityIdException: question with such id is not found`,
  })
  @ApiForbiddenResponse({
    description: `NoPermissionException:\n
                  You do not have permission to perform this action`,
  })
  async giveRole (
    @Param('questionId', QuestionByIdPipe) questionId: string,
    @Body() body: CreateQuestionRoleDTO,
  ) {
    const question = await this.pollService.giveRole(body, questionId);
    return this.questionMapper.getQuestionWithRoles(question);
  }

  @Access('question.roles.delete')
  @ApiBearerAuth()
  @Delete('/questions/:questionId/roles/:role')
  @ApiParam({
    name: 'role',
    enum: [TeacherRole.LECTURER, TeacherRole.LABORANT, TeacherRole.PRACTICIAN],
    required: true,
  })
  @ApiParam({
    name: 'questionId',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: QuestionWithRolesResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidEntityIdException:\n
                  Question with such id is not found
                  QuestionRole is not found`,
  })
  @ApiForbiddenResponse({
    description: `NoPermissionException:\n
                  You do not have permission to perform this action`,
  })
  async deleteRole (
    @Param(QuestionByRoleAndIdPipe) params,
  ) {
    const question = await this.pollService.deleteRole(params.questionId, params.role);
    return this.questionMapper.getQuestionWithRoles(question);
  }

}