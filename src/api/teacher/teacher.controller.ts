import { Controller, Get, Param } from '@nestjs/common';
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
}
