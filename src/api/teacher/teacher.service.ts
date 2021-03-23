import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page, Pageable, Searchable } from 'src/common/common.api';
import { ServiceException } from 'src/common/common.exception';
import { TeacherSearchIndex } from 'src/database/entities/teacher-search-index.entity';
import { TeacherView } from 'src/database/entities/teacher-view.entity';
import { Teacher } from 'src/database/entities/teacher.entity';
import { Repository } from 'typeorm';
import { TeacherItemDto } from './dto/teacher-item.dto';
import { TeacherDto } from './dto/teacher.dto';

@Injectable()
export class TeacherService {
    constructor(
        @InjectRepository(TeacherSearchIndex)
        private teacherSearchIndexRepository: Repository<TeacherSearchIndex>,
        @InjectRepository(TeacherView)
        private teacherViewRepository: Repository<TeacherView>
    ) {}

    async getTeacherByLink(link: string): Promise<TeacherDto> {
        const teacher = await this.teacherViewRepository.findOne({ link });

        if (teacher == null) {
            throw ServiceException.create(HttpStatus.NOT_FOUND, 'Teacher with given link was not found');
        }

        return TeacherDto.from(teacher);
    }

    async getTeachers(pageable: Pageable, search?: string): Promise<Page<TeacherItemDto>> {
        const [items, count] = await this.teacherSearchIndexRepository.findAndCount({ 
            ...pageable.toQuery(),
            where: { ...Searchable.of<TeacherSearchIndex>('fullName', search).toQuery() },
        });

        return Page.of(
            count,
            items.map(t => TeacherItemDto.from(t))
        );
    }
}
