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
import { SubjectItemDto } from './dto/subject-item.dto';
import { Page } from '../../common/common.api';
import { SubjectDto } from './dto/subject.dto';
import { CourseItemDto } from './dto/course-item.dto';
import { Authorize } from '../../security/security.authorization';
import { Context, SecurityContext } from '../../security/security.context';
import { SubjectCreateDto } from './dto/subject-create.dto';
import { SubjectUpdateDto } from './dto/subject-update.dto';

@Controller('subjects')
export class SubjectController {
  constructor (private subjectService: SubjectService) {}

  @Get()
  getSubjects (
    @Query() query: SearchableQueryDto
  ): Promise<Page<SubjectItemDto>> {
    return this.subjectService.getSubjects(query);
  }

  @Get('/:link')
  getSubject (@Param('link') link: string): Promise<SubjectDto> {
    return this.subjectService.getSubjectByLink(link);
  }

  @Get('/:link/courses')
  getCourses (
    @Param('link') link: string,
    @Query() query: SearchableQueryDto
  ): Promise<Page<CourseItemDto>> {
    return this.subjectService.getCoursesByLink(link, query);
  }

  @Authorize()
  @Post()
  addCourse (
    @Context() ctx: SecurityContext,
    @Body() subject: SubjectCreateDto
  ): Promise<SubjectDto> {
    return this.subjectService.addSubject(subject, ctx.user);
  }

  @Authorize({ telegram: true })
  @Put('/:id')
  updateSubject (
    @Param('id') id: string,
    @Body() body: SubjectUpdateDto
  ): Promise<SubjectDto> {
    return this.subjectService.updateSubject(id, body);
  }

  @Authorize({ telegram: true })
  @Delete('/:id')
  deleteSubject (@Param('id') id: string): Promise<void> {
    return this.subjectService.deleteSubject(id);
  }
}
