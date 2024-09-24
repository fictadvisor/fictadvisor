import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreateDisciplineDTO,
  QueryAllDisciplinesDTO,
  UpdateDisciplineDTO,
} from '@fictadvisor/utils/requests';
import {
  DisciplineTeachersResponse,
  ExtendedDisciplineTeachersResponse,
  DisciplinesResponse,
} from '@fictadvisor/utils/responses';
import { PERMISSION } from '@fictadvisor/utils/security';
import { DisciplineService } from '../services/DisciplineService';
import { Access } from 'src/v2/security/Access';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { GroupByDisciplineGuard } from '../../security/group-guard/GroupByDisciplineGuard';
import { DisciplineByIdPipe } from '../pipes/DisciplineByIdPipe';
import { QueryAllDisciplinesPipe } from '../pipes/QueryAllDisciplinesPipe';
import { DisciplineMapper } from '../../mappers/DisciplineMapper';
import { DisciplineTypeEnum } from '@prisma/client';

@ApiTags('Discipline')
@Controller({
  version: '2',
  path: '/disciplines',
})
export class DisciplineController {
  constructor (
    private disciplineService: DisciplineService,
    private disciplineMapper: DisciplineMapper,
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ExtendedDisciplineTeachersResponse,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @Post()
  @ApiEndpoint({
    summary: 'Create new discipline',
    permissions: PERMISSION.GROUPS_$GROUPID_DISCIPLINES_CREATE,
  })
  async create (
    @Body() body: CreateDisciplineDTO,
  ) {
    const discipline = await this.disciplineService.create(body);
    return this.disciplineMapper.getDisciplineWithTeachers(discipline);
  }

  @ApiOkResponse({
    type: DisciplinesResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException: 
      Page must be a number
      PageSize must be a number
      Wrong value for order
      Wrong value for sort
      Each value of semesters must be an studying semester
      
    InvalidEntityIdException:
      Group with such id is not found
      Teacher with such id is not found`,
  })
  @ApiEndpoint({
    summary: 'Get all disciplines with selected filters',
  })
  @Get()
  async getAll (
    @Query(QueryAllDisciplinesPipe) body: QueryAllDisciplinesDTO,
  ): Promise<DisciplinesResponse> {
    const disciplinesWithSelectiveAmounts = await this.disciplineService.getAll(body);
    const disciplines = this.disciplineMapper.getDisciplinesForAdmin(disciplinesWithSelectiveAmounts.data);
    return {
      disciplines,
      pagination: disciplinesWithSelectiveAmounts.pagination,
    };
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DisciplineTeachersResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidQueryException:
      Type of discipline must be a field of enum
      
    InvalidDisciplineIdException:
      Discipline with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'disciplineId',
    required: true,
    description: 'Id of certain discipline',
  })
  @ApiQuery({
    name: 'disciplineType',
    required: true,
    enum: DisciplineTypeEnum,
    description: 'Discipline type of some discipline',
  })
  @Access(PERMISSION.GROUPS_$GROUPID_DISCIPLINES_TEACHERS_GET, GroupByDisciplineGuard)
  @Get('/:disciplineId/teachers')
  async getAllByDiscipline (
    @Param('disciplineId', DisciplineByIdPipe) disciplineId: string,
    @Query('disciplineType') disciplineType: DisciplineTypeEnum,
  ) {
    const teachers = await this.disciplineService.getTeachers(disciplineId, disciplineType);
    return { teachers };
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ExtendedDisciplineTeachersResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Discipline with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'disciplineId',
    required: true,
    description: 'Id of a discipline to delete',
  })
  @ApiEndpoint({
    summary: 'Delete discipline by id',
    permissions: PERMISSION.DISCIPLINE_DELETE,
  })
  @Delete('/:disciplineId')
  async delete (
    @Param('disciplineId', DisciplineByIdPipe) disciplineId: string,
  ): Promise<ExtendedDisciplineTeachersResponse> {
    const discipline = await this.disciplineService.deleteDiscipline(disciplineId);
    return this.disciplineMapper.getDisciplineWithTeachers(discipline);
  }

  @ApiOkResponse({
    type: ExtendedDisciplineTeachersResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Discipline with such id is not found`,
  })
  @ApiParam({
    name: 'disciplineId',
    required: true,
    description: 'Id of a discipline to get',
  })
  @ApiEndpoint({
    summary: 'Get discipline by id',
  })
  @Get(':disciplineId')
  async getById (@Param('disciplineId', DisciplineByIdPipe) disciplineId: string) {
    const discipline = await this.disciplineService.get(disciplineId);
    return this.disciplineMapper.getDisciplineWithTeachers(discipline);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ExtendedDisciplineTeachersResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Discipline with such id is not found

    InvalidBodyException:
      isSelective property must be boolean`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException: 
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'disciplineId',
    required: true,
    description: 'Id of a discipline to update',
  })
  @ApiEndpoint({
    summary: 'Update discipline by id',
    permissions: PERMISSION.DISCIPLINE_UPDATE,
  })
  @Patch('/:disciplineId')
  async updateById (
    @Body() body: UpdateDisciplineDTO,
    @Param('disciplineId', DisciplineByIdPipe) disciplineId: string,
  ) {
    const updatedDiscipline = await this.disciplineService.updateById(disciplineId, body);
    return this.disciplineMapper.getDisciplineWithTeachers(updatedDiscipline);
  }
}
