import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RoleService } from '../services/RoleService';
import { GrantMapper } from '../../mappers/GrantMapper';
import { RoleMapper } from '../../mappers/RoleMapper';
import { PERMISSION } from '../../security/PERMISSION';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { BaseRoleResponse, RoleResponse } from '../responses/RoleResponse';
import { RolesResponse } from '../responses/RolesResponse';
import { GrantResponse, MappedGrant } from '../responses/GrantResponse';
import { GrantsResponse } from '../responses/GrantsResponse';
import { QueryAllRolesDTO } from '../dtos/QueryAllRolesDTO';
import { CreateRoleDTO } from '../dtos/CreateRoleDTO';
import { QueryAllGrantsDTO } from '../dtos/QueryAllGrantsDTO';
import { UpdateGrantDTO } from '../dtos/UpdateGrantDTO';
import { UpdateRoleDTO } from '../dtos/UpdateRoleDTO';
import { CreateRoleWithGrantsDTO } from '../dtos/CreateRoleWithGrantsDTO';
import { CreateGrantDTO, CreateGrantsDTO } from '../dtos/CreateGrantsDTO';
import { RoleByIdPipe } from '../pipes/RoleByIdPipe';
import { GrantByIdPipe } from '../pipes/GrantByIdPipe';

@ApiTags('Roles')
@Controller({
  version: '2',
  path: '/roles',
})
export class RoleController {
  constructor (
    private roleService: RoleService,
    private roleMapper: RoleMapper,
    private grantMapper: GrantMapper,
  ) {}

  @ApiOkResponse({
    type: RolesResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidQueryException:
      Page must be a number
      PageSize must be a number
      Wrong value for order
      Sort must be an enum
      Name must be an enum`,
  })
  @ApiEndpoint({
    summary: 'Get information about each role',
  })
  @Get()
  async getAll (
    @Query() query: QueryAllRolesDTO,
  ) {
    const roles = await this.roleService.getAll(query);
    const data = this.roleMapper.getAll(roles.data);
    return {
      data,
      pagination: roles.pagination,
    };
  }

  @ApiOkResponse({
    type: RoleResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Role with such id is not found`,
  })
  @ApiParam({
    name: 'roleId',
    required: true,
    description: 'Id of the role to get information about it',
  })
  @ApiEndpoint({
    summary: 'Get information about the specific role by id',
  })
  @Get('/:roleId')
  async get (
    @Param('roleId', RoleByIdPipe) roleId: string,
  ) {
    const role = await this.roleService.get(roleId);
    return this.roleMapper.getRole(role);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: RoleResponse,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n 
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      ParentId with such id is not found
      
    InvalidBodyException:
      Name is not an enum
      Name cannot be empty
      Weight is not a number 
      Weight cannot be empty 
      Permission cannot be empty 
      Set is not boolean`,
  })
  @ApiEndpoint({
    summary: 'Create an information about the role with grants',
    permissions: PERMISSION.ROLES_CREATE,
  })
  @Post('/grants')
  async createWithGrants (
    @Body() body: CreateRoleWithGrantsDTO,
    @Request() req,
  ) {
    const role = await this.roleService.createRoleWithGrants(body, req.user.id);
    return this.roleMapper.createWithGrants(role);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: BaseRoleResponse,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n 
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Name is not an enum
      Name cannot be empty
      Weight is not a number 
      Weight cannot be empty`,
  })
  @ApiEndpoint({
    summary: 'Create an information about the role',
    permissions: PERMISSION.ROLES_CREATE,
  })
  @Post()
  async create (
    @Body() body: CreateRoleDTO,
  ) {
    const role = await this.roleService.createRole(body);
    return this.roleMapper.create(role);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: BaseRoleResponse,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
     NoPermissionException:
       You do not have permission to perform this action`,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Name is not an enum
      Weight is not a number
      
    InvalidEntityIdException:
      Role with such id is not found`,
  })
  @ApiParam({
    name: 'roleId',
    required: true,
    description: 'Id of a role to update it',
  })
  @ApiEndpoint({
    summary: 'Update the role',
    permissions: PERMISSION.ROLES_$ROLEID_UPDATE,
  })
  @Patch('/:roleId')
  async update (
    @Param('roleId', RoleByIdPipe) roleId: string,
    @Body() body: UpdateRoleDTO,
  ) {
    const role = await this.roleService.update(roleId, body);
    return this.roleMapper.update(role);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: BaseRoleResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Role with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'roleId',
    required: true,
    description: 'Id of the role to delete it',
  })
  @ApiEndpoint({
    summary: 'Delete the role',
    permissions: PERMISSION.ROLES_$ROLEID_DELETE,
  })
  @Delete('/:roleId')
  async delete (
    @Param('roleId', RoleByIdPipe) roleId: string,
  ) {
    const role = await this.roleService.delete(roleId);
    return this.roleMapper.delete(role);
  }

  @ApiOkResponse({
    type: GrantsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidQueryException:
      Page must be a number
      PageSize must be a number
      Wrong value for order
      Sort must be an enum
      
    InvalidEntityIdException:
      Role with such id is not found`,
  })
  @ApiParam({
    name: 'roleId',
    required: true,
    description: 'Id of the role, which grants you want to get',
  })
  @ApiEndpoint({
    summary: 'Get grants of the role by id',
  })
  @Get('/:roleId/grants')
  async getGrants (
    @Param('roleId', RoleByIdPipe) roleId: string,
    @Query() query: QueryAllGrantsDTO,
  ) {
    const grants = await this.roleService.getGrants(roleId, query);
    const mappedGrants = this.roleMapper.getGrants(grants.data);
    return {
      grants: mappedGrants,
      pagination: grants.pagination,
    };
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: GrantResponse,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n 
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Permission cannot be empty
      Set is not a boolean
      
    InvalidEntityIdException:
      Role with such id is not found`,
  })
  @ApiParam({
    name: 'roleId',
    required: true,
    description: 'Id of certain role',
  })
  @ApiEndpoint({
    summary: 'Give grants to the role by id',
    permissions: PERMISSION.ROLES_GRANTS_CREATE,
  })
  @Post('/:roleId/grants')
  async createGrants (
    @Body() body: CreateGrantsDTO,
    @Param('roleId', RoleByIdPipe) roleId: string,
  ) {
    return this.roleService.createGrants(roleId, body.grants);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: MappedGrant,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n 
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Permission cannot be empty
      Set is not a boolean
      Weight must be a number
      Weight cannot be empty
      
    InvalidEntityIdException:
      Role with such id is not found`,
  })
  @ApiParam({
    name: 'roleId',
    required: true,
    description: 'Id of certain role',
  })
  @ApiEndpoint({
    summary: 'Create grant for certain role',
    permissions: PERMISSION.ROLES_$ROLEID_GRANT_CREATE,
  })
  @Post('/:roleId/grant')
  async createGrant (
    @Body() body: CreateGrantDTO,
    @Param('roleId', RoleByIdPipe) roleId: string,
  ) {
    const grant = await this.roleService.createGrant(roleId, body);
    return this.grantMapper.getMappedGrant(grant);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: MappedGrant,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidGrantIdException:
      Grant with such id is not found
      Role with such id is not found
      
    InvalidBodyException:
      Set must be boolean,
      Weight must be a number`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'roleId',
    required: true,
    description: 'Id of the role to update it',
  })
  @ApiParam({
    name: 'grantId',
    required: true,
    description: 'Id of certain grant',
  })
  @ApiEndpoint({
    summary: 'Update certain grant',
    permissions: PERMISSION.ROLES_$ROLEID_GRANT_UPDATE,
  })
  @Patch('/:roleId/grant/:grantId')
  async updateGrant (
    @Param('grantId', GrantByIdPipe) grantId: string,
    @Param('roleId', RoleByIdPipe) roleId: string,
    @Body() body: UpdateGrantDTO,
  ) {
    const grant = await this.roleService.updateGrant(roleId, grantId, body);
    return this.grantMapper.getMappedGrant(grant);
  }
}
