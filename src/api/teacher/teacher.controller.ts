import { Controller, Get, Param, Query } from '@nestjs/common';
import { Page } from 'src/common/common.api';
import { SearchableQueryDto } from 'src/common/common.dto';
import { TeacherItemDto } from './dto/teacher-item.dto';
import { TeacherDto } from './dto/teacher.dto';
import { TeacherService } from './teacher.service';

@Controller('teachers')
export class TeacherController {
    constructor(
        private teacherService: TeacherService
    ) {}

    @Get('/:link')
    getTeacher(@Param('link') link: string): Promise<TeacherDto> {
        return this.teacherService.getTeacherByLink(link);
    }

    @Get()
    getTeachers(@Query() query: SearchableQueryDto): Promise<Page<TeacherItemDto>> {
        return this.teacherService.getTeachers(query);
    }
}
