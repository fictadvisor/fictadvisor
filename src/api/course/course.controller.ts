import { Controller, Get, Param, Query } from '@nestjs/common';
import { Page } from 'src/common/common.api';
import { SearchableQueryDto } from 'src/common/common.dto';
import { CourseService } from './course.service';
import { ReviewItemDto } from './dto/review-item.dto';

@Controller('courses')
export class CourseController {
    constructor(
        private courseService: CourseService
    ) {}

    @Get('/:link/reviews')
    getReviews(
        @Param('link') link: string,
        @Query() query: SearchableQueryDto
    ): Promise<Page<ReviewItemDto>> {
        return this.courseService.getReviews(link, query);
    }
}
