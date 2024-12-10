import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateResourceDTO,
  UpdateResourceDTO,
  UpdateResourcesDTO,
  QueryAllResourcesDTO,
} from '@fictadvisor/utils/requests';
import { PERMISSION } from '@fictadvisor/utils/security';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { ResourceByIdPipe } from '../pipes/ResourceByIdPipe';
import { ResourceMapper } from '../../mappers/ResourceMapper';
import { ResourceService } from '../services/ResourceService';
import { ValidateResourcesPipe } from '../pipes/ValidateResourcesPipe';
import { ResourceDocumentation } from 'src/v2/utils/documentation/resource';
import { ResourceResponse, ResourcesResponse } from '@fictadvisor/utils/responses';

@ApiTags('Resource')
@Controller({
  version: '2',
  path: '/studentResources',
})
export class ResourceController {
  constructor (
    private resourceService: ResourceService,
    private resourceMapper: ResourceMapper,
  ) {}

  @ApiEndpoint({
    summary: 'Get all student resources',
    documentation: ResourceDocumentation.GET_ALL,
  })
  @Get()
  async getAll (
    @Query() body: QueryAllResourcesDTO,
  ): Promise<ResourcesResponse> {
    const studentResources = await this.resourceService.getAll(body);
    return this.resourceMapper.getResources(studentResources);
  }

  @ApiEndpoint({
    summary: 'Get specific student resource',
    documentation: ResourceDocumentation.GET,
  })
  @Get('/:resourceId')
  async get (
    @Param('resourceId', ResourceByIdPipe) resourceId: string,
  ): Promise<ResourceResponse> {
    const answer = await this.resourceService.get(resourceId);
    return this.resourceMapper.getResource(answer);
  }

  @ApiEndpoint({
    summary: 'Create student resource',
    documentation: ResourceDocumentation.CREATE,
    permissions: PERMISSION.RESOURCES_CREATE,
  })
  @Post()
  async create (
    @Body() body: CreateResourceDTO,
  ): Promise<ResourceResponse> {
    const createdResourse = await this.resourceService.create(body);
    return this.resourceMapper.getResource(createdResourse);
  }

  @ApiEndpoint({
    summary: 'Update specific student resource',
    documentation: ResourceDocumentation.UPDATE,
    permissions: PERMISSION.RESOURCES_UPDATE,
  })
  @Patch('/:resourceId')
  async update (
    @Param('resourceId', ResourceByIdPipe) resourceId: string,
    @Body() body: UpdateResourceDTO,
  ): Promise<ResourceResponse> {
    const updatedResource = await this.resourceService.update(resourceId, body);
    return this.resourceMapper.getResource(updatedResource);
  }

  @ApiEndpoint({
    summary: 'Update many student resources by their id`s',
    documentation: ResourceDocumentation.UPDATE_MANY,
    permissions: PERMISSION.RESOURCES_UPDATE,
  })
  @Patch()
  async updateMany (
    @Body(ValidateResourcesPipe) body: UpdateResourcesDTO,
  ): Promise<ResourcesResponse> {
    const updatedResources = await this.resourceService.updateMany(body);
    return this.resourceMapper.getResources(updatedResources);
  }

  @ApiEndpoint({
    summary: 'Delete specific student resource',
    documentation: ResourceDocumentation.DELETE,
    permissions: PERMISSION.RESOURCES_DELETE,
  })
  @Delete('/:resourceId')
  async delete (
    @Param('resourceId', ResourceByIdPipe) resourceId: string,
  ):  Promise<void> {
    return this.resourceService.delete(resourceId);
  }
}
