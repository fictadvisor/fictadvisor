import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, Patch } from '@nestjs/common';
import { TeacherService } from './TeacherService';
import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { CreateTeacherDTO } from './dto/CreateTeacherDTO';
import { UpdateTeacherDTO } from './dto/UpdateTeacherDTO';
import { CreateContactDTO } from './dto/CreateContactDTO';
import { UpdateContactDTO } from './dto/UpdateContactDTO';
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
  constructor (
    private readonly teacherService: TeacherService
  ) {}

  @UseGuards(JwtGuard)
  @Get()
  async getAll (
  @Query() query: QueryAllDTO
  ) {
    return await this.teacherService.getAll(query);
  }

  @UseGuards(JwtGuard)
  @Get('/:teacherId')
  async getTeacher (
  @Param('teacherId', TeacherByIdPipe) teacherId: string
  ) {
    return await this.teacherService.getTeacher(teacherId);
  }

  @Permission('teachers.$teacherId.create')
  @UseGuards(JwtGuard, PermissionGuard)
  @Post()
  async create (
  @Body() body: CreateTeacherDTO
  ) {
    return await this.teacherService.create(body);
  }

  @Permission('teachers.$teacherId.update')
  @UseGuards(JwtGuard, PermissionGuard)
  @Patch('/:teacherId')
  async update (
  @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Body() body: UpdateTeacherDTO
  ) {
    await this.teacherService.update(teacherId, body);
  }

  @Permission('teachers.$teacherId.delete')
  @UseGuards(JwtGuard, PermissionGuard)
  @Delete('/:teacherId')
  async delete (
  @Param('teacherId', TeacherByIdPipe) teacherId: string
  ) {
    await this.teacherService.delete(teacherId);
  }

  @UseGuards(JwtGuard)
  @Get('/:teacherId/contacts')
  async getAllContacts (
  @Param('teacherId', TeacherByIdPipe) teacherId: string
  ) {
    return await this.teacherService.getAllContacts(teacherId);
  }

  @UseGuards(JwtGuard)
  @Get('/:teacherId/contacts/:name')
  async getContact (
  @Param(ContactByNamePipe) [teacherId, name]: string[]
  ) {
    return await this.teacherService.getContact(teacherId, name);
  }

  @Permission('teachers.$teacherId.contacts.create')
  @UseGuards(JwtGuard, PermissionGuard)
  @Post('/:teacherId/contacts')
  async createContact (
  @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Body() body: CreateContactDTO
  ) {
    return await this.teacherService.createContact(teacherId, body);
  }

  @Permission('teachers.$teacherId.contacts.update')
  @UseGuards(JwtGuard, PermissionGuard)
  @Patch('/:teacherId/contacts/:name')
  async updateContact (
  @Param(ContactByNamePipe) [teacherId, name]: string[],
    @Body() body: UpdateContactDTO
  ) {
    await this.teacherService.updateContact(teacherId, name, body);
  }

  @Permission('teachers.$teacherId.contacts.delete')
  @UseGuards(JwtGuard, PermissionGuard)
  @Delete('/:teacherId/contacts/:name')
  async deleteContact (
  @Param(ContactByNamePipe) [teacherId, name]: string[]
  ) {
    await this.teacherService.deleteContact(teacherId, name);
  }
}
