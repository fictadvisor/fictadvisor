import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './UserService';
import { TelegramGuard } from '../../security/TelegramGuard';
import { JwtGuard } from '../../security/JwtGuard';
import { ApproveDTO } from './dto/ApproveDTO';
import { GiveRoleDTO } from './dto/GiveRoleDTO';
import { CreateSuperheroDTO } from "./dto/CreateSuperheroDTO";
import { PermissionGuard } from "../../security/permission-guard/PermissionGuard";
import { Permission } from "../../security/permission-guard/Permission";
import { UserByIdPipe } from "./UserByIdPipe";
import { CreateContactDTO } from "./dto/CreateContactDTO";
import { UpdateContactDTO } from "./dto/UpdateContactDTO";
import { UpdateUserDTO } from "./dto/UpdateUserDTO";
import { UpdateStudentDTO } from "./dto/UpdateStudentDTO";

import { ContactByUserIdPipe } from "./ContactByUserIdPipe";
import { GroupRequestDTO } from './dto/GroupRequestDTO';

@Controller({
  version: '2',
  path: '/users',
})
export class UserController {
  constructor(
    private userService: UserService,
  ) {
  }

  @UseGuards(TelegramGuard)
  @Patch('/:userId/verifyStudent')
  verify(
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: ApproveDTO,
  ) {
    return this.userService.updateStudent(userId, body);
  }

  @UseGuards(TelegramGuard)
  @Patch('/:userId/verifySuperhero')
  verifySuperhero(
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: ApproveDTO,
  ) {
    return this.userService.updateSuperhero(userId, body);
  }

  @Permission('users.$userId.group.request')
  @UseGuards(JwtGuard, PermissionGuard)
  @Patch('/:userId/requestNewGroup')
  requestNewGroup(
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: GroupRequestDTO,
  ) {
    return this.userService.requestNewGroup(userId, body);
  }

  @Permission('users.$userId.superhero.create')
  @UseGuards(JwtGuard, PermissionGuard)
  @Post('/:userId/superhero')
  async createSuperhero(
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: CreateSuperheroDTO,
  ) {
    return this.userService.createSuperhero(userId, body);
  }

  @Permission('users.$userId.selective.get')
  @UseGuards(JwtGuard, PermissionGuard)
  @Get('/:userId/selective')
  async getSelective(
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    const dbDisciplines = await this.userService.getSelective(userId);
    return { disciplines: dbDisciplines.map((d) => d.id) };
  }

  @UseGuards()
  @Post('/:userId/roles')
  giveRole(
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: GiveRoleDTO,
  ) {
    return this.userService.giveRole(userId, body);
  }

  @Delete('/:userId/roles/:roleId')
  removeRole(
    @Param('userId', UserByIdPipe) userId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.userService.removeRole(userId, roleId);
  }

  @Permission('users.delete')
  @UseGuards(JwtGuard, PermissionGuard)
  @Delete('/:userId')
  deleteUser(
    @Param('userId', UserByIdPipe) userId: string,
  ){
    return this.userService.deleteUser(userId);
  }

  @Permission('users.update')
  @UseGuards(JwtGuard, PermissionGuard)
  @Patch('/:userId')
  updateUser(
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: UpdateUserDTO
  ){
    return this.userService.updateUser(userId, body);
  }


  @Permission('users.$userId.contacts.get')
  @UseGuards(JwtGuard, PermissionGuard)
  @Get('/:userId/contacts')
  getContacts(
    @Param('userId', UserByIdPipe) userId: string,
  ){
    return this.userService.getContacts(userId);
  }

  @Permission('users.$userId.contacts.create')
  @UseGuards(JwtGuard, PermissionGuard)
  @Post('/:userId/contacts')
  createContact(
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: CreateContactDTO,
  ){
    return this.userService.createContact(userId, body);
  }

  @Permission('users.$userId.contacts.update')
  @UseGuards(JwtGuard, PermissionGuard)
  @Patch('/:userId/contacts/:name')
  updateContact(
    @Param(ContactByUserIdPipe) params,
    @Body() body: UpdateContactDTO,
  ){
    return this.userService.updateContact(params.userId, params.name, body);
  }

  @Permission('users.$userId.contacts.delete')
  @UseGuards(JwtGuard, PermissionGuard)
  @Delete('/:userId/contacts/:name')
  deleteContact(
    @Param(ContactByUserIdPipe) params,
  ){
    return this.userService.deleteContact(params.userId, params.name);
  }

  @Permission('students.delete')
  @UseGuards(JwtGuard, PermissionGuard)
  @Delete('/:userId/student')
  deleteStudent(
    @Param('userId', UserByIdPipe) userId: string,
  ){
    return this.userService.deleteStudent(userId);
  }

  @Permission('students.$userId.update')
  @UseGuards(JwtGuard, PermissionGuard)
  @Patch('/:userId/student')
  updateStudent(
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: UpdateStudentDTO,
  ){
    return this.userService.updateStudent(userId, body);
  }

  @UseGuards(TelegramGuard)
  @Get('/:userId/telegram')
  getUserForTelegram(
    @Param('userId', UserByIdPipe) userId: string,
  ){
    return this.userService.getUserForTelegram(userId);
  }

  @Permission('users.$userId.get')
  @UseGuards(JwtGuard, PermissionGuard)
  @Get('/:userId')
  getMe(
    @Param('userId', UserByIdPipe) userId: string,
  ){
    return this.userService.getUser(userId);
  }


}