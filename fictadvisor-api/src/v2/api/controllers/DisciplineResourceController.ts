import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DisciplineResourceService } from '../services/DisciplineResourceService';
import { CreateDisciplineResourceDTO, QueryAllDisciplineResourcesDTO, UpdateDisciplineResourceDTO } from '@fictadvisor/utils/requests';
import { DisciplineResourceByIdPipe } from '../pipes/DisciplineResourceByIdPipe';
import { DisciplineResourcesPipe } from '../pipes/DisciplineResourcesPipe';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { DisciplineResourceResponse, PaginatedDisciplineResourcesResponse } from '@fictadvisor/utils/responses';
import { DisciplineResourceMapper } from '../../mappers/DisciplineResourceMapper';
import { PERMISSION } from '@fictadvisor/utils/security';
import { TelegramGuard } from '../../security/TelegramGuard';
import { DisciplineResourceDocumentation } from '../../utils/documentation/disciplineResource';

@ApiTags('DisciplineResource')
@Controller({
  version: '2',
  path: '/disciplineResources',
})
export class DisciplineResourceController {

  constructor (
    private disciplineResourceService: DisciplineResourceService,
    private disciplineResourceMapper: DisciplineResourceMapper,
  ) {}

  @ApiEndpoint({
    summary: 'Create a discipline resource',
    documentation: DisciplineResourceDocumentation.CREATE,
    permissions: PERMISSION.DISCIPLINE_RESOURCES_CREATE,
    guards: TelegramGuard,
  })
  @Post()
  async create (
    @Body(DisciplineResourcesPipe) body: CreateDisciplineResourceDTO,
  ): Promise<DisciplineResourceResponse> {
    const disciplineResource = await this.disciplineResourceService.create(body);
    return this.disciplineResourceMapper.getDisciplineResource(disciplineResource);
  }

  @ApiEndpoint({
    summary: 'Update a discipline resource',
    documentation: DisciplineResourceDocumentation.UPDATE_BY_ID,
    permissions: PERMISSION.DISCIPLINE_RESOURCES_UPDATE,
  })
  @Patch('/:resourceId')
  async updateById (
    @Body(DisciplineResourcesPipe) body: UpdateDisciplineResourceDTO,
    @Param('resourceId', DisciplineResourceByIdPipe) resourceId: string,
  ): Promise<DisciplineResourceResponse> {
    const disciplineResource = await this.disciplineResourceService.updateById(resourceId, body);
    return this.disciplineResourceMapper.getDisciplineResource(disciplineResource);
  }

  @ApiEndpoint({
    summary: 'Delete a discipline resource',
    documentation: DisciplineResourceDocumentation.DELETE_BY_ID,
    permissions: PERMISSION.DISCIPLINE_RESOURCES_DELETE,
  })
  @Delete('/:resourceId')
  async deleteById (
    @Param('resourceId', DisciplineResourceByIdPipe) resourceId: string,
  ): Promise<DisciplineResourceResponse> {
    const disciplineResource = await this.disciplineResourceService.deleteById(resourceId);
    return this.disciplineResourceMapper.getDisciplineResource(disciplineResource);
  }

  @ApiEndpoint({
    summary: 'Delete a discipline resource',
    documentation: DisciplineResourceDocumentation.GET_ALL,
  })
  @Get()
  async getAll (
    @Query(DisciplineResourcesPipe) query: QueryAllDisciplineResourcesDTO,
  ): Promise<PaginatedDisciplineResourcesResponse> {
    const disciplineResources = await this.disciplineResourceService.getAll(query);
    return {
      disciplineResources: this.disciplineResourceMapper.getDisciplineResources(disciplineResources.data),
      pagination: disciplineResources.pagination,
    }
  }
}