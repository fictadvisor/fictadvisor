import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { RoleService } from '../services/RoleService';
import { UpdateRoleDTO } from '../dtos/UpdateRoleDTO';
import { CreateRoleWithGrantsDTO } from '../dtos/CreateRoleWithGrantsDTO';
import { CreateGrantsDTO } from '../dtos/CreateGrantsDTO';
import { RoleMapper } from '../../mappers/RoleMapper';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiParam,
} from '@nestjs/swagger';
import {
  RoleResponse,
  RolesResponse,
  BaseRoleResponse,
} from '../responses/RoleResponse';
import { GrantResponse, MappedGrantsResponse } from '../responses/GrantResponse';
import { PERMISSION } from '../../security/PERMISSION';
import { ApiEndpoint } from '../../utils/documentation/decorators';

@ApiTags('Roles')
@Controller({
  version: '2',
  path: '/roles',
})
export class RoleController {
  constructor (
    private roleService: RoleService,
    private roleMapper: RoleMapper,
  ) {}

  @ApiOkResponse({
    type: RoleResponse,
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
  async getRole (
    @Param('roleId') roleId: string,
  ) {
    const role = await this.roleService.get(roleId);
    return this.roleMapper.getRole(role);
  }

  @ApiOkResponse({
    type: RolesResponse,
  })
  @ApiEndpoint({
    summary: 'Get information about each role',
  })
  @Get()
  async getAll () {
    const roles = await this.roleService.getAll();
    const roleMap = this.roleMapper.getAll(roles);
    return { roles: roleMap };
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: RoleResponse,
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
  @ApiEndpoint({
    summary: 'Create an information about the role',
    permissions: PERMISSION.ROLES_CREATE,
  })
  @Post()
  async create (
    @Body() body: CreateRoleWithGrantsDTO,
    @Request() req,
  ) {
    const role = await this.roleService.createRole(body, req.user.id);
    return this.roleMapper.create(role);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: GrantResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Permission cannot be empty
      Set is not a boolean`,
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
    description: 'Id of the role to which you want to give grants',
  })
  @ApiEndpoint({
    summary: 'Give grants to the role by id',
    permissions: PERMISSION.ROLES_$ROLEID_GRANTS_CREATE,
  })
  @Post('/:roleId/grants')
  createGrants (
    @Body() body: CreateGrantsDTO,
    @Param('roleId') roleId: string,
  ) {
    return this.roleService.createGrants(roleId, body.grants);
  }

  @ApiOkResponse({
    type: MappedGrantsResponse,
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
    @Param('roleId') roleId: string,
  ) {
    const grants = await this.roleService.getGrants(roleId);
    const grantsMap = this.roleMapper.getGrants(grants);
    return { grants: grantsMap };
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
  @ApiParam({
    name: 'roleId',
    required: true,
    description: 'Id of the role to delete it',
  })
  @ApiEndpoint({
    summary: 'Delete the role by id',
    permissions: PERMISSION.ROLES_$ROLEID_DELETE,
  })
  @Delete('/:roleId')
  async delete (
    @Param('roleId') roleId: string,
  ) {
    const role = await this.roleService.delete(roleId);
    return this.roleMapper.delete(role);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: BaseRoleResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Name is not an enum
      Weight is not a number`,
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
  @ApiEndpoint({
    summary: 'Update the role',
    permissions: PERMISSION.ROLES_$ROLEID_UPDATE,
  })
  @Patch('/:roleId')
  async update (
    @Param('roleId') roleId: string,
    @Body() body: UpdateRoleDTO,
  ) {
    const role = await this.roleService.update(roleId, body);
    return this.roleMapper.update(role);
  }

}
