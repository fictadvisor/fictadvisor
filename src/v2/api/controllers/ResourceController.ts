import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { QueryAllDTO } from 'src/v2/utils/QueryAllDTO';
import { ResourceService } from '../services/ResourceService';
import { ResourceByIdPipe } from '../pipes/ResourceByIdPipe';
import { CreateResourceDTO } from '../dtos/CreateResourceDTO';
import { UpdateResourceDTO } from '../dtos/UpdateResourceDTO';
import { Access } from 'src/v2/security/Access';
import { PERMISSION } from '../../security/PERMISSION';
import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaginatedResourcesResponse } from '../responses/PaginatedResourcesResponse';
import { ResourceResponse } from '../responses/ResourceResponse';

@ApiTags('Resource')
@Controller({
  version: '2',
  path: '/studentResources',
})
export class ResourceController {
  constructor (
    private resourceService: ResourceService,
  ) {}

  @ApiOkResponse({
    type: PaginatedResourcesResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
                  InvalidQueryException:
                    Page must be a number
                    PageSize must be a number
                    Wrong value for order`,
  })
  @Get()
  async getAll (
    @Query() body: QueryAllDTO,
  ) {
    const studentResources = await this.resourceService.getAll(body);

    return {
      studentResources: studentResources.data,
      pagination: studentResources.pagination,
    };
  }

  @ApiOkResponse({
    type: ResourceResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
                  InvalidEntityId:
                    Resource with such id is not found`,
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
  @Access(PERMISSION.RESOURCES_CREATE)
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
  @Access(PERMISSION.RESOURCES_UPDATE)
  @Patch('/:resourceId')
  async update (
    @Param('resourceId', ResourceByIdPipe) resourceId: string,
    @Body() body: UpdateResourceDTO,
  ) {
    return this.resourceService.update(resourceId, body);
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
  @Access(PERMISSION.RESOURCES_DELETE)
  @Delete('/:resourceId')
  delete (
    @Param('resourceId', ResourceByIdPipe) resourceId: string,
  ) {
    return this.resourceService.delete(resourceId);
  }
}