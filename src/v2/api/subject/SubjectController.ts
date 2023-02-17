import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { SubjectService } from './SubjectService';
import { CreateSubjectDTO } from './dto/CreateSubjectDTO';
import { UpdateSubjectDTO } from './dto/UpdateSubjectDTO';
import { SubjectByIdPipe } from './SubjectByIdPipe';
import { JwtGuard } from '../../security/JwtGuard';
import { QueryAllDTO } from 'src/v2/utils/QueryAllDTO';
import { Permission } from 'src/v2/security/permission-guard/Permission';
import { PermissionGuard } from 'src/v2/security/permission-guard/PermissionGuard';
import { Access } from 'src/v2/security/Access';

@Controller({
  version: '2',
  path: '/subjects',
})
export class SubjectController {
  constructor(
    private subjectService: SubjectService,
  ) {}

  @Get()
  async getAll(
    @Query() body: QueryAllDTO,
  ) {
    const subjects = await this.subjectService.getAll(body);

    return { subjects };
  }

  @Get('/:subjectId')
  get(
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
  ) {
    return this.subjectService.get(subjectId);
  }
  
  @Get('/:subjectId/teachers')
  getTeachers(
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
  ) {
    return this.subjectService.getTeachers(subjectId);
  }

  @Access('subjects.create')
  @Post()
  create(
    @Body() body: CreateSubjectDTO,
  ) {
    return this.subjectService.create(body);
  }

  @Access('subjects.update')
  @Patch('/:subjectId')
  async update(
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
    @Body() body: UpdateSubjectDTO,
  ) {
    return this.subjectService.update(subjectId, body);
  }

  @Access('subjects.delete')
  @Delete('/:subjectId')
  delete(
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
  ) {
    return this.subjectService.deleteSubject(subjectId);
  }
}