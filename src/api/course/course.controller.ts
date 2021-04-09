import { Controller, Get, Param, Query } from '@nestjs/common';
import { Page } from 'src/common/common.api';
import { SearchableQueryDto } from 'src/common/common.dto';
import { CourseService } from './course.service';
import { CourseReviewDto } from './dto/course-review.dto';
import { CourseDto } from './dto/course.dto';

@Controller('courses')
export class CourseController {
    constructor(
        private courseService: CourseService
    ) {}

    @Get('/:link')
    getCourse(@Param('link') link: string): Promise<CourseDto> {
        return this.courseService.getCourseByLink(link);
    }
}
