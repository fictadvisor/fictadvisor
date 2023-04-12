import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SubjectService } from './SubjectService';
import { SubjectByIdPipe } from './SubjectByIdPipe';
import { QueryAllSubjectDTO } from './query/QueryAllSubjectDTO';
import { Access } from 'src/v2/security/Access';
import { SubjectMapper } from './SubjectMapper';
import { CreateSubjectDTO } from './dto/CreateSubjectDTO';
import { UpdateSubjectDTO } from './dto/UpdateSubjectDTO';

@Controller({
  version: '2',
  path: '/subjects',
})
export class SubjectController {
  constructor (
    private subjectMapper: SubjectMapper,
    private subjectService: SubjectService,
  ) {}

  @Get()
  async getAll (
    @Query() body: QueryAllSubjectDTO,
  ) {
    const subjects = await this.subjectService.getAll(body);

    return { subjects };
  }

  @Get('/:subjectId')
  async get (
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
  ) {
    const dbSubject = await this.subjectService.get(subjectId);
    return this.subjectMapper.getSubject(dbSubject);
  }
  
  @Get('/:subjectId/teachers')
  getTeachers (
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
  ) {
    return this.subjectService.getTeachers(subjectId);
  }

  @Access('subjects.create')
  @Post()
  async create (
    @Body() body: CreateSubjectDTO,
  ) {
    const dbSubject = await this.subjectService.create(body);
    return this.subjectMapper.getSubject(dbSubject);
  }

  @Access('subjects.update')
  @Patch('/:subjectId')
  async update (
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
    @Body() body: UpdateSubjectDTO,
  ) {
    return this.subjectService.update(subjectId, body);
  }

  @Access('subjects.delete')
  @Delete('/:subjectId')
  delete (
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
  ) {
    return this.subjectService.deleteSubject(subjectId);
  }
}