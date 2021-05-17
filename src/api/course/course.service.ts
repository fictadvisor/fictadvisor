import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceException } from 'src/common/common.exception';
import { Course } from 'src/database/entities/course.entity';
import { Review, ReviewState } from 'src/database/entities/review.entity';
import { Connection, Repository } from 'typeorm';
import { CourseDto } from './dto/course.dto';
import { CourseAddDto } from './dto/course-add.dto';
import { User } from '../../database/entities/user.entity';
import { Teacher } from '../../database/entities/teacher.entity';
import { Subject } from '../../database/entities/subject.entity';
import { assign } from '../../common/common.object';
import { TelegramService } from '../../telegram/telegram.service';
import { Logger, SystemLogger } from '../../logger/logger.core';
import { TeacherUpdateDto } from '../teacher/dto/teacher-update.dto';
import { TeacherDto } from '../teacher/dto/teacher.dto';
import { CourseUpdateDto } from './dto/course-update.dto';

@Injectable()
export class CourseService {
    @Logger()
    private logger: SystemLogger;

    constructor(
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
        @InjectRepository(Teacher)
        private teacherRepository: Repository<Teacher>,
        @InjectRepository(Subject)
        private subjectRepository: Repository<Subject>,
        private telegramService: TelegramService,
    private connection: Connection
    ) {}

    async getCourse(link: string, relations?: string[]): Promise<Course> {
        const course = await this.courseRepository.findOne({ link }, { relations });

        if (course == null) {
            throw ServiceException.create(HttpStatus.NOT_FOUND, { message: 'Course with given link not found' });
        }

        return course;
    }

    async getCourseById(id: string, relations?: string[]): Promise<Course> {
        const course = await this.courseRepository.findOne({ id }, { relations });

        if (course == null) {
            throw ServiceException.create(HttpStatus.NOT_FOUND, {message: 'Course with given id not found'});
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

    async addCourse(course: CourseAddDto, user: User): Promise<CourseDto> {
        const subject = await this.subjectRepository.findOne({ id: course.subjectId });
        const teacher = await this.teacherRepository.findOne({ id: course.teacherId });

        if (!subject || !teacher) {
            throw ServiceException.create(HttpStatus.NOT_FOUND, "Subject or teacher not found");
        }

        const existing = await this.courseRepository.findOne({ teacher, subject });

        if (existing) {
            throw ServiceException.create(HttpStatus.CONFLICT, "Course already exists");
        }

        const entity = await this.courseRepository.save(assign(
            new Course(),
            {
                link: subject.link + '-' + teacher.link,
                teacher,
                subject,
            }
        ));

        this.telegramService.broadcastPendingCourse(user, entity)
            .catch(e => this.logger.error('Failed to broadcast a pending review', {
                course: entity.id, error: e.toString()
            }));

        return CourseDto.from(entity);
    }

    async updateCourse(id: string, update: CourseUpdateDto): Promise<CourseDto> {
        const course = await this.getCourseById(id, [ 'teacher', 'subject' ]);

        if (update.state != null) { course.state = update.state; }
        if (update.description != null) { course.description = update.description; }

        const saved = await this.courseRepository.save(course);
        return CourseDto.from(saved);
    }

    async deleteCourse(id: string): Promise<void> {
        const course = await this.getCourseById(id);

        await course.remove();
    }
}
