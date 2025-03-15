import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  QueryAllSubjectDTO,
  CreateSubjectDTO,
  UpdateSubjectDTO,
} from '@fictadvisor/utils/requests';
import {
  PaginatedSubjectsResponse,
  SubjectResponse,
  SubjectWithTeachersResponse,
} from '@fictadvisor/utils/responses';
import { PERMISSION } from '@fictadvisor/utils/security';
import { ApiEndpoint } from '../../../common/decorators/api-endpoint.decorator';
import { SubjectByIdPipe } from '../../../common/pipes/subject-by-id.pipe';
import { SubjectMapper } from '../../../common/mappers/subject.mapper';
import { SubjectService } from './subject.service';
import { SubjectDocumentation } from '../../../common/documentation/modules/v2/subject';
import { AllSubjectsPipe } from '../../../common/pipes/all-subjects.pipe';

@ApiTags('Subjects')
@Controller({
  version: '2',
  path: '/subjects',
})
export class SubjectController {
  constructor (
    private subjectMapper: SubjectMapper,
    private subjectService: SubjectService,
  ) {}

  @ApiEndpoint({
    summary: 'Get all subjects',
    documentation: SubjectDocumentation.GET_ALL,
  })
  @Get()
  async getAll (
    @Query(AllSubjectsPipe) body: QueryAllSubjectDTO,
  ): Promise<PaginatedSubjectsResponse> {
    const subjects = await this.subjectService.getAll(body);
    return {
      subjects: subjects.data,
      pagination: subjects.pagination,
    };
  }

  @ApiEndpoint({
    summary: 'Get selected subject',
    documentation: SubjectDocumentation.GET,
  })
  @Get('/:subjectId')
  async get (
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
  ): Promise<SubjectResponse> {
    const dbSubject = await this.subjectService.get(subjectId);
    return this.subjectMapper.getSubject(dbSubject);
  }

  @ApiEndpoint({
    summary: 'Get teachers connected to the selected subject',
    documentation: SubjectDocumentation.GET_TEACHERS,
  })
  @Get('/:subjectId/teachers')
  getTeachers (
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
  ): Promise<SubjectWithTeachersResponse> {
    return this.subjectService.getTeachers(subjectId);
  }

  @ApiEndpoint({
    summary: 'Create a new subject',
    documentation: SubjectDocumentation.CREATE,
    permissions: PERMISSION.SUBJECTS_CREATE,
  })
  @Post()
  async create (
    @Body() body: CreateSubjectDTO,
  ): Promise<SubjectResponse> {
    const dbSubject = await this.subjectService.create(body);
    return this.subjectMapper.getSubject(dbSubject);
  }

  @ApiEndpoint({
    summary: 'Update subject by id',
    documentation: SubjectDocumentation.UPDATE,
    permissions: PERMISSION.SUBJECTS_UPDATE,
  })
  @Patch('/:subjectId')
  async update (
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
    @Body() body: UpdateSubjectDTO,
  ): Promise<SubjectResponse> {
    return this.subjectService.update(subjectId, body);
  }

  @ApiEndpoint({
    summary: 'Delete subject by id',
    documentation: SubjectDocumentation.DELETE,
    permissions: PERMISSION.SUBJECTS_DELETE,
  })
  @Delete('/:subjectId')
  delete (
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
  ): Promise<SubjectResponse> {
    return this.subjectService.deleteSubject(subjectId);
  }
}
