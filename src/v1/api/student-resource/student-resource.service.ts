import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page, Pageable, Searchable } from 'src/v1/common/common.api';
import { type SearchableQueryDto } from 'src/v1/common/common.dto';
import { StudentResource } from 'src/v1/database/entities/student-resource.entity';
import { Repository } from 'typeorm';
import { StudentResourceDto } from './dto/student-resource.dto';

@Injectable()
export class StudentResourceService {
  constructor (
    @InjectRepository(StudentResource)
    private readonly teacherSearchIndexRepository: Repository<StudentResource>
  ) {}

  async getResources (
    query: SearchableQueryDto
  ): Promise<Page<StudentResourceDto>> {
    const [items, count] = await this.teacherSearchIndexRepository.findAndCount(
      {
        ...Pageable.of(query.page, query.pageSize).toQuery(),
        where: {
          ...Searchable.of<StudentResource>(
            'name',
            query.searchQuery
          ).toQuery(),
        },
        order: { priority: 'DESC' },
      }
    );

    return Page.of(
      count,
      items.map((t) => StudentResourceDto.from(t))
    );
  }
}
