import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { DisciplineTeacherService } from "./DisciplineTeacherService";
import { CreateAnswersDTO } from "./dto/CreateAnswersDTO";
import { GroupByDisciplineTeacherGuard } from 'src/v2/security/group-guard/GroupByDisciplineTeacherGuard';
import { DisciplineTeacherByIdPipe } from './dto/DisciplineTeacherByIdPipe';
import { Access } from 'src/v2/security/Access';

@Controller({
  version: '2',
  path: '/disciplineTeachers',
})
export class DisciplineTeacherController{
  constructor(
    private disciplineTeacherService: DisciplineTeacherService,
  ) {}

  @Get('/:disciplineTeacherId/questions')
  getQuestions(
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
  ) {
    return this.disciplineTeacherService.getQuestions(disciplineTeacherId);
  }

  @Access('groups.$groupId.answers.send', GroupByDisciplineTeacherGuard)
  @Post('/:disciplineTeacherId/answers')
  sendAnswers(
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
    @Request() req,
    @Body() body: CreateAnswersDTO,
  ) {
    return this.disciplineTeacherService.sendAnswers(disciplineTeacherId, body, req.user);
  }

}