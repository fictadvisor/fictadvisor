import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateAnswersDTO,
  CreateAnswersWithUserIdDTO,
  ResponseDTO,
  UpdateDisciplineTeacherDTO,
  UpdateCommentDTO,
  DeleteCommentDTO,
  QueryAllCommentsDTO, CreateDisciplineTeacherDTO,
} from '@fictadvisor/utils/requests';
import {
  DisciplineTeacherQuestionsResponse,
  CommentResponse,
  PaginatedCommentsResponse,
  QuestionAnswerResponse,
  DisciplineTeacherExtendedResponse,
} from '@fictadvisor/utils/responses';
import { PERMISSION } from '@fictadvisor/utils/security';
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
import { DisciplineTeacherDocumentation } from '../../utils/documentation/disciplineTeacher';
import { DisciplineTeacherMapper } from '../../mappers/DisciplineTeacherMapper';

@ApiTags('DisciplineTeacher')
@Controller({
  version: '2',
  path: '/disciplineTeachers',
})
export class DisciplineTeacherController {
  constructor (
    private disciplineTeacherService: DisciplineTeacherService,
    private disciplineTeacherMapper: DisciplineTeacherMapper,
    private questionMapper: QuestionMapper,
  ) {}

  @ApiEndpoint({
    summary: 'Get user\'s questions by disciplineTeacherId',
    documentation: DisciplineTeacherDocumentation.GET_QUESTIONS,
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

  @ApiEndpoint({
    summary: 'Get user\'s questions by disciplineTeacherId by telegram',
    documentation: DisciplineTeacherDocumentation.GET_QUESTIONS_BY_TELEGRAM,
    guards: [GroupByDisciplineTeacherGuard, TelegramGuard],
  })
  @Get('/:disciplineTeacherId/questions/telegram')
  getQuestionsByTelegram (
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
    @Query('userId', UserByIdPipe) userId: string,
  ): Promise<DisciplineTeacherQuestionsResponse> {
    return this.disciplineTeacherService.getQuestions(disciplineTeacherId, userId);
  }

  @ApiEndpoint({
    summary: 'Send question`s answers by user and disciplineTeacherId',
    documentation: DisciplineTeacherDocumentation.SEND_ANSWERS,
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

  @ApiEndpoint({
    summary: 'Send question`s answers by user and disciplineTeacherId',
    documentation: DisciplineTeacherDocumentation.SEND_ANSWERS_BY_TELEGRAM,
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

  @ApiEndpoint({
    summary: 'Send question`s response disciplineTeacherId',
    documentation: DisciplineTeacherDocumentation.SEND_RESPONSE,
    guards: TelegramGuard,
  })
  @Post('/:disciplineTeacherId/responses')
  async sendResponse (
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
    @Body('userId', UserByIdPipe) userId: string,
    @Body('questionId', QuestionByIdPipe) questionId: string,
    @Body() body: ResponseDTO,
  ): Promise<QuestionAnswerResponse> {
    const answer = await this.disciplineTeacherService.sendResponse(disciplineTeacherId, { ...body, userId, questionId });
    return this.disciplineTeacherMapper.getQuestionAnswer(answer);
  }

  @ApiEndpoint({
    summary: 'Create disciplineTeacher with roles',
    documentation: DisciplineTeacherDocumentation.CREATE,
    permissions: PERMISSION.DISCIPLINE_TEACHERS_CREATE,
  })
  @Post()
  async create (
    @Body('teacherId', TeacherByIdPipe) teacherId: string,
    @Body('disciplineId', DisciplineByIdPipe) disciplineId: string,
    @Body() body: CreateDisciplineTeacherDTO,
  ): Promise<DisciplineTeacherExtendedResponse> {
    const result = await this.disciplineTeacherService.create(teacherId, disciplineId, body.disciplineTypes);
    return this.disciplineTeacherMapper.getDisciplineTeacherExtended(result);
  }

  @ApiEndpoint({
    summary: 'Update disciplineTeacher with its id',
    documentation: DisciplineTeacherDocumentation.UPDATE_BY_ID,
    permissions: PERMISSION.DISCIPLINE_TEACHERS_UPDATE,
  })
  @Patch('/:disciplineTeacherId')
  async updateById (
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
    @Body() body: UpdateDisciplineTeacherDTO,
  ): Promise<DisciplineTeacherExtendedResponse> {
    const result = await this.disciplineTeacherService.updateById(disciplineTeacherId, body.disciplineTypes);
    return this.disciplineTeacherMapper.getDisciplineTeacherExtended(result);
  }

  @ApiEndpoint({
    summary: 'Update disciplineTeacher with teacherId and disciplineId',
    documentation: DisciplineTeacherDocumentation.UPDATE_BY_TEACHER_AND_DISCIPLINE,
    permissions: PERMISSION.DISCIPLINE_TEACHERS_UPDATE,
  })
  @Patch()
  async updateByTeacherAndDiscipline (
    @Query('teacherId', TeacherByIdPipe) teacherId : string,
    @Query('disciplineId', DisciplineByIdPipe) disciplineId : string,
    @Body() body: UpdateDisciplineTeacherDTO,
  ): Promise<DisciplineTeacherExtendedResponse> {
    const result = await this.disciplineTeacherService.updateByTeacherAndDiscipline(teacherId, disciplineId, body.disciplineTypes);
    return this.disciplineTeacherMapper.getDisciplineTeacherExtended(result);
  }

  @ApiEndpoint({
    summary: 'Delete disciplineTeacher by id',
    documentation: DisciplineTeacherDocumentation.DELETE_BY_ID,
    permissions: PERMISSION.DISCIPLINE_TEACHERS_DELETE,
  })
  @Delete('/:disciplineTeacherId')
  deleteById (
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
  ): Promise<void> {
    return this.disciplineTeacherService.deleteById(disciplineTeacherId);
  }

  @ApiEndpoint({
    summary: 'Delete DisciplineTeacher by teacherId and disciplineId',
    documentation: DisciplineTeacherDocumentation.DELETE_BY_TEACHER_ABD_DISCIPLINE,
    permissions: PERMISSION.DISCIPLINE_TEACHERS_DELETE,
  })
  @Delete()
  deleteByTeacherAndDiscipline (
    @Query('teacherId', TeacherByIdPipe) teacherId: string,
    @Query('disciplineId', DisciplineByIdPipe) disciplineId: string,
  ): Promise<void> {
    return this.disciplineTeacherService.deleteByTeacherAndDiscipline(teacherId, disciplineId);
  }

  @ApiEndpoint({
    summary: 'Remove DisciplineTeacher from poll by DisciplineTeacherId',
    documentation: DisciplineTeacherDocumentation.REMOVE_DISCIPLINE_TECHER_FROM_POLL,
    permissions: PERMISSION.GROUPS_$GROUPID_DISCIPLINE_TEACHERS_REMOVE,
    guards: GroupByDisciplineTeacherGuard,
  })
  @Post('/:disciplineTeacherId/removeFromPoll')
  removeDisciplineTeacherFromPoll (
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
    @Request() req,
  ): Promise<void> {
    return this.disciplineTeacherService.removeFromPoll(disciplineTeacherId, req.user.id);
  }

  @ApiEndpoint({
    summary: 'Gel all question answers with TEXT type (comments)',
    documentation: DisciplineTeacherDocumentation.GET_ALL_COMMENTS,
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

  @ApiEndpoint({
    summary: 'Update question answer with TEXT type (comment)',
    documentation: DisciplineTeacherDocumentation.UPDATE_COMMENT,
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

  @ApiEndpoint({
    summary: 'Delete question answer with TEXT type (comment)',
    documentation: DisciplineTeacherDocumentation.DELETE_COMMENT,
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
