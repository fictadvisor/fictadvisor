import { Body, Controller, Delete, Get, Patch, Param, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateQuestionRoleDTO,
  QueryAllDisciplineTeacherForPollDTO,
  QueryAllQuestionDTO,
  CreateQuestionDTO,
  UpdateQuestionDTO,
} from '@fictadvisor/utils/requests';
import {
  QuestionWithRolesResponse,
  PollDisciplineTeachersResponse,
  QuestionResponse,
  PaginatedQuestionsResponse,
} from '@fictadvisor/utils/responses';
import { PERMISSION } from '@fictadvisor/utils/security';
import { ApiEndpoint } from 'src/v2/utils/documentation/decorators';
import { TelegramGuard } from '../../security/TelegramGuard';
import { QuestionByIdPipe } from '../pipes/QuestionByIdPipe';
import { QuestionByRoleAndIdPipe } from '../pipes/QuestionByRoleAndIdPipe';
import { UserByIdPipe } from '../pipes/UserByIdPipe';
import { QuestionMapper } from '../../mappers/QuestionMapper';
import { PollService } from '../services/PollService';
import { TeacherRole } from '@prisma/client';

@ApiTags('Poll')
@Controller({
  version: '2',
  path: '/poll',
})
export class PollController {
  constructor (
    private pollService: PollService,
    private questionMapper: QuestionMapper,
  ) {}

  @ApiOkResponse({
    type: PaginatedQuestionsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Page must be a number
      PageSize must be a number
      Sort must be an enum
      Wrong value for order
      Each answer type should be an enum
      Answer types must be an array`,
  })
  @ApiEndpoint({
    summary: 'Get all questions',
  })
  @Get('/questions')
  async getAll (
    @Query() query: QueryAllQuestionDTO,
  ) {
    const questions = await this.pollService.getAll(query);
    return {
      questions: this.questionMapper.getQuestions(questions.data),
      pagination: questions.pagination,
    };
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: QuestionResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Order is too short (min: 1)
      Order is too long (max: 50)
      Order cannot be empty
      Name is too short (min: 5)
      Name is too long (max: 50)
      Name cannot be empty
      Text is too short (min: 5)
      Text is too long (max: 250)
      Text cannot be empty
      Category is too short (min: 5)
      Category is too long (max: 50)
      Category cannot be empty
      Description is too long (max: 2000)
      Criteria is too long (max: 2000)
      Type must be an enum
      Display must be an enum
      Requirement parameter cannot be empty
      Requirement parameter must be a boolean`,
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
  @ApiEndpoint({
    summary: 'Create a new question',
    permissions: PERMISSION.QUESTIONS_CREATE,
  })
  @Post('/questions')
  async create (
    @Body() body: CreateQuestionDTO,
  ) {
    const question = await this.pollService.create(body);
    return this.questionMapper.getQuestion(question);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: PollDisciplineTeachersResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Sort must be an enum
      Wrong value for order
    
    InvalidEntityIdException:
      User with such id is not found`,
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
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'Id of user`s role to get teacher of his discipline',
  })
  @ApiEndpoint({
    summary: 'Get teachers that were polled by the user',
    permissions: PERMISSION.USERS_$USERID_POLL_TEACHERS_GET,
    guards: TelegramGuard,
  })
  @Get('/teachers/:userId')
  async getPollDisciplineTeachers (
    @Param('userId', UserByIdPipe) userId: string,
    @Query() query: QueryAllDisciplineTeacherForPollDTO,
  ): Promise<PollDisciplineTeachersResponse> {
    return this.pollService.getDisciplineTeachers(userId, query);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: QuestionResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Question with such id is not found`,
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
  @ApiParam({
    name: 'questionId',
    required: true,
    description: 'Id of question you want to delete',
  })
  @ApiEndpoint({
    summary: 'Delete question by Id',
    permissions: PERMISSION.QUESTIONS_DELETE,
  })
  @Delete('/questions/:questionId')
  async delete (
    @Param('questionId', QuestionByIdPipe) questionId: string,
  ) {
    const question = await this.pollService.deleteById(questionId);
    return this.questionMapper.getQuestion(question);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: QuestionResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Order is too short (min: 1)
      Order is too long (max: 50)
      Order cannot be empty
      Name is too short (min: 5)
      Name is too long (max: 50)
      Name cannot be empty
      Text is too short (min: 5)
      Text is too long (max: 250)
      Text cannot be empty
      Category is too short (min: 5)
      Category is too long (max: 50)
      Category cannot be empty
      Description is too long (max: 2000)
      Criteria is too long (max: 2000)
      Type must be an enum
      Display must be an enum
      Requirement parameter cannot be empty
      Requirement parameter must be a boolean

    InvalidEntityIdException:
      Question with such id is not found`,
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
  @ApiParam({
    name: 'questionId',
    required: true,
    description: 'Id of question you want to update',
  })
  @ApiEndpoint({
    summary: 'Request to update information about the question',
    permissions: PERMISSION.QUESTIONS_UPDATE,
  })
  @Patch('/questions/:questionId')
  async update (
    @Param('questionId', QuestionByIdPipe) questionId: string,
    @Body() body: UpdateQuestionDTO,
  ) {
    const question = await this.pollService.updateById(questionId, body);
    return this.questionMapper.getQuestion(question);
  }

  @ApiOkResponse({
    type: QuestionWithRolesResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Question with such id is not found`,
  })
  @ApiParam({
    name: 'questionId',
    required: true,
    description: 'Id of question you want to get',
  })
  @ApiEndpoint({
    summary: 'Request to get a question by ID',
  })
  @Get('/questions/:questionId')
  async getQuestion (
    @Param('questionId', QuestionByIdPipe) questionId: string,
  ) {
    const question = await this.pollService.getQuestionById(questionId);
    return this.questionMapper.getQuestionWithRoles(question);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: QuestionWithRolesResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException: 
      Role cannot be empty
      Visibility must be boolean
      Visibility cannot be empty
      Requirement must be boolean

    InvalidEntityIdException:
      Question with such id is not found`,
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
  @ApiParam({
    name: 'questionId',
    required: true,
    description: 'Id of the question to which you want to attach the role',
  })
  @ApiEndpoint({
    summary: 'Give the role to the question by id',
    permissions: PERMISSION.QUESTIONS_ROLES_GIVE,
  })
  @Post('/questions/:questionId/roles')
  async giveRole (
    @Param('questionId', QuestionByIdPipe) questionId: string,
    @Body() body: CreateQuestionRoleDTO,
  ) {
    const question = await this.pollService.giveRole(body, questionId);
    return this.questionMapper.getQuestionWithRoles(question);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: QuestionWithRolesResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Question with such id is not found
      QuestionRole was not found`,
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
  @ApiParam({
    name: 'role',
    enum: [TeacherRole.LECTURER, TeacherRole.LABORANT, TeacherRole.PRACTICIAN],
    required: true,
    description: 'Question`s role, that you want to delete',
  })
  @ApiParam({
    name: 'questionId',
    type: String,
    required: true,
    description: 'Id of question, where you want to delete role',
  })
  @ApiEndpoint({
    summary: 'Request to delete attached role in question',
    permissions: PERMISSION.QUESTIONS_ROLES_DELETE,
  })
  @Delete('/questions/:questionId/roles/:role')
  async deleteRole (
    @Param(QuestionByRoleAndIdPipe) params: { questionId: string, role: TeacherRole },
  ) {
    const question = await this.pollService.deleteRole(params.questionId, params.role);
    return this.questionMapper.getQuestionWithRoles(question);
  }
}
