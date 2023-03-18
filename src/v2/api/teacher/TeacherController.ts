import { Body, Controller, Delete, Get, Param, Post, Query, Patch } from '@nestjs/common';
import { TeacherService } from './TeacherService';
import { QueryAllTeacherDTO } from './query/QueryAllTeacherDTO';
import { CreateTeacherDTO } from './dto/CreateTeacherDTO';
import { UpdateTeacherDTO } from './dto/UpdateTeacherDTO';
import { CreateContactDTO } from '../user/dto/CreateContactDTO';
import { UpdateContactDTO } from '../user/dto/UpdateContactDTO';
import { Access } from 'src/v2/security/Access';
import { TeacherByIdPipe } from './pipe/TeacherByIdPipe';
import { ContactByNamePipe } from './pipe/ContactByNamePipe';
import { MarksQueryDTO } from './query/MarksQueryDTO';
import { SubjectByIdPipe } from '../subject/SubjectByIdPipe';

@Controller({
  version: '2',
  path: '/teachers',
})
export class TeacherController {
  constructor (
    private teacherService: TeacherService,
  ) {}


  @Get()
  getAll (
    @Query() query: QueryAllTeacherDTO,
  ) {
    return this.teacherService.getAll(query);
  }

  @Get('/:teacherId/roles')
  async getTeacherRoles (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    const roles = await this.teacherService.getTeacherRoles(teacherId);

    return { roles };
  }

  @Get('/:teacherId/subjects')
  async getSubjects (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    const subjects = await this.teacherService.getTeacherSubjects(teacherId);

    return { subjects };
  }

  @Get('/:teacherId/subjects/:subjectId')
  async getSubject (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Param('subjectId', SubjectByIdPipe) subjectId: string,
  ) {
    return this.teacherService.getTeacherSubject(teacherId, subjectId);
  }

  @Get('/:teacherId')
  getTeacher (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    return this.teacherService.getTeacher(teacherId);
  }

  @Access('teachers.create')
  @Post()
  create (
    @Body() body: CreateTeacherDTO,
  ) {
    return this.teacherService.create(body);
  }

  @Access('teachers.$teacherId.update')
  @Patch('/:teacherId')
  async update (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Body() body: UpdateTeacherDTO,
  ) {
    return this.teacherService.update(teacherId, body);
  }

  @Access('teachers.$teacherId.delete')
  @Delete('/:teacherId')
  async delete (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    return this.teacherService.delete(teacherId);
  }

  @Get('/:teacherId/contacts')
  async getAllContacts (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
  ) {
    const contacts = await this.teacherService.getAllContacts(teacherId);
    return { contacts };
  }

  @Get('/:teacherId/contacts/:name')
  getContact (
    @Param(ContactByNamePipe) params: {teacherId: string, name: string},
  ) {
    return this.teacherService.getContact(params.teacherId, params.name);
  }

  @Access('teachers.$teacherId.contacts.create')
  @Post('/:teacherId/contacts')
  createContact (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Body() body: CreateContactDTO,
  ) {
    return this.teacherService.createContact(teacherId, body);
  }

  @Access('teachers.$teacherId.contacts.update')
  @Patch('/:teacherId/contacts/:name')
  async updateContact (
    @Param(ContactByNamePipe) params: {teacherId: string, name: string},
    @Body() body: UpdateContactDTO,
  ) {
    return this.teacherService.updateContact(params.teacherId, params.name, body);
  }

  @Access('teachers.$teacherId.contacts.delete')
  @Delete('/:teacherId/contacts/:name')
  async deleteContact (
    @Param(ContactByNamePipe) params: {teacherId: string, name: string},
  ) {
    return this.teacherService.deleteContact(params.teacherId, params.name);
  }

  @Get('/:teacherId/marks')
  async getMarks (
    @Param('teacherId', TeacherByIdPipe) teacherId: string,
    @Query() query: MarksQueryDTO,
  ) {
    return this.teacherService.getMarks(teacherId, query);
  }
}