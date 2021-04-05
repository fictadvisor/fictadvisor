import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page, Pageable, Searchable, SortableProcessor } from 'src/common/common.api';
import { SearchableQueryDto } from 'src/common/common.dto';
import { ServiceException } from 'src/common/common.exception';
import { TeacherSearchIndex } from 'src/database/entities/teacher-search-index.entity';
import { TeacherView } from 'src/database/entities/teacher-view.entity';
import { TeacherContactView } from 'src/database/entities/teacher-contact-view.entity';
import { ReviewView } from 'src/database/entities/review-view.entity';
import { Repository } from 'typeorm';
import { TeacherItemDto } from './dto/teacher-item.dto';
import { TeacherDto } from './dto/teacher.dto';
import { TeacherContactDto } from './dto/teacher-contact.dto';
import { ResponseEntity } from '../../common/common.api';
import { TeacherCourseSearchIndex } from "../../database/entities/teacher-course-search-index";
import { TeacherCourseItemDto } from "./dto/teacher-course-item.dto";
import { ReviewDto } from "./dto/review.dto";

@Injectable()
export class TeacherService {
    constructor(
        @InjectRepository(TeacherSearchIndex)
        private teacherSearchIndexRepository: Repository<TeacherSearchIndex>,
        @InjectRepository(TeacherView)
        private teacherViewRepository: Repository<TeacherView>,
        @InjectRepository(TeacherContactView)
        private teacherContactViewRepository: Repository<TeacherContactView>,
        @InjectRepository(TeacherCourseSearchIndex)
        private teacherCoursesRepository: Repository<TeacherCourseSearchIndex>,
        @InjectRepository(ReviewView)
        private reviewRepository: Repository<ReviewView>,
    ) {}

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

    async getTeacherContacts(link: string): Promise<ResponseEntity<Object>> {
        const items = await this.teacherContactViewRepository.find({ link });

        return (ResponseEntity.of({
            'items': items.map(tcv => TeacherContactDto.from(tcv))
        }));
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
                ...Searchable.of<ReviewView>('courseName', query.searchQuery).toQuery()
            },
            order: { ...this.reviewSortableProcessor.toQuery(query.sort) }
        });

        return Page.of(
            count,
            items.map(c => ReviewDto.from(c))
        );
    }
}
