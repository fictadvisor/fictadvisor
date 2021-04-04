import { Controller, Get, Param, Query } from '@nestjs/common';
import { Page } from 'src/common/common.api';
import { SearchableQueryDto } from 'src/common/common.dto';
import { TeacherContactDto } from './dto/teacher-contact.dto';
import { TeacherContactService } from './teacher-contact.service';

@Controller('teachers')
export class TeacherController {
    constructor(
        private teacherContactService: TeacherContactService
    ) {}

    @Get()
    getTeacherContacts(@Query() query: SearchableQueryDto): Promise<Page<TeacherContactDto>> {
        return this.teacherContactService.getTeacherContacts(query);
    }
}
