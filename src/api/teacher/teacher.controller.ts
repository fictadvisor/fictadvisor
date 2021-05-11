import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Page } from 'src/common/common.api';
import { SearchableQueryDto } from 'src/common/common.dto';
import { TeacherItemDto } from './dto/teacher-item.dto';
import { TeacherDto } from './dto/teacher.dto';
import { TeacherService } from './teacher.service';
import { ResponseEntity } from '../../common/common.api';
import { TeacherCourseItemDto } from "./dto/teacher-course-item.dto";
import { TeacherReviewDto } from "./dto/review.dto";
import { TeacherAddDto } from './dto/teacher-add-dto';

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

    @Get('/:link/contacts')
    getTeacherContacts(@Param('link') link: string): Promise<ResponseEntity<any>> {
        return this.teacherService.getTeacherContacts(link);
    }

    @Get('/:link/courses')
    getTeacherCourses(
        @Param('link') link: string,
        @Query() query: SearchableQueryDto
    ): Promise<Page<TeacherCourseItemDto>> {
        return this.teacherService.getTeacherCourses(link, query);
    }

    @Get('/:link/reviews')
    getTeacherReviews(
        @Param('link') link: string, 
        @Query() query: SearchableQueryDto
    ): Promise<Page<TeacherReviewDto>> {
        return this.teacherService.getTeacherReviews(link, query);
    }

    @Get('/:link/stats')
    getTeacherStats(@Param('link') link: string): Promise<ResponseEntity<any>> {
        return this.teacherService.getTeacherStats(link);
    }

    @Post()
    addTeacher(@Body() teacher: TeacherAddDto): Promise<TeacherDto> {
        return this.teacherService.saveTeacher(teacher)
    }
}
