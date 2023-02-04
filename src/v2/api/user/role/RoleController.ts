import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { RoleService } from './RoleService';
import { CreateGrantsDTO, CreateRoleWithGrantsDTO } from '../dto/CreateRoleDTO';
import { UpdateRoleDTO } from './dto/UpdateRoleDTO';

@Controller({
  version: '2',
  path: '/roles',
})
export class RoleController {
  constructor (
    private roleService: RoleService,
  ) {}

  @Post()
  create (
    @Body() body: CreateRoleWithGrantsDTO,
  ) {
    return this.roleService.createRole(body);
  }

  @Post('/:roleId/grants')
  createGrants (
    @Body() body: CreateGrantsDTO,
    @Param('roleId') roleId: string,
  ) {
    return this.roleService.createGrants(roleId, body.grants);
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