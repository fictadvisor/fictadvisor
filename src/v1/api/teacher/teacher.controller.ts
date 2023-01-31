import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { type Page } from 'src/v1/common/common.api';
import { SearchableQueryDto } from 'src/v1/common/common.dto';
import { type TeacherItemDto } from './dto/teacher-item.dto';
import { type TeacherDto } from './dto/teacher.dto';
import { TeacherService } from './teacher.service';
import { type ResponseEntity } from '../../common/common.api';
import { type TeacherCourseItemDto } from './dto/teacher-course-item.dto';
import { type TeacherReviewDto } from './dto/review.dto.js';
import { TeacherAddDto } from './dto/teacher-add-dto';
import { Context, SecurityContext } from '../../security/security.context';
import { Authorize } from '../../security/security.authorization';
import { TeacherUpdateDto } from './dto/teacher-update.dto';
import { TeacherContactCreateDto } from './dto/teacher-contact-create.dto';
import { type TeacherContactDto } from './dto/teacher-contact.dto';
import { TeacherContactUpdateDto } from './dto/teacher-contact-update.dto';

@Controller('teachers')
export class TeacherController {
  constructor (private readonly teacherService: TeacherService) {}

  @Get('/:link')
  async getTeacher (@Param('link') link: string): Promise<TeacherDto> {
    return await this.teacherService.getTeacherByLink(link);
  }

  @Get()
  async getTeachers (
    @Query() query: SearchableQueryDto
  ): Promise<Page<TeacherItemDto>> {
    return await this.teacherService.getTeachers(query);
  }

  @Authorize()
  @Post()
  async addTeacher (
    @Context() ctx: SecurityContext,
      @Body() teacher: TeacherAddDto
  ): Promise<TeacherDto> {
    return await this.teacherService.saveTeacher(teacher, ctx.user);
  }

  @Authorize({ telegram: true })
  @Put('/:id')
  async updateTeacher (
    @Param('id') id: string,
      @Body() body: TeacherUpdateDto
  ): Promise<TeacherDto> {
    return await this.teacherService.updateTeacher(id, body);
  }

  @Authorize({ telegram: true })
  @Delete('/:id')
  async deleteTeacher (@Param('id') id: string): Promise<void> {
    await this.teacherService.deleteTeacher(id);
  }

  @Get('/:link/contacts')
  async getTeacherContacts (
    @Param('link') link: string
  ): Promise<ResponseEntity<any>> {
    return await this.teacherService.getTeacherContacts(link);
  }

  @Get('/:link/courses')
  async getTeacherCourses (
    @Param('link') link: string,
      @Query() query: SearchableQueryDto
  ): Promise<Page<TeacherCourseItemDto>> {
    return await this.teacherService.getTeacherCourses(link, query);
  }

  @Get('/:link/reviews')
  async getTeacherReviews (
    @Param('link') link: string,
      @Query() query: SearchableQueryDto
  ): Promise<Page<TeacherReviewDto>> {
    return await this.teacherService.getTeacherReviews(link, query);
  }

  @Get('/:link/stats')
  async getTeacherStats (@Param('link') link: string): Promise<ResponseEntity<any>> {
    return await this.teacherService.getTeacherStats(link);
  }

  @Authorize()
  @Post('/:link/contacts')
  async addContact (
    @Context() ctx: SecurityContext,
      @Param('link') link: string,
      @Body() contact: TeacherContactCreateDto
  ): Promise<TeacherContactDto> {
    return await this.teacherService.addContact(link, contact, ctx.user);
  }

  @Authorize({ telegram: true })
  @Put('/contacts/:id')
  async updateContact (
    @Param('id') id: string,
      @Body() body: TeacherContactUpdateDto
  ): Promise<TeacherContactDto> {
    return await this.teacherService.updateContact(id, body);
  }

  @Authorize({ telegram: true })
  @Delete('/contacts/:id')
  async deleteContact (@Param('id') id: string): Promise<void> {
    await this.teacherService.deleteContact(id);
  }
}
