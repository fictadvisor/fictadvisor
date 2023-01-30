import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards, Patch } from '@nestjs/common';
import { DisciplineTeacherService } from "./DisciplineTeacherService";
import { CreateAnswersDTO } from "./dto/CreateAnswersDTO";
import { JwtGuard } from "../../security/JwtGuard";

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
    @Param('disciplineTeacherId') disciplineTeacherId: string,
  ) {
    return this.disciplineTeacherService.getQuestions(disciplineTeacherId);
  }

  @UseGuards(JwtGuard)
  @Post('/:disciplineTeacherId/answers')
  sendAnswers(
    @Param('disciplineTeacherId') disciplineTeacherId: string,
    @Request() req,
    @Body() body: CreateAnswersDTO,
  ) {
    return this.disciplineTeacherService.sendAnswers(disciplineTeacherId, body, req.user);
  }

}