import { Controller, Get, Param, Query } from '@nestjs/common';
import { Page, Pageable } from 'src/common/common.api';
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
    getTeachers(
        @Query('page') page: number,
        @Query('page_size') pageSize: number
    ): Promise<Page<TeacherDto>> {
        return this.teacherService.getTeachers(Pageable.of(page, pageSize));
    }
}
