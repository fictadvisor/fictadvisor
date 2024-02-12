import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { DisciplineTeacherService } from '../services/DisciplineTeacherService';
import { CreateAnswersDTO } from '../dtos/CreateAnswersDTO';
import { GroupByDisciplineTeacherGuard } from 'src/v2/security/group-guard/GroupByDisciplineTeacherGuard';
import { Access } from 'src/v2/security/Access';
import { PERMISSION } from '../../security/PERMISSION';
import { DisciplineTeacherByIdPipe } from '../pipes/DisciplineTeacherByIdPipe';
import { TelegramGuard } from '../../security/TelegramGuard';
import { ResponseDTO } from '../dtos/ResponseDTO';
import { TeacherByIdPipe } from '../pipes/TeacherByIdPipe';
import { DisciplineByIdPipe } from '../pipes/DisciplineByIdPipe';
import { UpdateDisciplineTeacherDTO } from '../dtos/UpdateDisciplineTeacherDTO';
import { QuestionAnswersValidationPipe } from '../pipes/QuestionAnswersValidationPipe';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DisciplineTeacherQuestionsResponse } from '../responses/DisciplineTeacherQuestionsResponse';
import { QuestionAnswerResponse } from '../responses/QuestionAnswerResponse';
import { DisciplineTeacherCreateResponse } from '../responses/DisciplineTeacherCreateResponse';
import { CreateDisciplineTeacherDTO } from '../dtos/CreateDisciplineTeacherDTO';
import { UpdateCommentDTO } from '../dtos/UpdateCommentDTO';
import { CommentResponse } from '../responses/CommentResponse';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { QuestionMapper } from '../../mappers/QuestionMapper';
import { DeleteCommentDTO } from '../dtos/DeleteCommentDTO';
import { UserByIdPipe } from '../pipes/UserByIdPipe';
import { QuestionByIdPipe } from '../pipes/QuestionByIdPipe';
import { CommentByQuestionIdPipe } from '../pipes/CommentByQuestionIdPipe';
import { QueryAllCommentsDTO } from '../dtos/QueryAllCommentsDTO';
import { PaginatedCommentsResponse } from '../responses/PaginatedCommentsResponse';

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
    description: `
      InvalidEntityIdException: disciplineTeacher with such id is not found
    `,
  })
  @ApiForbiddenResponse({
    description: `
      NoPermissionException: You do not have permission to perform this action
    `,
  })
  @Access(PERMISSION.GROUPS_$GROUPID_QUESTIONS_GET, GroupByDisciplineTeacherGuard)
  @Get('/:disciplineTeacherId/questions')
  getQuestions (
    @Request() req,
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
  ) {
    return this.disciplineTeacherService.getQuestions(disciplineTeacherId, req.user.id);
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
      InvalidBodyException: Question id can not be empty\n
      InvalidBodyException: Value can not be empty\n
      ExcessiveAnswerException: There are excessive answers in the request\n
      NotEnoughAnswersException: There are not enough answers\n
      AlreadyAnsweredException: This question is already answered    
    `,
  })
  @Access(PERMISSION.GROUPS_$GROUPID_ANSWERS_SEND, GroupByDisciplineTeacherGuard)
  @Post('/:disciplineTeacherId/answers')
  sendAnswers (
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
    @Request() req,
    @Body(QuestionAnswersValidationPipe) body: CreateAnswersDTO,
  ) {
    return this.disciplineTeacherService.sendAnswers(disciplineTeacherId, body, req.user.id);
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
  @ApiOkResponse({
    type: DisciplineTeacherCreateResponse,
  })
  @ApiForbiddenResponse({
    description: `
      NoPermissionException: You do not have permission to perform this action
    `,
  })
  @ApiBadRequestResponse({
    description: `
      InvalidEntityIdException: discipline with such id is not found\n
      InvalidEntityIdException: teacher with such id is not found\n
      InvalidBodyException: each value in roles must be one of the following values: LECTURER, LABORANT, PRACTICIAN\n
      InvalidBodyException: roles must be an array\n
      InvalidBodyException: roles should not be empty
    `,
  })
  @ApiBody({
    type: CreateDisciplineTeacherDTO,
  })
  @Access(PERMISSION.DISCIPLINE_TEACHERS_CREATE)
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
      NoPermissionException: You do not have permission to perform this action
    `,
  })
  @ApiBadRequestResponse({
    description: `
      InvalidEntityIdException: disciplineTeacher with such id is not found\n
      InvalidBodyException: each value in roles must be one of the following values: LECTURER, LABORANT, PRACTICIAN\n
      InvalidBodyException: roles must be an array\n
      InvalidBodyException: roles should not be empty
    `,
  })
  @Access(PERMISSION.DISCIPLINE_TEACHERS_UPDATE)
  @Patch('/:disciplineTeacherId/')
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
      NoPermissionException: You do not have permission to perform this action
    `,
  })
  @ApiBadRequestResponse({
    description: `
      InvalidEntityIdException: discipline with such id is not found\n
      InvalidEntityIdException: teacher with such id is not found\n
      InvalidBodyException: each value in roles must be one of the following values: LECTURER, LABORANT, PRACTICIAN\n
      InvalidBodyException: roles must be an array\n
      InvalidBodyException: roles should not be empty
    `,
  })
  @Access(PERMISSION.DISCIPLINE_TEACHERS_UPDATE)
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
  @Delete('/:disciplineTeacherId/')
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
