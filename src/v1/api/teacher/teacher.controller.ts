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
import { Page } from 'src/v1/common/common.api';
import { SearchableQueryDto } from 'src/v1/common/common.dto';
import { TeacherItemDto } from './dto/teacher-item.dto';
import { TeacherDto } from './dto/teacher.dto';
import { TeacherService } from './teacher.service';
import { ResponseEntity } from '../../common/common.api';
import { TeacherCourseItemDto } from './dto/teacher-course-item.dto';
import { TeacherReviewDto } from './dto/review.dto.js';
import { TeacherAddDto } from './dto/teacher-add-dto';
import { Context, SecurityContext } from '../../security/security.context';
import { Authorize } from '../../security/security.authorization';
import { TeacherUpdateDto } from './dto/teacher-update.dto';
import { TeacherContactCreateDto } from './dto/teacher-contact-create.dto';
import { TeacherContactDto } from './dto/teacher-contact.dto';
import { TeacherContactUpdateDto } from './dto/teacher-contact-update.dto';

@Controller('teachers')
export class TeacherController {
  constructor (private teacherService: TeacherService) {}

  @Get('/:link')
  getTeacher (@Param('link') link: string): Promise<TeacherDto> {
    return this.teacherService.getTeacherByLink(link);
  }

  @Get()
  getTeachers (
    @Query() query: SearchableQueryDto
  ): Promise<Page<TeacherItemDto>> {
    return this.teacherService.getTeachers(query);
  }

  @Authorize()
  @Post()
  addTeacher (
    @Context() ctx: SecurityContext,
    @Body() teacher: TeacherAddDto
  ): Promise<TeacherDto> {
    return this.teacherService.saveTeacher(teacher, ctx.user);
  }

  @Authorize({ telegram: true })
  @Put('/:id')
  updateTeacher (
    @Param('id') id: string,
    @Body() body: TeacherUpdateDto
  ): Promise<TeacherDto> {
    return this.teacherService.updateTeacher(id, body);
  }

  @Authorize({ telegram: true })
  @Delete('/:id')
  deleteTeacher (@Param('id') id: string): Promise<void> {
    return this.teacherService.deleteTeacher(id);
  }

  @Get('/:link/contacts')
  getTeacherContacts (
    @Param('link') link: string
  ): Promise<ResponseEntity<any>> {
    return this.teacherService.getTeacherContacts(link);
  }

  @Get('/:link/courses')
  getTeacherCourses (
    @Param('link') link: string,
    @Query() query: SearchableQueryDto
  ): Promise<Page<TeacherCourseItemDto>> {
    return this.teacherService.getTeacherCourses(link, query);
  }

  @Get('/:link/reviews')
  getTeacherReviews (
    @Param('link') link: string,
    @Query() query: SearchableQueryDto
  ): Promise<Page<TeacherReviewDto>> {
    return this.teacherService.getTeacherReviews(link, query);
  }

  @Get('/:link/stats')
  getTeacherStats (@Param('link') link: string): Promise<ResponseEntity<any>> {
    return this.teacherService.getTeacherStats(link);
  }

  @Authorize()
  @Post('/:link/contacts')
  addContact (
    @Context() ctx: SecurityContext,
    @Param('link') link: string,
    @Body() contact: TeacherContactCreateDto
  ): Promise<TeacherContactDto> {
    return this.teacherService.addContact(link, contact, ctx.user);
  }

  @Authorize({ telegram: true })
  @Put('/contacts/:id')
  updateContact (
    @Param('id') id: string,
    @Body() body: TeacherContactUpdateDto
  ): Promise<TeacherContactDto> {
    return this.teacherService.updateContact(id, body);
  }

  @Authorize({ telegram: true })
  @Delete('/contacts/:id')
  deleteContact (@Param('id') id: string): Promise<void> {
    return this.teacherService.deleteContact(id);
  }
}
