import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceException } from 'src/common/common.exception';
import { Course } from 'src/database/entities/course.entity';
import { Review, ReviewState } from 'src/database/entities/review.entity';
import { Connection, Repository } from 'typeorm';
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
            .where('r.course_id = :id and r.state = :state', { id, state: ReviewState.APPROVED })
            .getRawOne();
    
        return rating;
    }

    async getCourseByLink(link: string): Promise<CourseDto> {
        const course = await this.getCourse(link, ['teacher', 'subject']);
        const dto = CourseDto.from(course);

        dto.rating = await this.getCourseRating(course.id);
        
        return dto;
    }
}
