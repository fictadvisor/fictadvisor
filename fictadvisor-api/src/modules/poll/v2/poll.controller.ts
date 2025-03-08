import { Body, Controller, Delete, Get, Patch, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateQuestionRoleDTO,
  QueryAllDisciplineTeachersForPollDTO,
  QueryAllQuestionsDTO,
  CreateQuestionDTO,
  UpdateQuestionDTO,
} from '@fictadvisor/utils/requests';
import {
  PaginatedQuestionsResponse,
  PollDisciplineTeachersResponse,
  QuestionWithCategoriesAndRolesResponse,
} from '@fictadvisor/utils/responses';
import { PERMISSION } from '@fictadvisor/utils/security';
import { ApiEndpoint } from '../../../common/decorators/api-endpoint.decorator';
import { TelegramGuard } from '../../../common/guards/telegram/telegram.guard';
import { QuestionByIdPipe } from '../../../common/pipes/question-by-id.pipe';
import { QuestionByRoleAndIdPipe } from '../../../common/pipes/question-by-role-and-id.pipe';
import { UserByIdPipe } from '../../../common/pipes/user-by-id.pipe';
import { PollService } from './poll.service';
import { DisciplineTypeEnum, QuestionWithCategoryResponse } from '@fictadvisor/utils';
import { PollDocumentation } from '../../../common/documentation/modules/v2/poll';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { DbQuestion } from '../../../database/v2/entities/question.entity';
import { DbQuestionWithRoles } from '../../../database/v2/entities/question-with-roles.entity';

@ApiTags('Poll')
@Controller({
  version: '2',
  path: '/poll',
})
export class PollController {
  constructor (
    private pollService: PollService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  @ApiEndpoint({
    summary: 'Get all questions',
    documentation: PollDocumentation.GET_ALL,
  })
  @Get('/questions')
  async getAll (
    @Query() query: QueryAllQuestionsDTO,
  ): Promise<PaginatedQuestionsResponse> {
    const questions = await this.pollService.getAll(query);
    return {
      questions: this.mapper.mapArray(questions.data, DbQuestion, QuestionWithCategoryResponse),
      pagination: questions.pagination,
    };
  }

  @ApiEndpoint({
    summary: 'Create a new question',
    documentation: PollDocumentation.CREATE,
    permissions: PERMISSION.QUESTIONS_CREATE,
  })
  @Post('/questions')
  async create (
    @Body() body: CreateQuestionDTO,
  ): Promise<QuestionWithCategoryResponse> {
    const question = await this.pollService.create(body);
    return this.mapper.map(question, DbQuestion, QuestionWithCategoryResponse);
  }

  @ApiEndpoint({
    summary: 'Get teachers that were polled by the user',
    documentation: PollDocumentation.GET_POLL_DISCIPLINE_TEACHERS,
    permissions: PERMISSION.USERS_$USERID_POLL_TEACHERS_GET,
    guards: TelegramGuard,
  })
  @Get('/teachers/:userId')
  async getPollDisciplineTeachers (
    @Param('userId', UserByIdPipe) userId: string,
    @Query() query: QueryAllDisciplineTeachersForPollDTO,
  ): Promise<PollDisciplineTeachersResponse> {
    return this.pollService.getDisciplineTeachers(userId, query);
  }

  @ApiEndpoint({
    summary: 'Delete question by Id',
    documentation: PollDocumentation.DELETE,
    permissions: PERMISSION.QUESTIONS_DELETE,
  })
  @Delete('/questions/:questionId')
  async delete (
    @Param('questionId', QuestionByIdPipe) questionId: string,
  ): Promise<QuestionWithCategoryResponse> {
    const question = await this.pollService.deleteById(questionId);
    return this.mapper.map(question, DbQuestion, QuestionWithCategoryResponse);
  }

  @ApiEndpoint({
    summary: 'Request to update information about the question',
    documentation: PollDocumentation.UPDATE,
    permissions: PERMISSION.QUESTIONS_UPDATE,
  })
  @Patch('/questions/:questionId')
  async update (
    @Param('questionId', QuestionByIdPipe) questionId: string,
    @Body() body: UpdateQuestionDTO,
  ): Promise<QuestionWithCategoryResponse> {
    const question = await this.pollService.updateById(questionId, body);
    return this.mapper.map(question, DbQuestion, QuestionWithCategoryResponse);
  }

  @ApiEndpoint({
    summary: 'Request to get a question by ID',
    documentation: PollDocumentation.GET_QUESTION,
  })
  @Get('/questions/:questionId')
  async getQuestion (
    @Param('questionId', QuestionByIdPipe) questionId: string,
  ): Promise<QuestionWithCategoriesAndRolesResponse> {
    const question = await this.pollService.getQuestionById(questionId);
    return this.mapper.map(question, DbQuestionWithRoles, QuestionWithCategoriesAndRolesResponse);
  }

  @ApiEndpoint({
    summary: 'Give the role to the question by id',
    documentation: PollDocumentation.GIVE_ROLE,
    permissions: PERMISSION.QUESTIONS_ROLES_GIVE,
  })
  @Post('/questions/:questionId/roles')
  async giveRole (
    @Param('questionId', QuestionByIdPipe) questionId: string,
    @Body() body: CreateQuestionRoleDTO,
  ): Promise<QuestionWithCategoriesAndRolesResponse> {
    const question = await this.pollService.giveRole(body, questionId);
    return this.mapper.map(question, DbQuestionWithRoles, QuestionWithCategoriesAndRolesResponse);
  }

  @ApiEndpoint({
    summary: 'Request to delete attached role in question',
    documentation: PollDocumentation.DELETE_ROLE,
    permissions: PERMISSION.QUESTIONS_ROLES_DELETE,
  })
  @Delete('/questions/:questionId/roles/:questionRole')
  async deleteRole (
    @Param(QuestionByRoleAndIdPipe) params: { questionId: string, questionRole: DisciplineTypeEnum },
  ): Promise<QuestionWithCategoriesAndRolesResponse> {
    const question = await this.pollService.deleteRole(params.questionId, params.questionRole);
    return this.mapper.map(question, DbQuestionWithRoles, QuestionWithCategoriesAndRolesResponse);
  }
}
