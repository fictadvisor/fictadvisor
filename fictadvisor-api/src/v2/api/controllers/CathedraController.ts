import { Body, Controller, Delete, Param, Patch, Post, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCathedraDTO, UpdateCathedraDTO, QueryAllCathedrasDTO } from '@fictadvisor/utils/requests';
import { PERMISSION } from '@fictadvisor/utils/security';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { CathedraByIdPipe } from '../pipes/CathedraByIdPipe';
import { CathedraTeachersPipe } from '../pipes/CathedraTeachersPipe';
import { CathedraMapper } from '../../mappers/CathedraMapper';
import { CathedraService } from '../services/CathedraService';
import { CathedraDocumentation } from '../../utils/documentation/cathedra';

@ApiTags('Cathedra')
@Controller({
  version: '2',
  path: '/cathedras',
})
export class CathedraController {
  constructor (
    private cathedraService: CathedraService,
    private cathedraMapper: CathedraMapper,
  ) {}

  @ApiEndpoint({
    summary: 'Get all cathedras',
    documentation: CathedraDocumentation.GET_ALL,
  })
  @Get()
  async getAll (
    @Query() query: QueryAllCathedrasDTO,
  ) {
    const cathedras = await this.cathedraService.getAll(query);
    const cathedrasWithTeachers = this.cathedraMapper.getCathedraWithNumberOfTeachers(cathedras.data);
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
  ) {
    const cathedra = await this.cathedraService.create(body);
    return this.cathedraMapper.getCathedraWithTeachers(cathedra);
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
  ) {
    const cathedra = await this.cathedraService.update(cathedraId, body);
    return this.cathedraMapper.getCathedraWithTeachers(cathedra);
  }

  @ApiEndpoint({
    summary: 'Delete cathedra with selected id',
    permissions: PERMISSION.CATHEDRAS_DELETE,
    documentation: CathedraDocumentation.DELETE,
  })
  @Delete('/:cathedraId')
  async delete (
    @Param('cathedraId', CathedraByIdPipe) cathedraId: string,
  ) {
    const cathedra = await this.cathedraService.delete(cathedraId);
    return this.cathedraMapper.getCathedraWithTeachers(cathedra);
  }

  @ApiEndpoint({
    summary: 'Get all divisions',
    documentation: CathedraDocumentation.GET_ALL,
  })
  @Get('/divisions')
  async getAllDivisions () {
    return this.cathedraService.getAllDivisions();
  }

  @ApiEndpoint({
    summary: 'Get cathedra by id',
    documentation: CathedraDocumentation.GET_BY_ID,
  })
  @Get('/:cathedraId')
  async getById (
    @Param('cathedraId', CathedraByIdPipe) cathedraId: string,
  ) {
    const cathedra = await this.cathedraService.getById(cathedraId);
    return this.cathedraMapper.getCathedraWithTeachers(cathedra);
  }
}
