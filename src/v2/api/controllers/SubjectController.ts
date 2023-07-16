import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SubjectService } from '../services/SubjectService';
import { SubjectByIdPipe } from '../pipes/SubjectByIdPipe';
import { QueryAllSubjectDTO } from '../dtos/QueryAllSubjectDTO';
import { Access } from 'src/v2/security/Access';
import { SubjectMapper } from '../../mappers/SubjectMapper';
import { CreateSubjectDTO } from '../dtos/CreateSubjectDTO';
import { UpdateSubjectDTO } from '../dtos/UpdateSubjectDTO';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SubjectResponse } from '../responses/SubjectResponse';
import { SubjectWithTeachersResponse } from '../responses/SubjectWithTeachersResponse';
import { PaginatedSubjectsResponse } from '../responses/PaginatedSubjectsResponse';

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
  ) {
    const dbSubject = await this.subjectService.get(subjectId);
    return this.subjectMapper.getSubject(dbSubject);
  }
  
  @Get('/:subjectId/teachers')
  @ApiOkResponse({
    type: SubjectWithTeachersResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidEntityIdException:\n
                  subject with such id is not found`,
  })
  getTeachers (
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
  ) {
    return this.subjectService.getTeachers(subjectId);
  }

  @Access('subjects.create')
  @ApiBearerAuth()
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
  ) {
    const dbSubject = await this.subjectService.create(body);
    return this.subjectMapper.getSubject(dbSubject);
  }

  @Access('subjects.update')
  @ApiBearerAuth()
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

  @Access('subjects.delete')
  @ApiBearerAuth()
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