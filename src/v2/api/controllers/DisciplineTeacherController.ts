import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { DisciplineTeacherService } from '../services/DisciplineTeacherService';
import { CreateAnswersDTO } from '../dtos/CreateAnswersDTO';
import { GroupByDisciplineTeacherGuard } from 'src/v2/security/group-guard/GroupByDisciplineTeacherGuard';
import { Access } from 'src/v2/security/Access';
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
  ApiTags,
} from '@nestjs/swagger';
import { DisciplineTeacherQuestionsResponse } from '../responses/DisciplineTeacherQuestionsResponse';
import { QuestionAnswerResponse } from '../responses/QuestionAnswerResponse';
import { DisciplineTeacherCreateResponse } from '../responses/DisciplineTeacherCreateResponse';
import { CreateDisciplineTeacherDTO } from '../dtos/CreateDisciplineTeacherDTO';

@ApiTags('DisciplineTeacher')
@Controller({
  version: '2',
  path: '/disciplineTeachers',
})
export class DisciplineTeacherController {
  constructor (
    private disciplineTeacherService: DisciplineTeacherService,
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
  @Access('groups.$groupId.questions.get', GroupByDisciplineTeacherGuard)
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
  @Access('groups.$groupId.answers.send', GroupByDisciplineTeacherGuard)
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
  @Access('disciplineTeachers.create')
  @Post()
  create (
    @Body('teacherId', TeacherByIdPipe) teacherId,
    @Body('disciplineId', DisciplineByIdPipe) disciplineId,
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
  @Access('disciplineTeachers.update')
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
  @Access('disciplineTeachers.update')
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
  @Access('disciplineTeachers.delete')
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
  @Access('disciplineTeachers.delete')
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
  @Access('groups.$groupId.disciplineTeachers.remove', GroupByDisciplineTeacherGuard)
  @Post('/:disciplineTeacherId/removeFromPoll')
  removeDisciplineTeacherFromPoll (
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
    @Request() req,
  ) {
    return this.disciplineTeacherService.removeFromPoll(disciplineTeacherId, req.user.id);
  }
}
