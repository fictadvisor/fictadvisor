import { Body, Controller, Delete, Get, Param, ParseEnumPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateDisciplineDTO,
  QueryAllDisciplinesDTO,
  UpdateDisciplineDTO,
} from '@fictadvisor/utils/requests';
import {
  ExtendedDisciplineTeachersResponse,
  DisciplinesResponse,
} from '@fictadvisor/utils/responses';
import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';
import { PERMISSION } from '@fictadvisor/utils/security';
import { DisciplineService } from './DisciplineService';
import { ApiEndpoint } from '../../../common/decorators/ApiEndpoint';
import { DisciplineByIdPipe } from '../../../common/pipes/DisciplineByIdPipe';
import { QueryAllDisciplinesPipe } from '../../../common/pipes/QueryAllDisciplinesPipe';
import { DisciplineMapper } from '../../../common/mappers/DisciplineMapper';
import { DisciplineDocumentation } from '../../../common/documentation/modules/v2/discipline';
import { DisciplineTeacherMapper } from '../../../common/mappers/DisciplineTeacherMapper';

@ApiTags('Discipline')
@Controller({
  version: '2',
  path: '/disciplines',
})
export class DisciplineController {
  constructor (
    private disciplineService: DisciplineService,
    private disciplineMapper: DisciplineMapper,
    private disciplineTeacherMapper: DisciplineTeacherMapper,
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
    return this.disciplineMapper.getExtendedDisciplineTeachers(discipline);
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
    const disciplines = this.disciplineMapper.getDisciplinesAdmin(disciplinesWithSelectiveAmounts.data);
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
  ) {
    const teachers = await this.disciplineService.getTeachers(disciplineId, disciplineType);
    return this.disciplineTeacherMapper.getDisciplineTeachersWithTeacherParams(teachers);
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
    return this.disciplineMapper.getExtendedDisciplineTeachers(discipline);
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
    return this.disciplineMapper.getExtendedDisciplineTeachers(discipline);
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
    const updatedDiscipline = await this.disciplineService.updateById(disciplineId, body);
    return this.disciplineMapper.getExtendedDisciplineTeachers(updatedDiscipline);
  }
}
