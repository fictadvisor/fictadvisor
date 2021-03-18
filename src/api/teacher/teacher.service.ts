import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page, Pageable } from 'src/common/common.api';
import { ServiceException } from 'src/common/common.exception';
import { Teacher } from 'src/database/entities/teacher.entity';
import { Repository } from 'typeorm';
import { TeacherDto } from './dto/teacher.dto';

@Injectable()
export class TeacherService {
    constructor(
        @InjectRepository(Teacher)
        private teacherRepository: Repository<Teacher>
    ) {}

    async getTeacherByLink(link: string): Promise<TeacherDto> {
        const teacher = await this.teacherRepository.findOne({ link });

        if (teacher == null) {
            throw ServiceException.create(HttpStatus.NOT_FOUND, 'Teacher with given link was not found');
        }

        return TeacherDto.from(teacher);
    }

    async getTeachers(pageable: Pageable): Promise<Page<TeacherDto>> {
        const [items, count] = await this.teacherRepository.findAndCount({ ...pageable.toQuery() });

        return Page.of(
            count,
            items.map(t => TeacherDto.from(t))
        );
    }
}
