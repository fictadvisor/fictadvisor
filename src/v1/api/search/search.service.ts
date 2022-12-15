import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectSearchIndex } from '../../database/entities/subject-search-index';
import { Repository } from 'typeorm';
import { TeacherSearchIndex } from '../../database/entities/teacher-search-index.entity';
import { SearchableQueryDto } from '../../common/common.dto';
import { SearchResultDto } from './dto/search-result.dto';
import { Searchable } from '../../common/common.api';
import { SearchSubjectItemDto } from './dto/search-subject-item.dto';
import { SearchTeacherItemDto } from './dto/search-teacher-item.dto';
import { TeacherState } from '../../database/entities/teacher.entity';
import { SubjectState } from '../../database/entities/subject.entity';

/** Number of teacher items to return from search */
const TEACHER_ITEMS_COUNT = 5;

/** Number of subject items to return from search */
const SUBJECT_ITEMS_COUNT = 5;

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(SubjectSearchIndex)
    private subjectSearchIndexRepository: Repository<SubjectSearchIndex>,

    @InjectRepository(TeacherSearchIndex)
    private teacherSearchIndexRepository: Repository<TeacherSearchIndex>
  ) {}

  async searchResult(query: SearchableQueryDto): Promise<SearchResultDto> {
    const teachers = await this.teacherSearchIndexRepository.find({
      take: TEACHER_ITEMS_COUNT,
      where: {
        ...Searchable.of<TeacherSearchIndex>(
          'fullName',
          query.searchQuery
        ).toQuery(),
        state: TeacherState.APPROVED,
      },
      order: {
        fullName: 'ASC',
        rating: 'DESC',
      },
    });

    const subjects = await this.subjectSearchIndexRepository.find({
      take: SUBJECT_ITEMS_COUNT,
      where: {
        ...Searchable.of<SubjectSearchIndex>(
          'name',
          query.searchQuery
        ).toQuery(),
        state: SubjectState.APPROVED,
      },
      order: {
        name: 'ASC',
        rating: 'DESC',
      },
    });

    return SearchResultDto.from(
      subjects.map(s => SearchSubjectItemDto.from(s)),
      teachers.map(t => SearchTeacherItemDto.from(t))
    );
  }
}
