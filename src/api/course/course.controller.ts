import { Controller, Get, Param } from '@nestjs/common';
import { CourseService } from './course.service';
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
