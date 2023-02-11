import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, Patch } from '@nestjs/common';
import { TeacherService } from './TeacherService';
import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { CreateTeacherDTO } from './dto/CreateTeacherDTO';
import { UpdateTeacherDTO } from './dto/UpdateTeacherDTO';
import { CreateContactDTO } from '../user/dto/CreateContactDTO';
import { UpdateContactDTO } from '../user/dto/UpdateContactDTO';
import { JwtGuard } from '../../security/JwtGuard';
import { Permission } from 'src/v2/security/permission-guard/Permission';
import { PermissionGuard } from 'src/v2/security/permission-guard/PermissionGuard';
import { TeacherByIdPipe } from './dto/TeacherByIdPipe';
import { ContactByNamePipe } from './dto/ContactByNamePipe';

@Controller({
  version: '2',
  path: '/teachers',
})
export class TeacherController {
  constructor(
    private teacherService: TeacherService,
  ) {}


  @Get()
  getAll(
    @Query() query: QueryAllDTO,
  ) {
    return this.teacherService.getAll(query);
  }

  @Get('/:teacherId/roles')
  async getTeacherRoles(
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    const roles = await this.teacherService.getTeacherRoles(teacherId);

    return { roles };
  }

  @Get('/:teacherId')
  getTeacher(
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    return this.teacherService.getTeacher(teacherId);
  }

  @Permission('teachers.$teacherId.create')
  @UseGuards(JwtGuard, PermissionGuard)
  @Post()
  create(
    @Body() body: CreateTeacherDTO,
  ) {
    return this.teacherService.create(body);
  }

  @Permission('teachers.$teacherId.update')
  @UseGuards(JwtGuard, PermissionGuard)
  @Patch('/:teacherId')
  async update(
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Body() body: UpdateTeacherDTO,
  ) {
    return this.teacherService.update(teacherId, body);
  }

  @Permission('teachers.$teacherId.delete')
  @UseGuards(JwtGuard, PermissionGuard)
  @Delete('/:teacherId')
  async delete(
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    return this.teacherService.delete(teacherId);
  }

  @Get('/:teacherId/contacts')
  async getAllContacts(
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    const contacts = await this.teacherService.getAllContacts(teacherId);
    return { contacts };
  }

  @Get('/:teacherId/contacts/:name')
  getContact(
    @Param(ContactByNamePipe) params: {teacherId: string, name: string},
  ) {
    return this.teacherService.getContact(params.teacherId, params.name);
  }

  @Permission('teachers.$teacherId.contacts.create')
  @UseGuards(JwtGuard, PermissionGuard)
  @Post('/:teacherId/contacts')
  createContact(
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Body() body: CreateContactDTO,
  ){
    return this.teacherService.createContact(teacherId, body);
  }

  @Permission('teachers.$teacherId.contacts.update')
  @UseGuards(JwtGuard, PermissionGuard)
  @Patch('/:teacherId/contacts/:name')
  async updateContact(
    @Param(ContactByNamePipe) params: {teacherId: string, name: string},
    @Body() body: UpdateContactDTO,
  ){
    return this.teacherService.updateContact(params.teacherId, params.name, body);
  }

  @Permission('teachers.$teacherId.contacts.delete')
  @UseGuards(JwtGuard, PermissionGuard)
  @Delete('/:teacherId/contacts/:name')
  async deleteContact(
    @Param(ContactByNamePipe) [teacherId, name]: string[],
  ){
    return this.teacherService.deleteContact(teacherId, name);
  }
}