import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  QueryAllSubjectDTO,
  CreateSubjectDTO,
  UpdateSubjectDTO,
} from '@fictadvisor/utils/requests';
import {
  SubjectResponse,
  SubjectWithTeachersResponse,
  PaginatedSubjectsResponse,
} from '@fictadvisor/utils/responses';
import { PERMISSION } from '@fictadvisor/utils/security';
import { Access } from 'src/v2/security/Access';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { SubjectByIdPipe } from '../pipes/SubjectByIdPipe';
import { SubjectMapper } from '../../mappers/SubjectMapper';
import { SubjectService } from '../services/SubjectService';

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

  @ApiOkResponse({
    type: PaginatedSubjectsResponse,
  })
  @Get()
  async getAll (
    @Query() body: QueryAllSubjectDTO,
  ) {
    const subjects = await this.subjectService.getAll(body);

    return {
      subjects: subjects.data,
      pagination: subjects.pagination,
    };
  }

  @ApiOkResponse({
    type: SubjectResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidEntityIdException\n 
                  subject with such id is not found`,
  })
  @Get('/:subjectId')
  async get (
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
  ): Promise<SubjectResponse> {
    const dbSubject = await this.subjectService.get(subjectId);
    return this.subjectMapper.getSubject(dbSubject);
  }

  @ApiOkResponse({
    type: SubjectWithTeachersResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Subject with such id is not found`,
  })
  @ApiEndpoint({
    summary: 'Get teachers connected to the selected subject',
  })
  @Get('/:subjectId/teachers')
  getTeachers (
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
  ): Promise<SubjectWithTeachersResponse> {
    return this.subjectService.getTeachers(subjectId);
  }

  @Access(PERMISSION.SUBJECTS_CREATE)
  @ApiCookieAuth()
  @ApiOkResponse({
    type: SubjectResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidBodyException:\n 
                  Name is too short (min: 5)
                  Name is too long (max: 150)
                  Name can not be empty
                  Name is incorrect (a-zA-Z0-9A-Я(укр.)\\-' )(/+.,")`,
  })
  @ApiForbiddenResponse({
    description: `NoPermissionException:\n
                  You do not have permission to perform this action`,
  })
  @Post()
  async create (
    @Body() body: CreateSubjectDTO,
  ): Promise<SubjectResponse> {
    const dbSubject = await this.subjectService.create(body);
    return this.subjectMapper.getSubject(dbSubject);
  }

  @Access(PERMISSION.SUBJECTS_UPDATE)
  @ApiCookieAuth()
  @ApiOkResponse({
    type: SubjectResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidEntityIdException:\n 
                  subject with such id is not found
                  
                  InvalidBodyException:\n 
                  Name is too short (min: 5)
                  Name is too long (max: 150)
                  Name can not be empty
                  Name is incorrect (a-zA-Z0-9A-Я(укр.)\\-' )(/+.,")`,
  })
  @ApiForbiddenResponse({
    description: `NoPermissionException:\n
                  You do not have permission to perform this action`,
  })
  @Patch('/:subjectId')
  async update (
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
    @Body() body: UpdateSubjectDTO,
  ) {
    return this.subjectService.update(subjectId, body);
  }

  @Access(PERMISSION.SUBJECTS_DELETE)
  @ApiCookieAuth()
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `InvalidEntityIdException:\n 
                  subject with such id is not found`,
  })
  @ApiForbiddenResponse({
    description: `NoPermissionException:\n
                  You do not have permission to perform this action`,
  })
  @Delete('/:subjectId')
  delete (
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
  ) {
    return this.subjectService.deleteSubject(subjectId);
  }
}
