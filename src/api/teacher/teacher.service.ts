import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page, Pageable, Searchable, SortableProcessor } from 'src/common/common.api';
import { SearchableQueryDto } from 'src/common/common.dto';
import { ServiceException } from 'src/common/common.exception';
import { TeacherSearchIndex } from 'src/database/entities/teacher-search-index.entity';
import { TeacherView } from 'src/database/entities/teacher-view.entity';
import { TeacherReviewView } from 'src/database/entities/review-view.entity';
import { TeacherContact } from 'src/database/entities/teacher-contact.entity';
import { Repository } from 'typeorm';
import { TeacherItemDto } from './dto/teacher-item.dto';
import { TeacherDto } from './dto/teacher.dto';
import { TeacherContactDto } from './dto/teacher-contact.dto';
import { ResponseEntity } from '../../common/common.api';
import { TeacherCourseSearchIndex } from '../../database/entities/teacher-course-search-index';
import { TeacherCourseItemDto } from './dto/teacher-course-item.dto';
import { TeacherReviewDto } from './dto/review.dto';
import { Teacher, TEACHER_IMAGE_PLACEHOLDER } from 'src/database/entities/teacher.entity';
import { StatEntry } from '../../database/entities/stat-entry.entity';
import { TeacherStatsItemDto } from './dto/teacher-stats.dto';
import { ReviewState } from 'src/database/entities/review.entity';
import { TeacherAddDto } from './dto/teacher-add-dto';
import { TelegramService } from '../../telegram/telegram.service';
import { User } from '../../database/entities/user.entity';
import { Logger, SystemLogger } from '../../logger/logger.core';
import { assign } from '../../common/common.object';
import { TeacherUpdateDto } from './dto/teacher-update.dto';

@Injectable()
export class TeacherService {
    @Logger()
    private logger: SystemLogger;

    constructor(
        @InjectRepository(TeacherSearchIndex)
        private teacherSearchIndexRepository: Repository<TeacherSearchIndex>,
        @InjectRepository(Teacher)
        private teacherRepository: Repository<Teacher>,
        @InjectRepository(TeacherView)
        private teacherViewRepository: Repository<TeacherView>,
        @InjectRepository(TeacherReviewView)
        private reviewRepository: Repository<TeacherReviewView>,
        @InjectRepository(StatEntry)
        private teacherStatsRepository: Repository<StatEntry>,
        @InjectRepository(TeacherContact)
        private teacherContactRepository: Repository<TeacherContact>,
        @InjectRepository(TeacherCourseSearchIndex)
        private teacherCoursesRepository: Repository<TeacherCourseSearchIndex>,
        private telegramService: TelegramService,
    ) {}

    private async getTeacher(link: string): Promise<Teacher> {
        const teacher = await this.teacherRepository.findOne({ link });

        if (teacher == null) {
            throw ServiceException.create(HttpStatus.NOT_FOUND, 'Teacher with given link was not found');
        }

        return teacher;
    }

    async getTeacherByLink(link: string): Promise<TeacherDto> {
        const teacher = await this.teacherViewRepository.findOne({ link });

        if (teacher == null) {
            throw ServiceException.create(HttpStatus.NOT_FOUND, 'Teacher with given link was not found');
        }

        return TeacherDto.from(teacher);
    }

    private teacherSortableProcessor = SortableProcessor.of<TeacherSearchIndex>({ rating: ['DESC'], lastName: ['ASC'] }, 'lastName').fallback('id', 'ASC');

    async getTeachers(query: SearchableQueryDto): Promise<Page<TeacherItemDto>> {
        const [items, count] = await this.teacherSearchIndexRepository.findAndCount({
            ...Pageable.of(query.page, query.pageSize).toQuery(),
            where: { ...Searchable.of<TeacherSearchIndex>('lastName', query.searchQuery).toQuery() },
            order: { ...this.teacherSortableProcessor.toQuery(query.sort) }
        });

        return Page.of(
            count,
            items.map(t => TeacherItemDto.from(t))
        );
    }

    async getTeacherContacts(link: string): Promise<ResponseEntity<any>>{
        const teacher = await this.getTeacher(link);
        const items = await this.teacherContactRepository.find({ teacher });

        return ResponseEntity.of(
            {
                items: items.map(tcv => TeacherContactDto.from(tcv))
            }
        );
    }

    private courseSortableProcessor = SortableProcessor.of<TeacherCourseSearchIndex>({ rating: ['DESC'], name: ['ASC']}, 'rating').fallback('id', 'ASC');

    async getTeacherCourses(
        link: string,
        query: SearchableQueryDto
    ): Promise<Page<TeacherCourseItemDto>> {
        const [items, count] = await this.teacherCoursesRepository.findAndCount({
            ...Pageable.of(query.page, query.pageSize).toQuery(),
            where: {
                teacherLink: link,
                ...Searchable.of<TeacherCourseSearchIndex>('name', query.searchQuery).toQuery()
            },
            order: { ...this.courseSortableProcessor.toQuery(query.sort) }
        });

        return Page.of(
            count,
            items.map(c => TeacherCourseItemDto.from(c))
        );
    }

    private reviewSortableProcessor = SortableProcessor.of<TeacherReviewView>({ rating: ['DESC'], date: ['DESC'] }, 'date').fallback('id', 'ASC');

    async getTeacherReviews(link: string, query: SearchableQueryDto): Promise<Page<TeacherReviewDto>> {
        const [items, count] = await this.reviewRepository.findAndCount({
            ...Pageable.of(query.page, query.pageSize).toQuery(),
            where: {
                teacherLink: link,
                state: ReviewState.APPROVED,
                ...Searchable.of<TeacherReviewView>('courseName', query.searchQuery).toQuery()
            },
            order: { ...this.reviewSortableProcessor.toQuery(query.sort) }
        });

        return Page.of(
            count,
            items.map(c => TeacherReviewDto.from(c))
        );
    }

    async getTeacherStats(link: string): Promise<ResponseEntity<any>> {
        const teacher = await this.getTeacher(link)
        const stats = await this.teacherStatsRepository.find({ teacher });

        return ResponseEntity.of({
            items: stats.map(s => TeacherStatsItemDto.from(s))
        });
    }

    async saveTeacher(teacher: TeacherAddDto, user: User): Promise<TeacherDto> {
        const existing = await this.teacherRepository.findOne({
            link: teacher.link()
        });

        if (existing) {
            throw ServiceException.create(
                HttpStatus.CONFLICT,
                'Teacher with given information already exists'
            );
        }

        try {
            const inserted = await this.teacherRepository.save(
                assign(
                    new Teacher(),
                    {
                        link: teacher.link(),
                        firstName: teacher.firstName,
                        middleName: teacher.middleName,
                        lastName: teacher.lastName,
                    }
                )
            );

            this.telegramService.broadcastPendingTeacher(user, inserted)
                .catch(e => this.logger.error('Failed to broadcast a pending review', {
                    teacher: inserted.id,
                    error: e.toString()
                }));

            return assign(
                new TeacherDto(),
                {
                    id: inserted.id,
                    link: inserted.link,
                    firstName: inserted.firstName,
                    middleName: inserted.middleName,
                    lastName: inserted.lastName,
                    description: inserted.description,
                    image: inserted.image ?? TEACHER_IMAGE_PLACEHOLDER,
                    tags: inserted.tags,
                    rating: 0,
                    createdAt: inserted.createdAt,
                    updatedAt: inserted.updatedAt,
                }
            );
        } catch (e) {
            throw ServiceException.create(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Error saving teacher to database'
            );
        }
    }

    async updateTeacher(link: string, update: TeacherUpdateDto): Promise<TeacherDto> {
        const teacher = await this.getTeacher(link);

        if (update.firstName != null) { teacher.firstName = update.firstName; }
        if (update.middleName != null) { teacher.middleName = update.middleName; }
        if (update.lastName != null) { teacher.lastName = update.lastName; }
        if (update.description != null) { teacher.description = update.description; }
        if (update.state != null) { teacher.state = update.state; }

        await this.teacherRepository.save(teacher)
        return this.getTeacherByLink(link);
    }

    async deleteTeacher(link: string): Promise<void> {
        const review = await this.getTeacher(link);

        await review.remove();
    }
}
