import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { DisciplineTeacherService } from './DisciplineTeacherService';
import { DisciplineTeacherMapper } from './DisciplineTeacherMapper';
import { CreateAnswersDTO } from './dto/CreateAnswersDTO';
import { GroupByDisciplineTeacherGuard } from 'src/v2/security/group-guard/GroupByDisciplineTeacherGuard';
import { Access } from 'src/v2/security/Access';
import { DisciplineTeacherByIdPipe } from './pipe/DisciplineTeacherByIdPipe';
import { TelegramGuard } from '../../security/TelegramGuard';
import { JwtGuard } from "../../security/JwtGuard";
import { ResponseDTO } from '../poll/dto/ResponseDTO';
import { TeacherByIdPipe } from './pipe/TeacherByIdPipe';
import { DisciplineByIdPipe } from '../discipline/pipe/DisciplineByIdPipe';
import { UpdateDisciplineTeacherDTO } from './dto/UpdateDisciplineTeacherDTO';

@Controller({
  version: '2',
  path: '/disciplineTeachers',
})
export class DisciplineTeacherController {
  constructor (
    private disciplineTeacherService: DisciplineTeacherService,
    private disciplineTeacherMapper: DisciplineTeacherMapper,
  ) {}

  @Access('groups.$groupId.questions.get', GroupByDisciplineTeacherGuard)
  @Get('/:disciplineTeacherId/questions')
  getQuestions (
    @Request() req,
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
  ) {
    return this.disciplineTeacherService.getQuestions(disciplineTeacherId, req.user.id);
  }

  @UseGuards(JwtGuard)
  @Get('/:teacherId/disciplines')
  async getDisciplines(
    @Request() req,
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    const dbDisciplineTeachers = await this.disciplineTeacherService.getUserDisciplineTeachers(teacherId, req.user.id);
    return this.disciplineTeacherMapper.getDisciplineTeachers(dbDisciplineTeachers);
  }

  @Access('groups.$groupId.answers.send', GroupByDisciplineTeacherGuard)
  @Post('/:disciplineTeacherId/answers')
  sendAnswers (
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
    @Request() req,
    @Body() body: CreateAnswersDTO,
  ) {
    return this.disciplineTeacherService.sendAnswers(disciplineTeacherId, body, req.user.id);
  }

  @UseGuards(TelegramGuard)
  @Post('/:disciplineTeacherId/responses')
  sendResponse (
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
    @Body() body: ResponseDTO
  ) {
    return this.disciplineTeacherService.sendResponse(disciplineTeacherId, body);
  }

  @Access('disciplineTeachers.create')
  @Post()
  create (
    @Body('teacherId', TeacherByIdPipe) teacherId,
    @Body('disciplineId', DisciplineByIdPipe) disciplineId,
    @Body() body: UpdateDisciplineTeacherDTO,
  ) {
    return this.disciplineTeacherService.create(teacherId, disciplineId, body.roles);
  }

  @Access('disciplineTeachers.update')
  @Patch('/:disciplineTeacherId/')
  updateById (
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
    @Body() body: UpdateDisciplineTeacherDTO,
  ) {
    return this.disciplineTeacherService.updateById(disciplineTeacherId, body.roles);
  }

  @Access('disciplineTeachers.update')
  @Patch()
  updateByTeacherAndDiscipline (
    @Query('teacherId', TeacherByIdPipe) teacherId : string,
    @Query('disciplineId', DisciplineByIdPipe) disciplineId : string,
    @Body() body: UpdateDisciplineTeacherDTO,
  ) {
    return this.disciplineTeacherService.updateByTeacherAndDiscipline(teacherId, disciplineId, body.roles);
  }

  @Access('disciplineTeachers.delete')
  @Delete('/:disciplineTeacherId/')
  deleteById (
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
  ) {
    return this.disciplineTeacherService.deleteById(disciplineTeacherId);
  }

  @Access('disciplineTeachers.delete')
  @Delete()
  deleteByTeacherAndDiscipline (
    @Query('teacherId', TeacherByIdPipe) teacherId : string,
    @Query('disciplineId', DisciplineByIdPipe) disciplineId : string,
  ) {
    return this.disciplineTeacherService.deleteByTeacherAndDiscipline(teacherId, disciplineId);
  }
}
