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
import { TeacherCourseSearchIndex } from "../../database/entities/teacher-course-search-index";
import { TeacherCourseItemDto } from "./dto/teacher-course-item.dto";
import { ReviewDto } from "./dto/review.dto";
import { Teacher } from 'src/database/entities/teacher.entity';
import { StatEntry } from '../../database/entities/stat-entry.entity';
import { TeacherStatsItemDto } from './dto/teacher-stats.dto';
import { ReviewState } from 'src/database/entities/review.entity';

@Injectable()
export class TeacherService {
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
        private teacherCoursesRepository: Repository<TeacherCourseSearchIndex>
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

    private teacherSortableProcessor = SortableProcessor.of({ rating: ['DESC'], lastName: ['ASC'] }, 'rating');

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

    private courseSortableProcessor = SortableProcessor.of({
        rating: ['DESC'],
        name: ['ASC']
    }, 'rating');

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

    private reviewSortableProcessor = SortableProcessor.of({
        rating: ['DESC'],
        date: ['DESC']
    }, 'date');

    async getTeacherReviews(link: string, query: SearchableQueryDto): Promise<Page<ReviewDto>> {
        const [items, count] = await this.reviewRepository.findAndCount({
            ...Pageable.of(query.page, query.pageSize).toQuery(),
            where: {
                courseLink: link,
                state: ReviewState.APPROVED,
                ...Searchable.of<TeacherReviewView>('courseName', query.searchQuery).toQuery()
            },
            order: { ...this.reviewSortableProcessor.toQuery(query.sort) }
        });

        return Page.of(
            count,
            items.map(c => ReviewDto.from(c))
        );
    }

    async getTeacherStats(link: string): Promise<ResponseEntity<any>> {
        const teacher = await this.getTeacher(link)
        const stats = await this.teacherStatsRepository.find({ teacher });

        return ResponseEntity.of({
            items: stats.map(s => TeacherStatsItemDto.from(s))
        });
    }
}
