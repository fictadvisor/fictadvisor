import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { RoleService } from './RoleService';
import { CreateGrantsDTO, CreateRoleWithGrantsDTO } from '../dto/CreateRoleDTO';
import { UpdateRoleDTO } from './dto/UpdateRoleDTO';
import { JwtGuard } from '../../../security/JwtGuard';
import { PermissionGuard } from '../../../security/permission-guard/PermissionGuard';
import { Permission } from '../../../security/permission-guard/Permission';

@Controller({
  version: '2',
  path: '/roles',
})
export class RoleController {
  constructor (
    private roleService: RoleService,
  ) {}

  @Get('/:roleId')
  getRole (
    @Param('roleId') roleId: string,
  ) {
    return this.roleService.get(roleId);
  }

  @Get()
  async getAll () {
    const roles = await this.roleService.getAll();
    return { roles };
  }

  @Permission('roles.create')
  @UseGuards(JwtGuard, PermissionGuard)
  @Post()
  create (
    @Body() body: CreateRoleWithGrantsDTO,
    @Request() req
  ) {
    return this.roleService.createRole(body, req.user.id);
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
    return { grants };
  }

  @Delete('/:roleId')
  delete (
    @Param('roleId') roleId: string,
  ) {
    return this.roleService.delete(roleId);
  }

  @Patch('/:roleId')
  update (
    @Param('roleId') roleId: string,
    @Body() body: UpdateRoleDTO,
  ) {
    return this.roleService.update(roleId, body);
  }

}