import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { SubjectService } from './SubjectService';
import { CreateSubjectDTO } from './dto/CreateSubjectDTO';
import { UpdateSubjectDTO } from './dto/UpdateSubjectDTO';
import { SubjectByIdPipe } from './SubjectByIdPipe';
import { JwtGuard } from '../../security/JwtGuard';
import { QueryAllDTO } from 'src/v2/utils/QueryAllDTO';
import { Permission } from 'src/v2/security/permission-guard/Permission';
import { PermissionGuard } from 'src/v2/security/permission-guard/PermissionGuard';

@Controller({
  version: '2',
  path: '/subjects',
})
export class SubjectController {
  constructor(
    private subjectService: SubjectService,
  ) {}

  @Get()
  getAll(
    @Query() body: QueryAllDTO,
  ) {
    return this.subjectService.getAll(body);
  }

  @Get('/:subjectId')
  get(
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
  ) {
    return this.subjectService.get(subjectId);
  }

  @Permission('subjects.create')
  @UseGuards(JwtGuard, PermissionGuard)
  @Post()
  create(
    @Body() body: CreateSubjectDTO,
  ) {
    return this.subjectService.create(body);
  }

  @Permission('subjects.update')
  @UseGuards(JwtGuard, PermissionGuard)
  @Patch('/:subjectId')
  async update(
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
    @Body() body: UpdateSubjectDTO,
  ) {
    return this.subjectService.update(subjectId, body);
  }

  @Permission('subjects.delete')
  @UseGuards(JwtGuard, PermissionGuard)
  @Delete('/:subjectId')
  delete(
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
  ) {
    return this.subjectService.deleteSubject(subjectId);
  }
}