import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { SubjectService } from './SubjectService';
import { GetDTO } from '../teacher/dto/GetDTO';
import { CreateSubjectDTO } from './dto/CreateSubjectDTO';
import { SubjectByIdPipe } from './SubjectByIdPipe';
import { Subject } from '@prisma/client';
import { Permission } from '../../security/permission-guard/Permission';
import { JwtGuard } from '../../security/JwtGuard';

@Controller({
  version: '2',
  path: '/subjects',
})
export class SubjectController {
  constructor(
    private subjectService: SubjectService,
  ) {}

  @Get()
  getAll(@Query() body: GetDTO<Subject>) {
    return this.subjectService.getAll(body);
  }

  @Get('/:subjectId')
  get(
    @Param('subjectId', SubjectByIdPipe) subject: Subject
  ) {
    return subject;
  }

  @Post()
  create(@Body() body: CreateSubjectDTO) {
    return this.subjectService.create(body);
  }

  @UseGuards(JwtGuard)
  @Delete('/:subjectId')
  delete(
    @Param('subjectId', SubjectByIdPipe) subject: Subject
  ) {
    return this.subjectService.deleteSubject(subject.id);
  }
}