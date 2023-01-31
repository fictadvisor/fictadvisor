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
    private readonly roleService: RoleService
  ) {}

  @Post()
  async create (
  @Body() body: CreateRoleWithGrantsDTO
  ) {
    return await this.roleService.createRole(body);
  }

  @Post('/:roleId/grants')
  async createGrants (
  @Body() body: CreateGrantsDTO,
    @Param('roleId') roleId: string
  ) {
    return await this.roleService.createGrants(roleId, body.grants);
  }

  @Delete('/:roleId')
  async delete (
  @Param('roleId') roleId: string
  ) {
    await this.roleService.delete(roleId);
  }

  @Patch('/:roleId')
  async update (
  @Param('roleId') roleId: string,
    @Body() body: UpdateRoleDTO
  ) {
    await this.roleService.update(roleId, body);
  }
}
