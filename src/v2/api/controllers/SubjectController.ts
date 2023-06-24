import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SubjectService } from '../services/SubjectService';
import { SubjectByIdPipe } from '../pipes/SubjectByIdPipe';
import { OrderQASParam, QueryAllSubjectDTO, SortQASParam } from '../dtos/QueryAllSubjectDTO';
import { Access } from 'src/v2/security/Access';
import { SubjectMapper } from '../../mappers/SubjectMapper';
import { CreateSubjectDTO } from '../dtos/CreateSubjectDTO';
import { UpdateSubjectDTO } from '../dtos/UpdateSubjectDTO';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { SubjectsCountResponse } from '../responses/SubjectsCountResponse';
import { SubjectResponse } from '../responses/SubjectResponse';
import { SubjectWithTeachersResponse } from '../responses/SubjectWithTeachersResponse';

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

  @ApiQuery({
    name: 'group',
    type: String,
    description: 'GroupId',
    required: false,
  })
  @ApiQuery({
    name: 'order',
    enum: OrderQASParam,
    description: 'Ascending by default',
    required: false,
  })
  @ApiQuery({
    name: 'sort',
    enum: SortQASParam,
    required: false,
  })
  @ApiQuery({
    name: 'search',
    type: String,
    description: 'Accepts subject full name',
    required: false,
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    description: 'Visualization parameter: Divide data by amount of subjects',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Visualization parameter: access to parts of divided data',
    required: false,
  })
  @ApiOkResponse({
    type: SubjectsCountResponse,
  })
  @Get()
  async getAll (
    @Query() body: QueryAllSubjectDTO,
  ) {
    const subjects = await this.subjectService.getAll(body);

    return { subjects };
  }

  @ApiOkResponse({
    type: SubjectResponse,
  })
  @ApiBadRequestResponse({
    description: 'InvalidEntityIdException: subject with such id is not found',
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
    description: `InvalidBodyException: Name is too short (min: 5)
                  InvalidBodyException: Name is too long (max: 150)
                  InvalidBodyException: Name can not be empty
                  InvalidBodyException: Name is incorrect (a-zA-Z0-9A-Я(укр.)\\-' )(/+.,")`,
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
    description: `InvalidBodyException: Name is too short (min: 5)
                  InvalidBodyException: Name is too long (max: 150)
                  InvalidBodyException: Name can not be empty
                  InvalidBodyException: Name is incorrect (a-zA-Z0-9A-Я(укр.)\\-' )(/+.,")
                  InvalidEntityIdException: subject with such id is not found`,
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
    description: 'InvalidEntityIdException: subject with such id is not found',
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