import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { RoleService } from '../services/RoleService';
import { UpdateRoleDTO } from '../dtos/UpdateRoleDTO';
import { JwtGuard } from '../../security/JwtGuard';
import { PermissionGuard } from '../../security/permission-guard/PermissionGuard';
import { Permission } from '../../security/permission-guard/Permission';
import { CreateRoleWithGrantsDTO } from '../dtos/CreateRoleWithGrantsDTO';
import { CreateGrantsDTO } from '../dtos/CreateGrantsDTO';
import { RoleMapper } from '../../mappers/RoleMapper';

@Controller({
  version: '2',
  path: '/roles',
})
export class RoleController {
  constructor (
    private roleService: RoleService,
    private roleMapper: RoleMapper,
  ) {}

  @Get('/:roleId')
  async getRole (
    @Param('roleId') roleId: string,
  ) {
    const role = await this.roleService.get(roleId);
    return this.roleMapper.getRole(role);
  }

  @Get()
  async getAll () {
    const roles = await this.roleService.getAll();
    const roleMap = this.roleMapper.getAll(roles);
    return { roles: roleMap };
  }

  @Permission('roles.create')
  @UseGuards(JwtGuard, PermissionGuard)
  @Post()
  async create (
    @Body() body: CreateRoleWithGrantsDTO,
    @Request() req
  ) {
    const role = await this.roleService.createRole(body, req.user.id);
    return this.roleMapper.create(role);
  }

  @Post('/:roleId/grants')
  createGrants (
    @Body() body: CreateGrantsDTO,
    @Param('roleId') roleId: string,
  ) {
    return this.roleService.createGrants(roleId, body.grants);
  }

  @Get('/:roleId/grants')
  async getGrants (
    @Param('roleId') roleId: string,
  ) {
    const grants = await this.roleService.getGrants(roleId);
    const grantsMap = this.roleMapper.getGrants(grants);
    return { grants: grantsMap };
  }

  @Delete('/:roleId')
  async delete (
    @Param('roleId') roleId: string,
  ) {
    const role = await this.roleService.delete(roleId);
    return this.roleMapper.delete(role);
  }

  @Patch('/:roleId')
  async update (
    @Param('roleId') roleId: string,
    @Body() body: UpdateRoleDTO,
  ) {
    const role = await this.roleService.update(roleId, body);
    return this.roleMapper.update(role);
  }

}