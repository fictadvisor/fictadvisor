import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SubjectService } from './SubjectService';
import { GetDTO } from '../teacher/dto/GetDTO';
import { CreateSubjectDTO } from './dto/CreateSubjectDTO';

@Controller({
  version: '2',
  path: '/subjects'
})
export class SubjectController {
  constructor(
    private subjectService: SubjectService,
  ) {}

  @Get()
  getAll(@Body() body: GetDTO) {
    return this.subjectService.getAll(body);
  }

  @Get('/:id')
  get(@Param('id') id: string) {
    return this.subjectService.get(id);
  }

  @Post()
  create(@Body() body: CreateSubjectDTO) {
    return this.subjectService.create(body);
  }
}