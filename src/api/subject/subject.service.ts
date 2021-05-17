import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SubjectSearchIndex } from "../../database/entities/subject-search-index";
import { Not, Repository } from "typeorm";
import { SubjectView } from "../../database/entities/subject-view.entity";
import { SearchableQueryDto } from "../../common/common.dto";
import { SubjectItemDto } from "./dto/subject-item.dto";
import { Page, Pageable, Searchable, SortableProcessor } from "../../common/common.api";
import { SubjectDto } from "./dto/subject.dto";
import { ServiceException } from "../../common/common.exception";
import { CourseItemDto } from "./dto/course-item.dto";
import { CourseSearchIndex } from "../../database/entities/course-search-index.entity";
import { CourseState } from "src/database/entities/course.entity";

@Injectable()
export class SubjectService {
    constructor(
        @InjectRepository(SubjectSearchIndex)
        private subjectSearchIndexRepository: Repository<SubjectSearchIndex>,

        @InjectRepository(SubjectView)
        private subjectViewRepository: Repository<SubjectView>,

        @InjectRepository(CourseSearchIndex)
        private courseRepository: Repository<CourseSearchIndex>,
    ) {}

    private subjectSortableProcessor = SortableProcessor.of<SubjectSearchIndex>({ rating: ['DESC'], name: ['ASC'], teacherCount: ['DESC'] }, 'rating').fallback('id', 'ASC');

    async getSubjects(query: SearchableQueryDto): Promise<Page<SubjectItemDto>> {
        const [items, count] = await this.subjectSearchIndexRepository.findAndCount({
            ...Pageable.of(query.page, query.pageSize).toQuery(),
            where: { ...Searchable.of<SubjectSearchIndex>('name', query.searchQuery).toQuery() },
            order: { ...this.subjectSortableProcessor.toQuery(query.sort) }
        })

        return Page.of(
            count,
            items.map(s => SubjectItemDto.from(s))
        )
    }

    async getSubjectByLink(link: string): Promise<SubjectDto> {
        const subject = await this.subjectViewRepository.findOne({ link });

        if (subject == null) {
            throw ServiceException.create(HttpStatus.NOT_FOUND, 'Subject with given link not found')
        }

        return SubjectDto.from(subject)
    }

    private courseSortableProcessor = SortableProcessor.of<CourseSearchIndex>({ rating: ['DESC'], lastName: ['ASC', 'teacherLastName'] }, 'rating').fallback('id', 'ASC');

    async getCoursesByLink(link: string, query: SearchableQueryDto): Promise<Page<CourseItemDto>> {
        const [items, count] = await this.courseRepository.findAndCount({
            ...Pageable.of(query.page, query.pageSize).toQuery(),
            where: {
                subjectLink: link,
                state: !query.all ? CourseState.APPROVED : Not(CourseState.DECLINED),
                ...Searchable.of<CourseSearchIndex>('teacherFullName', query.searchQuery).toQuery()
            },
            order: { ...this.courseSortableProcessor.toQuery(query.sort) },
        })

        return Page.of(
            count,
            items.map(c => CourseItemDto.from(c))
        )
    }
}
