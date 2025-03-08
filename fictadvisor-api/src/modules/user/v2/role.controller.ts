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
  QueryAllRolesDTO,
  CreateRoleDTO,
  QueryAllGrantsDTO,
  UpdateRoleDTO,
  CreateRoleWithGrantsDTO,
  CreateGrantDTO,
  CreateGrantsDTO,
  UpdateGrantDTO,
} from '@fictadvisor/utils/requests';
import {
  BaseRoleResponse,
  GrantResponse,
  GrantsResponse,
  RoleResponse,
  RolesResponse,
  GrantCountResponse,
} from '@fictadvisor/utils/responses';
import { PERMISSION } from '@fictadvisor/utils/security';
import { ApiEndpoint } from '../../../common/decorators/api-endpoint.decorator';
import { GetUser } from '../../../common/decorators/get-user.decorator';
import { RoleByIdPipe } from '../../../common/pipes/role-by-id.pipe';
import { GrantByIdPipe } from '../../../common/pipes/grant-by-id.pipe';
import { RoleService } from './role.service';
import { RoleDocumentation } from '../../../common/documentation/modules/v2/role';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { DbRole } from '../../../database/v2/entities/role.entity';
import { DbGrant } from '../../../database/v2/entities/grant.entity';

@ApiTags('Roles')
@Controller({
  version: '2',
  path: '/roles',
})
export class RoleController {
  constructor (
    private roleService: RoleService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  @ApiEndpoint({
    summary: 'Get information about each role',
    documentation: RoleDocumentation.GET_ALL,
  })
  @Get()
  async getAll (@Query() query: QueryAllRolesDTO): Promise<RolesResponse> {
    const roles = await this.roleService.getAll(query);
    const data = this.mapper.mapArray(roles.data, DbRole, RoleResponse);
    return {
      data,
      pagination: roles.pagination,
    };
  }

  @ApiEndpoint({
    summary: 'Get information about the specific role by id',
    documentation: RoleDocumentation.GET,
  })
  @Get('/:roleId')
  async get (@Param('roleId', RoleByIdPipe) roleId: string): Promise<RoleResponse> {
    const role = await this.roleService.get(roleId);
    return this.mapper.map(role, DbRole, RoleResponse);
  }

  @ApiEndpoint({
    summary: 'Create an information about the role with grants',
    documentation: RoleDocumentation.CREATE_WITH_GRANTS,
    permissions: PERMISSION.ROLES_CREATE,
  })
  @Post('/grants')
  async createWithGrants (
    @Body() body: CreateRoleWithGrantsDTO,
    @GetUser('id') userId: string,
  ): Promise<RoleResponse> {
    const role = await this.roleService.createRoleWithGrants(body, userId);
    return this.mapper.map(role, DbRole, RoleResponse);
  }

  @ApiEndpoint({
    summary: 'Create the role',
    documentation: RoleDocumentation.CREATE,
    permissions: PERMISSION.ROLES_CREATE,
  })
  @Post()
  async create (@Body() body: CreateRoleDTO): Promise<BaseRoleResponse> {
    const role = await this.roleService.createRole(body);
    return this.mapper.map(role, DbRole, BaseRoleResponse);
  }

  @ApiEndpoint({
    summary: 'Update the role',
    documentation: RoleDocumentation.UPDATE,
    permissions: PERMISSION.ROLES_$ROLEID_UPDATE,
  })
  @Patch('/:roleId')
  async update (
    @Param('roleId', RoleByIdPipe) roleId: string,
    @Body() body: UpdateRoleDTO
  ): Promise<BaseRoleResponse> {
    const role = await this.roleService.update(roleId, body);
    return this.mapper.map(role, DbRole, BaseRoleResponse);
  }

  @ApiEndpoint({
    summary: 'Delete the role',
    documentation: RoleDocumentation.DELETE,
    permissions: PERMISSION.ROLES_$ROLEID_DELETE,
  })
  @Delete('/:roleId')
  async delete (@Param('roleId', RoleByIdPipe) roleId: string): Promise<BaseRoleResponse> {
    const role = await this.roleService.delete(roleId);
    return this.mapper.map(role, DbRole, BaseRoleResponse);
  }

  @ApiEndpoint({
    summary: 'Get grants of the role by id',
    documentation: RoleDocumentation.GET_ALL_GRANTS,
  })
  @Get('/:roleId/grants')
  async getAllGrants (
    @Param('roleId', RoleByIdPipe) roleId: string,
    @Query() query: QueryAllGrantsDTO,
  ): Promise<GrantsResponse> {
    const grants = await this.roleService.getAllGrants(roleId, query);
    return {
      grants: this.mapper.mapArray(grants.data, DbGrant, GrantResponse),
      pagination: grants.pagination,
    };
  }

  @ApiEndpoint({
    summary: 'Get the grant by roleId and grantId',
    documentation: RoleDocumentation.GET_GRANT,
  })
  @Get('/:roleId/grants/:grantId')
  async getGrant (
    @Param('roleId', RoleByIdPipe) roleId: string,
    @Param('grantId', GrantByIdPipe) grantId: string,
  ): Promise<GrantResponse> {
    const grant = await this.roleService.getGrant(roleId, grantId);
    return this.mapper.map(grant, DbGrant, GrantResponse);
  }

  @ApiEndpoint({
    summary: 'Create grant for certain role',
    documentation: RoleDocumentation.CREATE_GRANT,
    permissions: PERMISSION.ROLES_$ROLEID_GRANT_CREATE,
  })
  @Post('/:roleId/grant')
  async createGrant (
    @Body() body: CreateGrantDTO,
    @Param('roleId', RoleByIdPipe) roleId: string,
  ): Promise<GrantResponse> {
    const grant = await this.roleService.createGrant(roleId, body);
    return this.mapper.map(grant, DbGrant, GrantResponse);
  }

  @ApiEndpoint({
    summary: 'Create grants to the role by id',
    documentation: RoleDocumentation.CREATE_GRANTS,
    permissions: PERMISSION.ROLES_$ROLEID_GRANTS_CREATE,
  })
  @Post('/:roleId/grants')
  async createGrants (
    @Body() body: CreateGrantsDTO,
    @Param('roleId', RoleByIdPipe) roleId: string,
  ): Promise<GrantCountResponse> {
    return this.roleService.createGrants(roleId, body.grants);
  }

  @ApiEndpoint({
    summary: 'Update certain grant',
    documentation: RoleDocumentation.UPDATE_GRANT,
    permissions: PERMISSION.ROLES_$ROLEID_GRANTS_UPDATE,
  })
  @Patch('/:roleId/grants/:grantId')
  async updateGrant (
    @Param('roleId', RoleByIdPipe) roleId: string,
    @Param('grantId', GrantByIdPipe) grantId: string,
    @Body() body: UpdateGrantDTO,
  ): Promise<GrantResponse> {
    const grant = await this.roleService.updateGrant(roleId, grantId, body);
    return this.mapper.map(grant, DbGrant, GrantResponse);
  }

  @ApiEndpoint({
    summary: 'Delete certain grant',
    documentation: RoleDocumentation.DELETE_GRANT,
    permissions: PERMISSION.ROLES_$ROLEID_GRANTS_DELETE,
  })
  @Delete('/:roleId/grants/:grantId')
  async deleteGrant (
    @Param('roleId', RoleByIdPipe) roleId: string,
    @Param('grantId', GrantByIdPipe) grantId: string,
  ): Promise<GrantResponse> {
    const grant = await this.roleService.deleteGrant(roleId, grantId);
    return this.mapper.map(grant, DbGrant, GrantResponse);
  }
}
