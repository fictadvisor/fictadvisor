import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page, Pageable, Searchable, SortableProcessor } from 'src/common/common.api';
import { SearchableQueryDto } from 'src/common/common.dto';
import { ServiceException } from 'src/common/common.exception';
import { Course } from 'src/database/entities/course.entity';
import { Review, ReviewState } from 'src/database/entities/review.entity';
import { Repository } from 'typeorm';
import { ReviewItemDto } from './dto/review-item.dto';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
    ) {}

    private reviewSortableProcessor = SortableProcessor.of({
        rating: ['DESC'],
        date: ['DESC', 'createdAt'],
    }, 'date');

    private async getCourse(link: string): Promise<Course> {
        const course = await this.courseRepository.findOne({ link });

        if (!course) {
            throw ServiceException.create(HttpStatus.NOT_FOUND, { message: 'Course with given link not found' });
        }

        return course;
    }

    async getReviews(link: string, query: SearchableQueryDto): Promise<Page<ReviewItemDto>> {
        const course = await this.getCourse(link);

        const [items, count] = await this.reviewRepository.findAndCount({
            ...Pageable.of(query.page, query.pageSize).toQuery(),
            where: { 
                course,
                state: ReviewState.APPROVED,
                ...Searchable.of<Review>('content', query.searchQuery).toQuery(),
            },
            order: { ...this.reviewSortableProcessor.toQuery(query.sort) },
        });

        return Page.of(
            count,
            items.map(r => ReviewItemDto.from(r))
        );
    }
}
