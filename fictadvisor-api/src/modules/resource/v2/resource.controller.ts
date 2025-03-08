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
import { ApiEndpoint } from '../../../common/decorators/api-endpoint.decorator';
import { ResourceByIdPipe } from '../../../common/pipes/resource-by-id.pipe';
import { ResourceService } from './resource.service';
import { ValidateResourcesPipe } from '../../../common/pipes/validate-resources.pipe';
import { ResourceDocumentation } from '../../../common/documentation/modules/v2/resource';
import { ResourceResponse, ResourcesResponse } from '@fictadvisor/utils/responses';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { DbStudentResource } from '../../../database/v2/entities/student-resource.entity';

@ApiTags('Resource')
@Controller({
  version: '2',
  path: '/studentResources',
})
export class ResourceController {
  constructor (
    private resourceService: ResourceService,
    @InjectMapper() private mapper: Mapper,
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
    const mappedResources = this.mapper.mapArray(studentResources, DbStudentResource, ResourceResponse);

    return { resources: mappedResources };
  }

  @ApiEndpoint({
    summary: 'Get specific student resource',
    documentation: ResourceDocumentation.GET,
  })
  @Get('/:resourceId')
  async get (
    @Param('resourceId', ResourceByIdPipe) resourceId: string,
  ): Promise<ResourceResponse> {
    const resource = await this.resourceService.get(resourceId);
    return this.mapper.map(resource, DbStudentResource, ResourceResponse);
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
    const resource = await this.resourceService.create(body);
    return this.mapper.map(resource, DbStudentResource, ResourceResponse);
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
    const resource = await this.resourceService.update(resourceId, body);
    return this.mapper.map(resource, DbStudentResource, ResourceResponse);
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
    const resources = await this.resourceService.updateMany(body);
    const mappedResources = this.mapper.mapArray(resources, DbStudentResource, ResourceResponse);

    return { resources: mappedResources };
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
