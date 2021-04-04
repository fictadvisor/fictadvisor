import { Controller, Get, Param, Query } from '@nestjs/common';
import { Page } from 'src/common/common.api';
import { SearchableQueryDto } from 'src/common/common.dto';
import { TeacherItemDto } from './dto/teacher-item.dto';
import { TeacherDto } from './dto/teacher.dto';
import { TeacherService } from './teacher.service';
import { TeacherCourseItemDto } from "./dto/teacher-course-item.dto";

@Controller('teachers')
export class TeacherController {
    constructor(
        private teacherService: TeacherService
    ) {}

    @Get('/:link')
    getTeacher(@Param('link') link: string): Promise<TeacherDto> {
        return this.teacherService.getTeacherByLink(link);
    }

    @Get()
    getTeachers(@Query() query: SearchableQueryDto): Promise<Page<TeacherItemDto>> {
        return this.teacherService.getTeachers(query);
    }

    @Get('/:link/courses')
    getTeacherCourses(
        @Param('link') link: string,
        @Query() query: SearchableQueryDto
    ): Promise<Page<TeacherCourseItemDto>> {
        return this.teacherService.getTeacherCourses(link, query)
    }
}
