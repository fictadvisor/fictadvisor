import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { DisciplineTeacherService } from './DisciplineTeacherService';
import { CreateAnswersDTO } from './dto/CreateAnswersDTO';
import { JwtGuard } from '../../security/JwtGuard';
import { Permission } from '../../security/permission-guard/Permission';
import { PermissionGuard } from '../../security/permission-guard/PermissionGuard';
import { DisciplineTeacherByIdPipe } from './dto/DisciplineTeacherByIdPipe';

@Controller({
  version: '2',
  path: '/disciplineTeachers',
})
export class DisciplineTeacherController {
  constructor (
    private disciplineTeacherService: DisciplineTeacherService,
  ) {}

  @Get('/:disciplineTeacherId/questions')
  getQuestions (
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
  ) {
    return this.disciplineTeacherService.getQuestions(disciplineTeacherId);
  }

  @Permission('groups.$groupId.answers.send')
  @UseGuards(JwtGuard, PermissionGuard)
  @Post('/:disciplineTeacherId/answers')
  sendAnswers (
    @Param('disciplineTeacherId', DisciplineTeacherByIdPipe) disciplineTeacherId: string,
    @Request() req,
    @Body() body: CreateAnswersDTO,
  ) {
    return this.disciplineTeacherService.sendAnswers(disciplineTeacherId, body, req.user);
  }

}