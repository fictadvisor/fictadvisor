import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
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
  RoleResponse,
  RolesResponse,
  GrantResponse,
  MappedGrant,
  GrantsResponse,
} from '@fictadvisor/utils/responses';
import { PERMISSION } from '@fictadvisor/utils/security';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { RoleByIdPipe } from '../pipes/RoleByIdPipe';
import { GrantByIdPipe } from '../pipes/GrantByIdPipe';
import { GrantMapper } from '../../mappers/GrantMapper';
import { RoleMapper } from '../../mappers/RoleMapper';
import { RoleService } from '../services/RoleService';

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
  async getAll (@Query() query: QueryAllRolesDTO) {
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
  async get (@Param('roleId', RoleByIdPipe) roleId: string) {
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
    @Request() req
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
      Weight cannot be empty
      Weight must be more than 0
      Weight must be less than 5000
      Display name length must be more than 3
      Display name length must be less than 32`,
  })
  @ApiEndpoint({
    summary: 'Create the role',
    permissions: PERMISSION.ROLES_CREATE,
  })
  @Post()
  async create (@Body() body: CreateRoleDTO) {
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
      Weight must be more than 0
      Weight must be less than 5000
      Display name length must be more than 3
      Display name length must be less than 32
      
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
    @Body() body: UpdateRoleDTO
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
  async delete (@Param('roleId', RoleByIdPipe) roleId: string) {
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
      Set must be an boolean
      
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
  async getAllGrants (
    @Param('roleId', RoleByIdPipe) roleId: string,
    @Query() query: QueryAllGrantsDTO,
  ): Promise<GrantsResponse> {
    const grants = await this.roleService.getAllGrants(roleId, query);
    return {
      grants: this.roleMapper.getGrants(grants.data),
      pagination: grants.pagination,
    };
  }

  @ApiOkResponse({
    type: MappedGrant,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Role with such id is not found
      Grant with such id is not found
      
    NotBelongException
      This grant does not belong to this role`,
  })
  @ApiParam({
    name: 'roleId',
    required: true,
    description: 'Id of the role, which grants you want to get',
  })
  @ApiParam({
    name: 'grantId',
    required: true,
    description: 'Id of the certain grant',
  })
  @ApiEndpoint({
    summary: 'Get the grant by roleId and grantId',
  })
  @Get('/:roleId/grants/:grantId')
  async getGrant (
    @Param('roleId', RoleByIdPipe) roleId: string,
    @Param('grantId', GrantByIdPipe) grantId: string,
  ): Promise<MappedGrant> {
    const grant = await this.roleService.getGrant(roleId, grantId);
    return this.grantMapper.getMappedGrant(grant);
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
      Permission can not be less then 3 chars
      Permission can not be longer then 200 chars
      Set is not a boolean
      Weight must be a number
      Weight cannot be empty
      Weight can not be less then 1
      Weight can not be bigger then 5000
      
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
  ): Promise<MappedGrant> {
    const grant = await this.roleService.createGrant(roleId, body);
    return this.grantMapper.getMappedGrant(grant);
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
    summary: 'Create grants to the role by id',
    permissions: PERMISSION.ROLES_$ROLEID_GRANTS_CREATE,
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
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Role with such id is not found
      Grant with such id is not found
      
    InvalidBodyException:
      Permission can not be less then 3 chars
      Permission can not be longer then 200 chars
      Set must be boolean
      Weight must be a number
      Weight can not be less then 1
      Weight can not be bigger then 5000
      
    NotBelongException
      This grant does not belong to this role`,
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
    description: 'Id of certain role',
  })
  @ApiParam({
    name: 'grantId',
    required: true,
    description: 'Id of certain grant',
  })
  @ApiEndpoint({
    summary: 'Update certain grant',
    permissions: PERMISSION.ROLES_$ROLEID_GRANTS_UPDATE,
  })
  @Patch('/:roleId/grants/:grantId')
  async updateGrant (
    @Param('roleId', RoleByIdPipe) roleId: string,
    @Param('grantId', GrantByIdPipe) grantId: string,
    @Body() body: UpdateGrantDTO,
  ): Promise<MappedGrant> {
    const grant = await this.roleService.updateGrant(roleId, grantId, body);
    return this.grantMapper.getMappedGrant(grant);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: MappedGrant,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Role with such id is not found
      Grant with such id is not found
      
    NotBelongException
      This grant does not belong to this role`,
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
    description: 'Id of certain role',
  })
  @ApiParam({
    name: 'grantId',
    required: true,
    description: 'Id of certain grant',
  })
  @ApiEndpoint({
    summary: 'Delete certain grant',
    permissions: PERMISSION.ROLES_$ROLEID_GRANTS_DELETE,
  })
  @Delete('/:roleId/grants/:grantId')
  async deleteGrant (
    @Param('roleId', RoleByIdPipe) roleId: string,
    @Param('grantId', GrantByIdPipe) grantId: string,
  ): Promise<MappedGrant> {
    const grant = await this.roleService.deleteGrant(roleId, grantId);
    return this.grantMapper.getMappedGrant(grant);
  }
}
