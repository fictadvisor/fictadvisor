import { Body, Controller, Delete, Get, Param, Post, Query, Patch } from '@nestjs/common';
import { TeacherService } from './TeacherService';
import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { CreateTeacherDTO } from './dto/CreateTeacherDTO';
import { UpdateTeacherDTO } from './dto/UpdateTeacherDTO';
import { CreateContactDTO } from '../user/dto/CreateContactDTO';
import { UpdateContactDTO } from '../user/dto/UpdateContactDTO';
import { Access } from 'src/v2/security/Access';
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
  getTeacherRoles(
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    return this.teacherService.getTeacherRoles(teacherId);
  }

  @Get('/:teacherId')
  getTeacher(
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    return this.teacherService.getTeacher(teacherId);
  }

  @Access('teachers.$teacherId.create')
  @Post()
  create(
    @Body() body: CreateTeacherDTO,
  ) {
    return this.teacherService.create(body);
  }

  @Access('teachers.$teacherId.update')
  @Patch('/:teacherId')
  async update(
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Body() body: UpdateTeacherDTO,
  ) {
    return this.teacherService.update(teacherId, body);
  }

  @Access('teachers.$teacherId.delete')
  @Delete('/:teacherId')
  async delete(
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    return this.teacherService.delete(teacherId);
  }

  @Get('/:teacherId/contacts')
  getAllContacts(
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    return this.teacherService.getAllContacts(teacherId);
  }

  @Get('/:teacherId/contacts/:name')
  getContact(
    @Param(ContactByNamePipe) params: {teacherId: string, name: string},
  ) {
    return this.teacherService.getContact(params.teacherId, params.name);
  }

  @Access('teachers.$teacherId.contacts.create')
  @Post('/:teacherId/contacts')
  createContact(
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Body() body: CreateContactDTO,
  ){
    return this.teacherService.createContact(teacherId, body);
  }

  @Access('teachers.$teacherId.contacts.update')
  @Patch('/:teacherId/contacts/:name')
  async updateContact(
    @Param(ContactByNamePipe) params: {teacherId: string, name: string},
    @Body() body: UpdateContactDTO,
  ){
    return this.teacherService.updateContact(params.teacherId, params.name, body);
  }

  @Access('teachers.$teacherId.contacts.delete')
  @Delete('/:teacherId/contacts/:name')
  async deleteContact(
    @Param(ContactByNamePipe) [teacherId, name]: string[],
  ){
    return this.teacherService.deleteContact(teacherId, name);
  }
}