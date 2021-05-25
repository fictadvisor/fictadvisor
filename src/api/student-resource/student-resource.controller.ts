import { Controller, Get, Query } from '@nestjs/common';
import { Page } from 'src/common/common.api';
import { SearchableQueryDto } from 'src/common/common.dto';
import { StudentResourceDto } from './dto/student-resource.dto';
import { StudentResourceService } from './student-resource.service';

@Controller('student-resources')
export class StudentResourceController {
  constructor(private studentResourceService: StudentResourceService) {}

  @Get()
  getResources(
    @Query() query: SearchableQueryDto
  ): Promise<Page<StudentResourceDto>> {
    return this.studentResourceService.getResources(query);
  }
}
