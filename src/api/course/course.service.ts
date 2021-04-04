import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceException } from 'src/common/common.exception';
import { Course } from 'src/database/entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
    ) {}

    async getCourse(link: string): Promise<Course> {
        const course = await this.courseRepository.findOne({ link });

        if (course == null) {
            throw ServiceException.create(HttpStatus.NOT_FOUND, { message: 'Course with given link not found' });
        }

        return course;
    }
}
