import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreateAnswersDTO,
  CreateAnswersWithUserIdDTO,
  ResponseDTO,
  UpdateDisciplineTeacherDTO,
  CreateDisciplineTeacherDTO,
  UpdateCommentDTO,
  DeleteCommentDTO,
  QueryAllCommentsDTO,
} from '@fictadvisor/utils/requests';
import {
  DisciplineTeacherQuestionsResponse,
  QuestionAnswerResponse,
  DisciplineTeacherCreateResponse,
  CommentResponse,
  PaginatedCommentsResponse,
} from '@fictadvisor/utils/responses';
import { PERMISSION } from '@fictadvisor/utils/security';
import { Access } from 'src/v2/security/Access';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { TelegramGuard } from '../../security/TelegramGuard';
import { GroupByDisciplineTeacherGuard } from 'src/v2/security/group-guard/GroupByDisciplineTeacherGuard';
import { DisciplineTeacherByIdPipe } from '../pipes/DisciplineTeacherByIdPipe';
import { TeacherByIdPipe } from '../pipes/TeacherByIdPipe';
import { DisciplineByIdPipe } from '../pipes/DisciplineByIdPipe';
import { QuestionAnswersValidationPipe } from '../pipes/QuestionAnswersValidationPipe';
import { UserByIdPipe } from '../pipes/UserByIdPipe';
import { QuestionByIdPipe } from '../pipes/QuestionByIdPipe';
import { CommentByQuestionIdPipe } from '../pipes/CommentByQuestionIdPipe';
import { QuestionMapper } from '../../mappers/QuestionMapper';
import { DisciplineTeacherService } from '../services/DisciplineTeacherService';

@ApiTags('DisciplineTeacher')
@Controller({
  version: '2',
  path: '/disciplineTeachers',
})
export class DisciplineTeacherController {
  constructor (
    private disciplineTeacherService: DisciplineTeacherService,
    private questionMapper: QuestionMapper,
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DisciplineTeacherQuestionsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      DisciplineTeacher with such id is not found`,
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
    summary: 'Get user\'s questions by disciplineTeacherId',
    permissions: PERMISSION.GROUPS_$GROUPID_QUESTIONS_GET,
    guards: GroupByDisciplineTeacherGuard,
  })
  @Get('/:disciplineTeacherId/questions')
  getQuestions (
    @Request() req,
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
  ): Promise<DisciplineTeacherQuestionsResponse> {
    return this.disciplineTeacherService.getQuestions(disciplineTeacherId, req.user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DisciplineTeacherQuestionsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      DisciplineTeacher with such id is not found`,
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
    summary: 'Get user\'s questions by disciplineTeacherId by telegram',
    guards: [GroupByDisciplineTeacherGuard, TelegramGuard],
  })
  @Get('/:disciplineTeacherId/questions/telegram')
  getQuestionsByTelegram (
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
    @Query('userId', UserByIdPipe) userId: string,
  ): Promise<DisciplineTeacherQuestionsResponse> {
    return this.disciplineTeacherService.getQuestions(disciplineTeacherId, userId);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException: 
      Question id can not be empty
      Value can not be empty
      
    ExcessiveAnswerException: 
      There are excessive answers in the request
      
    NotEnoughAnswersException: 
      There are not enough answers
      
    AlreadyAnsweredException: 
      This question is already answered`,
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
    summary: 'Send question`s answers by user and disciplineTeacherId',
    permissions: PERMISSION.GROUPS_$GROUPID_ANSWERS_SEND,
    guards: GroupByDisciplineTeacherGuard,
  })
  @Post('/:disciplineTeacherId/answers')
  sendAnswers (
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
    @Request() req,
    @Body(QuestionAnswersValidationPipe) body: CreateAnswersDTO,
  ): Promise<void> {
    return this.disciplineTeacherService.sendAnswers(disciplineTeacherId, body, req.user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException: 
      Question id cannot be empty
      Value cannot be empty
      UserId cannot be empty
      
    InvalidEntityIdException:
      User with such id is not found
      
    ExcessiveAnswerException: 
      There are excessive answers in the request
      
    NotEnoughAnswersException: 
      There are not enough answers
      
    AlreadyAnsweredException: 
      This question is already answered`,
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
    summary: 'Send question`s answers by user and disciplineTeacherId',
    guards: [GroupByDisciplineTeacherGuard, TelegramGuard],
  })
  @Post('/:disciplineTeacherId/answers/telegram')
  sendAnswersByTelegram (
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
    @Body(QuestionAnswersValidationPipe) body: CreateAnswersWithUserIdDTO,
    @Body('userId', UserByIdPipe) userId: string,
  ): Promise<void> {
    return this.disciplineTeacherService.sendAnswers(disciplineTeacherId, body, userId);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: QuestionAnswerResponse,
  })
  @ApiForbiddenResponse({
    description: `
      NoPermissionException: You do not have permission to perform this action
    `,
  })
  @ApiBadRequestResponse({
    description: `
      InvalidBodyException: Question id can not be empty\n
      InvalidBodyException: Value can not be empty\n
      InvalidBodyException: User id can not be empty\n
      InvalidEntityIdException: disciplineTeacher with such id is not found
    `,
  })
  @UseGuards(TelegramGuard)
  @Post('/:disciplineTeacherId/responses')
  sendResponse (
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
    @Body() body: ResponseDTO
  ) {
    return this.disciplineTeacherService.sendResponse(disciplineTeacherId, body);
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: DisciplineTeacherCreateResponse,
  })
  @ApiForbiddenResponse({
    description: `
    NoPermissionException:
      You do not have permission to perform this action
    `,
  })
  @ApiBadRequestResponse({
    description: `
    InvalidEntityIdException:
      discipline with such id is not found
      teacher with such id is not found
      each value in roles must be one of the following values: LECTURER, LABORANT, PRACTICIAN
      roles must be an array
      roles should not be empty`,
  })
  @ApiBody({
    type: CreateDisciplineTeacherDTO,
  })
  @ApiEndpoint({
    summary: 'Create disciplineTeacher with roles',
    permissions: PERMISSION.DISCIPLINE_TEACHERS_CREATE,
  })
  @Post()
  create (
    @Body('teacherId', TeacherByIdPipe) teacherId: string,
    @Body('disciplineId', DisciplineByIdPipe) disciplineId: string,
    @Body() body: UpdateDisciplineTeacherDTO,
  ) {
    return this.disciplineTeacherService.create(teacherId, disciplineId, body.roles);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DisciplineTeacherCreateResponse,
  })
  @ApiForbiddenResponse({
    description: `
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiBadRequestResponse({
    description: `
    InvalidEntityIdException:
      disciplineTeacher with such id is not found
      each value in roles must be one of the following values: LECTURER, LABORANT, PRACTICIAN
      roles must be an array
      roles should not be empty`,
  })
  @ApiEndpoint({
    summary: 'Update disciplineTeacher with its id',
    permissions: PERMISSION.DISCIPLINE_TEACHERS_UPDATE,
  })
  @Patch('/:disciplineTeacherId')
  updateById (
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
    @Body() body: UpdateDisciplineTeacherDTO,
  ) {
    return this.disciplineTeacherService.updateById(disciplineTeacherId, body.roles);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DisciplineTeacherCreateResponse,
  })
  @ApiForbiddenResponse({
    description: `
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiBadRequestResponse({
    description: `
    InvalidEntityIdException: 
      discipline with such id is not found
      teacher with such id is not found
      each value in roles must be one of the following values: LECTURER, LABORANT, PRACTICIAN
      roles must be an array
      roles should not be empty`,
  })
  @ApiEndpoint({
    summary: 'Update disciplineTeacher with teacherId and disciplineId',
    permissions: PERMISSION.DISCIPLINE_TEACHERS_UPDATE,
  })
  @Patch()
  updateByTeacherAndDiscipline (
    @Query('teacherId', TeacherByIdPipe) teacherId : string,
    @Query('disciplineId', DisciplineByIdPipe) disciplineId : string,
    @Body() body: UpdateDisciplineTeacherDTO,
  ) {
    return this.disciplineTeacherService.updateByTeacherAndDiscipline(teacherId, disciplineId, body.roles);
  }

  @ApiBearerAuth()
  @ApiForbiddenResponse({
    description: `
      NoPermissionException: You do not have permission to perform this action
    `,
  })
  @ApiBadRequestResponse({
    description: `
      InvalidEntityIdException: disciplineTeacher with such id is not found\n
    `,
  })
  @Access(PERMISSION.DISCIPLINE_TEACHERS_DELETE)
  @Delete('/:disciplineTeacherId')
  deleteById (
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
  ) {
    return this.disciplineTeacherService.deleteById(disciplineTeacherId);
  }

  @ApiBearerAuth()
  @ApiForbiddenResponse({
    description: `
      NoPermissionException: You do not have permission to perform this action
    `,
  })
  @ApiBadRequestResponse({
    description: `
      InvalidEntityIdException: discipline with such id is not found\n
      InvalidEntityIdException: teacher with such id is not found\n
    `,
  })
  @Access(PERMISSION.DISCIPLINE_TEACHERS_DELETE)
  @Delete()
  deleteByTeacherAndDiscipline (
    @Query('teacherId', TeacherByIdPipe) teacherId: string,
    @Query('disciplineId', DisciplineByIdPipe) disciplineId: string,
  ) {
    return this.disciplineTeacherService.deleteByTeacherAndDiscipline(teacherId, disciplineId);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiForbiddenResponse({
    description: `
      NoPermissionException: You do not have permission to perform this action
    `,
  })
  @ApiBadRequestResponse({
    description: `
      NotSelectedDisciplineException: Current discipline is not selected by this student
    `,
  })
  @Access(PERMISSION.GROUPS_$GROUPID_DISCIPLINE_TEACHERS_REMOVE, GroupByDisciplineTeacherGuard)
  @Post('/:disciplineTeacherId/removeFromPoll')
  removeDisciplineTeacherFromPoll (
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
    @Request() req,
  ) {
    return this.disciplineTeacherService.removeFromPoll(disciplineTeacherId, req.user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: PaginatedCommentsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException: 
      Page must be a number
      PageSize must be a number
      Sort must be an enum
      Wrong value for order
      Each value of semesters must be an studying semester`,
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
    summary: 'Gel all question answers with TEXT type (comments)',
    permissions: PERMISSION.COMMENTS_GET,
  })
  @Get('/comments')
  async getAllComments (
    @Query() query: QueryAllCommentsDTO,
  ): Promise<PaginatedCommentsResponse> {
    const commentsWithPagination = await this.disciplineTeacherService.getAllComments(query);
    const comments = this.questionMapper.getComments(commentsWithPagination.data);
    return {
      comments,
      pagination: commentsWithPagination.pagination,
    };
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: CommentResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      User with such id is not found
      Question with such id is not found
      DisciplineTeacher with such id is not found
      
    InvalidTypeException
      Question has wrong type 
    
    InvalidBodyException:
      UserId should not be empty
      QuestionId should not be empty
      Comment should not be empty
      Comment must be a string
      Comment is too short (min: 4)
      Comment is too long (max: 4000)`,
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
    name: 'disciplineTeacherId',
    required: true,
    description: 'Discipline teacher id',
  })
  @ApiEndpoint({
    summary: 'Update question answer with TEXT type (comment)',
    permissions: PERMISSION.COMMENTS_UPDATE,
  })
  @Patch('/:disciplineTeacherId/comments')
  async updateComment (
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
    @Body() body: UpdateCommentDTO,
    @Body('userId', UserByIdPipe) userId: string,
    @Body('questionId', QuestionByIdPipe, CommentByQuestionIdPipe) questionId: string,
  ): Promise<CommentResponse> {
    const comment = await this.disciplineTeacherService.updateComment({ disciplineTeacherId, userId, questionId }, body.comment);
    return this.questionMapper.getComment(comment);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: CommentResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      User with such id is not found
      Question with such id is not found
      DisciplineTeacher with such id is not found
      
    InvalidTypeException
      Question has wrong type
      
    InvalidBodyException:
      UserId should not be empty
      QuestionId should not be empty`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException: 
      You do not have permission to perform this action`,
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
    name: 'disciplineTeacherId',
    required: true,
    description: 'Discipline teacher id',
  })
  @ApiEndpoint({
    summary: 'Delete question answer with TEXT type (comment)',
    permissions: PERMISSION.COMMENTS_DELETE,
  })
  @Delete('/:disciplineTeacherId/comments')
  async deleteComment (
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
    @Body() body: DeleteCommentDTO,
    @Body('userId', UserByIdPipe) userId: string,
    @Body('questionId', QuestionByIdPipe, CommentByQuestionIdPipe) questionId: string,
  ): Promise<CommentResponse> {
    const comment = await this.disciplineTeacherService.deleteQuestionAnswer({ disciplineTeacherId, userId, questionId });
    return this.questionMapper.getComment(comment);
  }
}
