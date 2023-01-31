import { Controller, Get, Query } from '@nestjs/common';
import { type Page } from 'src/v1/common/common.api';
import { SearchableQueryDto } from 'src/v1/common/common.dto';
import { type StudentResourceDto } from './dto/student-resource.dto';
import { StudentResourceService } from './student-resource.service';

@Controller('student-resources')
export class StudentResourceController {
  constructor (private readonly studentResourceService: StudentResourceService) {}

  @Get()
  async getResources (
    @Query() query: SearchableQueryDto
  ): Promise<Page<StudentResourceDto>> {
    return await this.studentResourceService.getResources(query);
  }
}
