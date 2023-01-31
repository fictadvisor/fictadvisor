import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectSearchIndex } from '../../database/entities/subject-search-index';
import { Not, Repository } from 'typeorm';
import { SubjectView } from '../../database/entities/subject-view.entity';
import { type SearchableQueryDto } from '../../common/common.dto';
import { SubjectItemDto } from './dto/subject-item.dto';
import {
  Page,
  Pageable,
  Searchable,
  SortableProcessor,
} from '../../common/common.api';
import { SubjectDto } from './dto/subject.dto';
import { ServiceException } from '../../common/common.exception';
import { CourseItemDto } from './dto/course-item.dto';
import { CourseSearchIndex } from '../../database/entities/course-search-index.entity';
import { CourseState } from 'src/v1/database/entities/course.entity';
import { type SubjectCreateDto } from './dto/subject-create.dto';
import { type User } from '../../database/entities/user.entity';
import { Subject, SubjectState } from '../../database/entities/subject.entity';
import { assign } from '../../common/common.object';
import { TelegramService } from '../../telegram/telegram.service';
import { Logger, SystemLogger } from '../../logger/logger.core';
import { type SubjectUpdateDto } from './dto/subject-update.dto';

@Injectable()
export class SubjectService {
  @Logger()
  private readonly logger: SystemLogger;

  constructor (
    @InjectRepository(SubjectSearchIndex)
    private readonly subjectSearchIndexRepository: Repository<SubjectSearchIndex>,

    @InjectRepository(SubjectView)
    private readonly subjectViewRepository: Repository<SubjectView>,

    @InjectRepository(CourseSearchIndex)
    private readonly courseRepository: Repository<CourseSearchIndex>,

    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,

    private readonly telegramService: TelegramService
  ) {}

  private readonly subjectSortableProcessor = SortableProcessor.of<SubjectSearchIndex>(
    { rating: ['DESC'], name: ['ASC'], teacherCount: ['DESC'] },
    'rating'
  ).fallback('id', 'ASC');

  async getSubjects (query: SearchableQueryDto): Promise<Page<SubjectItemDto>> {
    const [items, count] = await this.subjectSearchIndexRepository.findAndCount(
      {
        ...Pageable.of(query.page, query.pageSize).toQuery(),
        where: {
          state: !query.all
            ? SubjectState.APPROVED
            : Not(SubjectState.DECLINED),
          ...Searchable.of<SubjectSearchIndex>(
            'name',
            query.searchQuery
          ).toQuery(),
        },
        order: { ...this.subjectSortableProcessor.toQuery(query.sort) },
      }
    );

    return Page.of(
      count,
      items.map((s) => SubjectItemDto.from(s))
    );
  }

  async getSubjectByLink (link: string): Promise<SubjectDto> {
    const subject = await this.subjectViewRepository.findOneBy({ link });

    if (subject == null) {
      throw ServiceException.create(
        HttpStatus.NOT_FOUND,
        'Subject with given link not found'
      );
    }

    return SubjectDto.from(subject);
  }

  private readonly courseSortableProcessor = SortableProcessor.of<CourseSearchIndex>(
    { rating: ['DESC'], lastName: ['ASC', 'teacherLastName'] },
    'rating'
  ).fallback('id', 'ASC');

  async getCoursesByLink (
    link: string,
    query: SearchableQueryDto
  ): Promise<Page<CourseItemDto>> {
    const [items, count] = await this.courseRepository.findAndCount({
      ...Pageable.of(query.page, query.pageSize).toQuery(),
      where: {
        subjectLink: link,
        state: !query.all ? CourseState.APPROVED : Not(CourseState.DECLINED),
        ...Searchable.of<CourseSearchIndex>(
          'teacherFullName',
          query.searchQuery
        ).toQuery(),
      },
      order: { ...this.courseSortableProcessor.toQuery(query.sort) },
    });

    return Page.of(
      count,
      items.map((c) => CourseItemDto.from(c))
    );
  }

  private async getSubjectById (id: string): Promise<Subject> {
    const subject = await this.subjectRepository.findOneBy({ id });

    if (subject == null) {
      throw ServiceException.create(
        HttpStatus.NOT_FOUND,
        'Subject with given id not found'
      );
    }

    return subject;
  }

  async addSubject (subject: SubjectCreateDto, user: User): Promise<SubjectDto> {
    const existing = await this.subjectRepository.findOneBy({
      link: subject.link(),
    });

    if (existing) {
      throw ServiceException.create(
        HttpStatus.CONFLICT,
        'Subject already exists'
      );
    }

    try {
      const inserted = await this.subjectRepository.save(
        assign(new Subject(), {
          link: subject.link(),
          name: subject.name,
          description: subject.description,
          state: SubjectState.PENDING,
        })
      );

      this.telegramService.broadcastPendingSubject(user, inserted).catch((e) =>
        this.logger.error('Failed to broadcast a pending subject', {
          subject: inserted.id,
          error: e.toString(),
        })
      );

      return assign(new SubjectDto(), {
        id: inserted.id,
        link: inserted.link,
        name: inserted.name,
        description: inserted.description,
        teacherCount: 0,
        rating: 0,
        state: inserted.state,
        createdAt: inserted.createdAt,
        updatedAt: inserted.updatedAt,
      });
    } catch (e) {
      throw ServiceException.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to save subject'
      );
    }
  }

  async updateSubject (
    id: string,
    update: SubjectUpdateDto
  ): Promise<SubjectDto> {
    const subject = await this.getSubjectById(id);

    if (update.name != null) {
      subject.name = update.name;
    }
    if (update.state != null) {
      subject.state = update.state;
    }
    if (update.description != null) {
      subject.description = update.description;
    }

    const saved = await this.subjectRepository.save(subject);
    return await this.getSubjectByLink(saved.link);
  }

  async deleteSubject (id: string): Promise<void> {
    const subject = await this.getSubjectById(id);

    await subject.remove();
  }
}
