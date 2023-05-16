import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './UserService';
import { TelegramGuard } from '../../security/TelegramGuard';
import { ApproveDTO, ApproveStudentByTelegramDTO } from './dto/ApproveDTO';
import { GiveRoleDTO } from './dto/GiveRoleDTO';
import { CreateSuperheroDTO } from './dto/CreateSuperheroDTO';
import { UserByIdPipe } from './UserByIdPipe';
import { CreateContactDTO } from './dto/CreateContactDTO';
import { UpdateContactDTO } from './dto/UpdateContactDTO';
import { UpdateUserDTO } from './dto/UpdateUserDTO';
import { UpdateStudentDTO } from './dto/UpdateStudentDTO';

import { ContactByUserIdPipe } from './ContactByUserIdPipe';
import { GroupRequestDTO } from './dto/GroupRequestDTO';
import { Access } from 'src/v2/security/Access';
import { TelegramDTO } from '../auth/dto/TelegramDTO';
import { UserMapper } from './UserMapper';

@Controller({
  version: '2',
  path: '/users',
})
export class UserController {
  constructor (
    private userService: UserService,
    private userMapper: UserMapper,
  ) {
  }

  @UseGuards(TelegramGuard)
  @Patch('/:userId/verifyStudent')
  async verify (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() { state, isCaptain }: ApproveStudentByTelegramDTO,
  ) {
    return this.userService.verifyStudent(userId, isCaptain, state);
  }

  @UseGuards(TelegramGuard)
  @Patch('/:userId/verifySuperhero')
  verifySuperhero (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: ApproveDTO,
  ) {
    return this.userService.updateSuperhero(userId, body);
  }

  @Access('users.$userId.group.request')
  @Patch('/:userId/requestNewGroup')
  requestNewGroup (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: GroupRequestDTO,
  ) {
    return this.userService.requestNewGroup(userId, body);
  }

  @Access('users.$userId.superhero.create')
  @Post('/:userId/superhero')
  async createSuperhero (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: CreateSuperheroDTO,
  ) {
    return this.userService.createSuperhero(userId, body);
  }

  @Access('users.$userId.selective.get')
  @Get('/:userId/selective')
  async getSelective (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    const dbDisciplines = await this.userService.getSelective(userId);
    return { disciplines: dbDisciplines.map((d) => d.id) };
  }

  @UseGuards()
  @Post('/:userId/roles')
  giveRole (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() { roleId }: GiveRoleDTO,
  ) {
    return this.userService.giveRole(userId, roleId);
  }

  @Delete('/:userId/roles/:roleId')
  removeRole (
    @Param('userId', UserByIdPipe) userId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.userService.removeRole(userId, roleId);
  }

  @Access('users.delete')
  @Delete('/:userId')
  deleteUser (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return this.userService.deleteUser(userId);
  }

  @Access('users.update')
  @Patch('/:userId')
  async updateUser (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: UpdateUserDTO
  ) {
    const user = await this.userService.updateUser(userId, body);
    return this.userMapper.updateUser(user);
  }

  @Access('users.$userId.contacts.get')
  @Get('/:userId/contacts')
  async getContacts (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    const contacts = await this.userService.getContacts(userId);
    return { contacts };
  }

  @Access('users.$userId.contacts.create')
  @Post('/:userId/contacts')
  createContact (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: CreateContactDTO,
  ) {
    return this.userService.createContact(userId, body);
  }

  @Access('users.$userId.contacts.update')
  @Patch('/:userId/contacts/:name')
  updateContact (
    @Param(ContactByUserIdPipe) params,
    @Body() body: UpdateContactDTO,
  ) {
    return this.userService.updateContact(params.userId, params.name, body);
  }

  @Access('users.$userId.contacts.delete')
  @Delete('/:userId/contacts/:name')
  deleteContact (
    @Param(ContactByUserIdPipe) params,
  ) {
    return this.userService.deleteContact(params.userId, params.name);
  }

  @Access('students.delete')
  @Delete('/:userId/student')
  deleteStudent (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return this.userService.deleteStudent(userId);
  }

  @Access('users.$userId.student.update')
  @Patch('/:userId/student')
  updateStudent (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: UpdateStudentDTO,
  ) {
    return this.userService.updateStudent(userId, body);
  }

  @UseGuards(TelegramGuard)
  @Get('/:userId/telegram')
  getUserForTelegram (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return this.userService.getUser(userId);
  }

  @Access('users.$userId.telegram.link')
  @Post('/:userId/telegram')
  async linkTelegram (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() telegram: TelegramDTO,
  ) {
    await this.userService.linkTelegram(userId, telegram);
  }

  @Access('users.$userId.get')
  @Get('/:userId')
  getMe (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return this.userService.getUser(userId);
  }
}