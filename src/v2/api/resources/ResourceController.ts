import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { QueryAllDTO } from 'src/v2/utils/QueryAllDTO';
import { ResourceService } from './ResourceService';
import { ResourceByIdPipe } from './ResourceByIdPipe';
import { CreateResourceDTO } from './dto/CreateResourceDTO';
import { UpdateResourceDTO } from './dto/UpdateResourceDTO';
import { Access } from 'src/v2/security/Access';

@Controller({
  version: '2',
  path: '/studentResources',
})
export class ResourceController {
  constructor(
    private resourceService: ResourceService,
  ) {}

  @Get()
  async getAll(
    @Query() body: QueryAllDTO,
  ) {
    const studentResources = await this.resourceService.getAll(body);

    return { studentResources };
  }

  @Get('/:resourceId')
  get(
    @Param('resourceId', ResourceByIdPipe) resourceId: string,
  ) {
    return this.resourceService.get(resourceId);
  }

  @Access('resources.create')
  @Post()
  create(
    @Body() body: CreateResourceDTO,
  ) {
    return this.resourceService.create(body);
  }

  @Access('resources.update')
  @Patch('/:resourceId')
  async update(
    @Param('resourceId', ResourceByIdPipe) resourceId: string,
    @Body() body: UpdateResourceDTO,
  ) {
    return this.resourceService.update(resourceId, body);
  }

  @Access('resources.delete')
  @Delete('/:resourceId')
  delete(
    @Param('resourceId', ResourceByIdPipe) resourceId: string,
  ) {
    return this.resourceService.delete(resourceId);
  }
}