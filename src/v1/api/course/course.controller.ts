import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { type CourseDto } from './dto/course.dto';
import { Authorize } from '../../security/security.authorization';
import { Context, SecurityContext } from '../../security/security.context';
import { CourseAddDto } from './dto/course-add.dto';
import { CourseUpdateDto } from './dto/course-update.dto';

@Controller('courses')
export class CourseController {
  constructor (private readonly courseService: CourseService) {}

  @Get('/:link')
  async getCourse (@Param('link') link: string): Promise<CourseDto> {
    return await this.courseService.getCourseByLink(link);
  }

  @Authorize()
  @Post()
  async addCourse (
    @Context() ctx: SecurityContext,
      @Body() course: CourseAddDto
  ): Promise<CourseDto> {
    return await this.courseService.addCourse(course, ctx.user);
  }

  @Authorize({ telegram: true })
  @Put('/:id')
  async updateCourse (
    @Param('id') id: string,
      @Body() body: CourseUpdateDto
  ): Promise<CourseDto> {
    return await this.courseService.updateCourse(id, body);
  }

  @Authorize({ telegram: true })
  @Delete('/:id')
  async deleteCourse (@Param('id') id: string): Promise<void> {
    await this.courseService.deleteCourse(id);
  }
}
