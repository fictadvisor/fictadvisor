import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ResourceService } from '../services/ResourceService';
import { ResourceByIdPipe } from '../pipes/ResourceByIdPipe';
import { CreateResourceDTO } from '../dtos/CreateResourceDTO';
import { UpdateResourceDTO } from '../dtos/UpdateResourceDTO';
import { PERMISSION } from '@fictadvisor/utils/security';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ResourceResponse } from '../responses/ResourceResponse';
import { ResourceMapper } from '../../mappers/ResourceMapper';
import { ResourcesResponse } from '../responses/ResourcesResponse';
import { UpdateResourcesDTO } from '../dtos/UpdateResourcesDTO';
import { QueryAllResourcesDTO } from '../dtos/QueryAllResourcesDTO';
import { ApiEndpoint } from '../../utils/documentation/decorators';

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

  @ApiOkResponse({
    type: [ResourceResponse],
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidQueryException:
      Id\`s must be an array`,
  })
  @ApiEndpoint({
    summary: 'Get all student resources',
  })
  @Get()
  async getAll (
    @Query() body: QueryAllResourcesDTO,
  ) {
    const studentResources = await this.resourceService.getAll(body);
    return this.resourceMapper.getResources(studentResources);
  }

  @ApiOkResponse({
    type: ResourceResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityId:
      Resource with such id is not found`,
  })
  @ApiParam({
    name: 'resourceId',
    description: 'Id of student resource',
    type: String,
    required: true,
  })
  @ApiEndpoint({
    summary: 'Get specific student resource',
  })
  @Get('/:resourceId')
  get (
    @Param('resourceId', ResourceByIdPipe) resourceId: string,
  ) {
    return this.resourceService.get(resourceId);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ResourceResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Name is too short (min: 3)
      Name is too long (max: 50)
      Name cannot be empty
      Link cannot be empty
      Icon cannot be empty`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiEndpoint({
    summary: 'Create student resource',
    permissions: PERMISSION.RESOURCES_CREATE,
  })
  @Post()
  create (
    @Body() body: CreateResourceDTO,
  ) {
    return this.resourceService.create(body);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ResourceResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Name is too short (min: 3)
      Name is too long (max: 50)
      
    InvalidEntityId:
      Resource with such id is not found`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiParam({
    name: 'resourceId',
    description: 'Id of student resource',
    type: String,
    required: true,
  })
  @ApiEndpoint({
    summary: 'Update specific student resource',
    permissions: PERMISSION.RESOURCES_UPDATE,
  })
  @Patch('/:resourceId')
  async update (
    @Param('resourceId', ResourceByIdPipe) resourceId: string,
    @Body() body: UpdateResourceDTO,
  ) {
    const updResource = await this.resourceService.update(resourceId, body);
    return this.resourceMapper.getResource(updResource);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ResourcesResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Name is too short (min: 3)
      Name is too long (max: 50)
      Resource id can not be empty
      
    InvalidEntityId:
      Resource with such id is not found`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiEndpoint({
    summary: 'Update many student resources by their id`s',
    permissions: PERMISSION.RESOURCES_UPDATE,
  })
  @Patch()
  async updateMany (
      @Body() body: UpdateResourcesDTO,
  ) {
    const updResources = await this.resourceService.updateMany(body);
    return this.resourceMapper.getResources(updResources);
  }

  @ApiBearerAuth()
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityId:
      Resource with such id is not found`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'resourceId',
    description: 'Id of student resource',
    type: String,
    required: true,
  })
  @ApiEndpoint({
    summary: 'Delete specific student resource',
    permissions: PERMISSION.RESOURCES_DELETE,
  })
  @Delete('/:resourceId')
  delete (
    @Param('resourceId', ResourceByIdPipe) resourceId: string,
  ) {
    return this.resourceService.delete(resourceId);
  }
}