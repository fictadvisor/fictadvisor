import { Controller, Get, Param, Query } from "@nestjs/common";
import { SubjectService } from "./subject.service";
import { SearchableQueryDto } from "../../common/common.dto";
import { SubjectItemDto } from "./dto/subject-item.dto";
import { Page } from "../../common/common.api";
import { SubjectDto } from "./dto/subject.dto";
import { CourseDto } from "./dto/course.dto";

@Controller('subjects')
export class SubjectController {
    constructor(
        private subjectService: SubjectService
    ) {}

    @Get()
    getSubjects(@Query() query: SearchableQueryDto): Promise<Page<SubjectItemDto>> {
        return this.subjectService.getSubjects(query);
    }

    @Get('/:link')
    getSubject(@Param('link') link: string): Promise<SubjectDto> {
        return this.subjectService.getSubjectByLink(link);
    }

    @Get('/:link/courses')
    getCourses(
        @Param('link') link: string,
        @Query() query: SearchableQueryDto
    ): Promise<Page<CourseDto>> {
        return this.subjectService.getCoursesByLink(link, query)
    }
}
