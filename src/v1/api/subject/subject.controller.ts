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
import { SubjectService } from './subject.service';
import { SearchableQueryDto } from '../../common/common.dto';
import { type SubjectItemDto } from './dto/subject-item.dto';
import { type Page } from '../../common/common.api';
import { type SubjectDto } from './dto/subject.dto';
import { type CourseItemDto } from './dto/course-item.dto';
import { Authorize } from '../../security/security.authorization';
import { Context, SecurityContext } from '../../security/security.context';
import { SubjectCreateDto } from './dto/subject-create.dto';
import { SubjectUpdateDto } from './dto/subject-update.dto';

@Controller('subjects')
export class SubjectController {
  constructor (private readonly subjectService: SubjectService) {}

  @Get()
  async getSubjects (
    @Query() query: SearchableQueryDto
  ): Promise<Page<SubjectItemDto>> {
    return await this.subjectService.getSubjects(query);
  }

  @Get('/:link')
  async getSubject (@Param('link') link: string): Promise<SubjectDto> {
    return await this.subjectService.getSubjectByLink(link);
  }

  @Get('/:link/courses')
  async getCourses (
    @Param('link') link: string,
      @Query() query: SearchableQueryDto
  ): Promise<Page<CourseItemDto>> {
    return await this.subjectService.getCoursesByLink(link, query);
  }

  @Authorize()
  @Post()
  async addCourse (
    @Context() ctx: SecurityContext,
      @Body() subject: SubjectCreateDto
  ): Promise<SubjectDto> {
    return await this.subjectService.addSubject(subject, ctx.user);
  }

  @Authorize({ telegram: true })
  @Put('/:id')
  async updateSubject (
    @Param('id') id: string,
      @Body() body: SubjectUpdateDto
  ): Promise<SubjectDto> {
    return await this.subjectService.updateSubject(id, body);
  }

  @Authorize({ telegram: true })
  @Delete('/:id')
  async deleteSubject (@Param('id') id: string): Promise<void> {
    await this.subjectService.deleteSubject(id);
  }
}
