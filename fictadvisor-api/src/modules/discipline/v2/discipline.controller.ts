import { Body, Controller, Delete, Get, Param, ParseEnumPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateDisciplineDTO,
  QueryAllDisciplinesDTO,
  UpdateDisciplineDTO,
} from '@fictadvisor/utils/requests';
import {
  ExtendedDisciplineTeachersResponse,
  DisciplinesResponse, DisciplineAdminResponse, DisciplineTeachersResponse, DisciplineTeacherResponse,
} from '@fictadvisor/utils/responses';
import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';
import { PERMISSION } from '@fictadvisor/utils/security';
import { DisciplineService } from './discipline.service';
import { ApiEndpoint } from '../../../common/decorators/api-endpoint.decorator';
import { DisciplineByIdPipe } from '../../../common/pipes/discipline-by-id.pipe';
import { QueryAllDisciplinesPipe } from '../../../common/pipes/query-all-disciplines.pipe';
import { DisciplineDocumentation } from '../../../common/documentation/modules/v2/discipline';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { DbDiscipline } from '../../../database/v2/entities/discipline.entity';
import { DbDisciplineTeacher } from '../../../database/v2/entities/discipline-teacher.entity';

@ApiTags('Discipline')
@Controller({
  version: '2',
  path: '/disciplines',
})
export class DisciplineController {
  constructor (
    private disciplineService: DisciplineService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  @Post()
  @ApiEndpoint({
    summary: 'Create new discipline',
    documentation: DisciplineDocumentation.CREATE,
    permissions: PERMISSION.GROUPS_$GROUPID_DISCIPLINES_CREATE,
  })
  async create (
    @Body() body: CreateDisciplineDTO,
  ): Promise<ExtendedDisciplineTeachersResponse> {
    const discipline = await this.disciplineService.create(body);
    return this.mapper.map(discipline, DbDiscipline, ExtendedDisciplineTeachersResponse);
  }

  @ApiEndpoint({
    summary: 'Get all disciplines with selected filters',
    documentation: DisciplineDocumentation.GET_ALL,
  })
  @Get()
  async getAll (
    @Query(QueryAllDisciplinesPipe) body: QueryAllDisciplinesDTO,
  ): Promise<DisciplinesResponse> {
    const disciplinesWithSelectiveAmounts = await this.disciplineService.getAll(body);
    const disciplines = this.mapper.mapArray(disciplinesWithSelectiveAmounts.data, DbDiscipline, DisciplineAdminResponse);

    return {
      disciplines,
      pagination: disciplinesWithSelectiveAmounts.pagination,
    };
  }

  @ApiEndpoint({
    summary: 'Get all teachers by discipline Id',
    documentation: DisciplineDocumentation.GET_ALL_TEACHERS_BY_DISCIPLINE,
    permissions: PERMISSION.GROUPS_$GROUPID_DISCIPLINES_TEACHERS_GET,
  })
  @Get('/:disciplineId/teachers')
  async getAllTeachersByDiscipline (
    @Param('disciplineId', DisciplineByIdPipe) disciplineId: string,
    @Query('disciplineType', new ParseEnumPipe(DisciplineTypeEnum)) disciplineType: DisciplineTypeEnum,
  ): Promise<DisciplineTeachersResponse> {
    const teachers = await this.disciplineService.getTeachers(disciplineId, disciplineType);
    const mappedTeachers = this.mapper.mapArray(teachers, DbDisciplineTeacher, DisciplineTeacherResponse);

    return { teachers: mappedTeachers };
  }

  @ApiEndpoint({
    summary: 'Delete discipline by id',
    documentation: DisciplineDocumentation.DELETE_BY_ID,
    permissions: PERMISSION.DISCIPLINE_DELETE,
  })
  @Delete('/:disciplineId')
  async deleteById (
    @Param('disciplineId', DisciplineByIdPipe) disciplineId: string,
  ): Promise<ExtendedDisciplineTeachersResponse> {
    const discipline = await this.disciplineService.deleteById(disciplineId);
    return this.mapper.map(discipline, DbDiscipline, ExtendedDisciplineTeachersResponse);
  }

  @ApiEndpoint({
    summary: 'Get discipline by id',
    documentation: DisciplineDocumentation.GET_BY_ID,
  })
  @Get('/:disciplineId')
  async getById (
    @Param('disciplineId', DisciplineByIdPipe) disciplineId: string
  ): Promise<ExtendedDisciplineTeachersResponse> {
    const discipline = await this.disciplineService.getById(disciplineId);
    return this.mapper.map(discipline, DbDiscipline, ExtendedDisciplineTeachersResponse);
  }

  @ApiEndpoint({
    summary: 'Update discipline by id',
    documentation: DisciplineDocumentation.UPDATE_BY_ID,
    permissions: PERMISSION.DISCIPLINE_UPDATE,
  })
  @Patch('/:disciplineId')
  async updateById (
    @Body() body: UpdateDisciplineDTO,
    @Param('disciplineId', DisciplineByIdPipe) disciplineId: string,
  ): Promise<ExtendedDisciplineTeachersResponse> {
    const discipline = await this.disciplineService.updateById(disciplineId, body);
    return this.mapper.map(discipline, DbDiscipline, ExtendedDisciplineTeachersResponse);
  }
}
