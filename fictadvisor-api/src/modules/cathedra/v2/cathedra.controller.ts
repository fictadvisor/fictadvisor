import { Body, Controller, Delete, Param, Patch, Post, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCathedraDTO, UpdateCathedraDTO, QueryAllCathedrasDTO } from '@fictadvisor/utils/requests';
import { PERMISSION } from '@fictadvisor/utils/security';
import { ApiEndpoint } from '../../../common/decorators/api-endpoint.decorator';
import { CathedraByIdPipe } from '../../../common/pipes/cathedra-by-id.pipe';
import { CathedraTeachersPipe } from '../../../common/pipes/cathedra-teachers.pipe';
import { CathedraService } from './cathedra.service';
import { CathedraDocumentation } from '../../../common/documentation/modules/v2/cathedra';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { DbCathedra } from '../../../database/v2/entities/cathedra.entity';
import {
  CathedrasDivisionsResponse,
  CathedraWithNumberOfTeachersResponse, CathedraWithTeachersResponse,
  PaginatedCathedrasWithTeachersResponse,
} from '@fictadvisor/utils/responses';

@ApiTags('Cathedra')
@Controller({
  version: '2',
  path: '/cathedras',
})
export class CathedraController {
  constructor (
    private cathedraService: CathedraService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  @ApiEndpoint({
    summary: 'Get all cathedras',
    documentation: CathedraDocumentation.GET_ALL,
  })
  @Get()
  async getAll (
    @Query() query: QueryAllCathedrasDTO,
  ): Promise<PaginatedCathedrasWithTeachersResponse> {
    const cathedras = await this.cathedraService.getAll(query);
    const cathedrasWithTeachers = this.mapper.mapArray(cathedras.data, DbCathedra, CathedraWithNumberOfTeachersResponse);

    return {
      cathedras: cathedrasWithTeachers,
      pagination: cathedras.pagination,
    };
  }

  @ApiEndpoint({
    summary: 'Create a new cathedra',
    permissions: PERMISSION.CATHEDRAS_CREATE,
    documentation: CathedraDocumentation.CREATE,
  })
  @Post()
  async create (
    @Body(CathedraTeachersPipe) body: CreateCathedraDTO,
  ): Promise<CathedraWithTeachersResponse> {
    const cathedra = await this.cathedraService.create(body);
    return this.mapper.map(cathedra, DbCathedra, CathedraWithTeachersResponse);
  }

  @ApiEndpoint({
    summary: 'Update cathedra with selected id',
    permissions: PERMISSION.CATHEDRAS_UPDATE,
    documentation: CathedraDocumentation.UPDATE,
  })
  @Patch('/:cathedraId')
  async update (
    @Param('cathedraId', CathedraByIdPipe) cathedraId: string,
    @Body() body: UpdateCathedraDTO,
  ): Promise<CathedraWithTeachersResponse> {
    const cathedra = await this.cathedraService.update(cathedraId, body);
    return this.mapper.map(cathedra, DbCathedra, CathedraWithTeachersResponse);
  }

  @ApiEndpoint({
    summary: 'Delete cathedra with selected id',
    permissions: PERMISSION.CATHEDRAS_DELETE,
    documentation: CathedraDocumentation.DELETE,
  })
  @Delete('/:cathedraId')
  async delete (
    @Param('cathedraId', CathedraByIdPipe) cathedraId: string,
  ): Promise<CathedraWithTeachersResponse> {
    const cathedra = await this.cathedraService.delete(cathedraId);
    return this.mapper.map(cathedra, DbCathedra, CathedraWithTeachersResponse);
  }

  @ApiEndpoint({
    summary: 'Get all divisions',
    documentation: CathedraDocumentation.GET_ALL_DIVISIONS,
  })
  @Get('/divisions')
  async getAllDivisions (): Promise<CathedrasDivisionsResponse> {
    return this.cathedraService.getAllDivisions();
  }

  @ApiEndpoint({
    summary: 'Get cathedra by id',
    documentation: CathedraDocumentation.GET_BY_ID,
  })
  @Get('/:cathedraId')
  async getById (
    @Param('cathedraId', CathedraByIdPipe) cathedraId: string,
  ): Promise<CathedraWithTeachersResponse> {
    const cathedra = await this.cathedraService.getById(cathedraId);
    return this.mapper.map(cathedra, DbCathedra, CathedraWithTeachersResponse);
  }
}
