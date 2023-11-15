import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { DisciplineService } from '../services/DisciplineService';
import { CreateDisciplineDTO } from '../dtos/CreateDisciplineDTO';
import { GroupByDisciplineGuard } from '../../security/group-guard/GroupByDisciplineGuard';
import { Access } from 'src/v2/security/Access';
import { PERMISSION } from '../../security/PERMISSION';
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
import { DisciplineByIdPipe } from '../pipes/DisciplineByIdPipe';
import { DisciplineTeachersResponse, ExtendDisciplineTeachersResponse } from '../responses/DisciplineTeachersResponse';
import { DisciplineTypeEnum } from '@prisma/client';
import { DisciplineResponse, DisciplinesResponse } from '../responses/DisciplineResponse';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { QueryAllDisciplinesDTO } from '../dtos/QueryAllDisciplinesDTO';
import { QueryAllDisciplinesPipe } from '../pipes/QueryAllDisciplinesPipe';
import { DisciplineMapper } from '../../mappers/DisciplineMapper';

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
    type: DisciplineResponse,
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
  @Access(PERMISSION.GROUPS_$GROUPID_DISCIPLINES_CREATE)
  @Post()
  create (
    @Body() body: CreateDisciplineDTO,
  ) {
    return this.disciplineService.create(body);
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
    type: ExtendDisciplineTeachersResponse,
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
  ): Promise<ExtendDisciplineTeachersResponse> {
    const discipline = await this.disciplineService.deleteDiscipline(disciplineId);
    return this.disciplineMapper.getDisciplineWithTeachers(discipline);
  }
}
