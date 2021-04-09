import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page, Pageable, Searchable, SortableProcessor } from 'src/common/common.api';
import { SearchableQueryDto } from 'src/common/common.dto';
import { ServiceException } from 'src/common/common.exception';
import { Course } from 'src/database/entities/course.entity';
import { Review, ReviewState } from 'src/database/entities/review.entity';
import { Connection, Repository } from 'typeorm';
import { CourseItemDto } from '../subject/dto/course-item.dto';
import { CourseReviewDto } from './dto/course-review.dto';
import { CourseDto } from './dto/course.dto';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
        private connection: Connection
    ) {}

    async getCourse(link: string, relations?: string[]): Promise<Course> {
        const course = await this.courseRepository.findOne({ link }, { relations });

        if (course == null) {
            throw ServiceException.create(HttpStatus.NOT_FOUND, { message: 'Course with given link not found' });
        }

        return course;
    }

    async getCourseRating(id: string) {
        const { rating } = await this.connection.createQueryBuilder()
            .select('coalesce(avg(r.rating)::real, 0)', 'rating')
            .from(Review, 'r')
            .where('r.course_id = :id', { id })
            .getRawOne();
    
        return rating;
    }

    async getCourseByLink(link: string): Promise<CourseDto> {
        const course = await this.getCourse(link, ['teacher', 'subject']);
        const dto = CourseDto.from(course);

        dto.rating = await this.getCourseRating(course.id);
        
        return dto;
    }

    private courseReviewSortableProcessor = SortableProcessor.of({ rating: ['DESC'], date: ['DESC', 'createdAt'] }, 'date');

    async getCourseReviews(link: string, query: SearchableQueryDto): Promise<Page<CourseReviewDto>> {
        const course = await this.getCourse(link);

        const [items, count] = await this.reviewRepository.findAndCount({ 
            ...Pageable.of(query.page, query.pageSize).toQuery(),
            where: { 
                course,
                state: ReviewState.APPROVED,
                ...Searchable.of<Review>('content', query.searchQuery).toQuery() 
            },
            order: { ...this.courseReviewSortableProcessor.toQuery(query.sort) }
        });

        return Page.of(
            count,
            items.map(r => CourseReviewDto.from(r))
        );
    }
}
