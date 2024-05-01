import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ResourceCategoryResponse } from './ResourceCategoryResponse';
import { SubjectResponse } from './SubjectResponse';
import { ShortTeacherResponse } from './TeacherResponse';

export class DisciplineResourceResponse {
  @ApiProperty({
    description: 'Discipline resource id',
  })
    id: string;
  
  @ApiProperty({
    description: 'Discipline resource name',
  })
    name: string;

  @ApiPropertyOptional({
    description: 'Discipline resource description',
  })
    description?: string;

  @ApiProperty({
    description: 'Link to discipline resource',
  })
    link: string;

  @ApiProperty({
    type: SubjectResponse,
  })
    subject: SubjectResponse;

  @ApiProperty({
    type: ShortTeacherResponse,
  })
    teacher: ShortTeacherResponse;
  
  @ApiProperty({
    type: [ResourceCategoryResponse],
  })
    categories: ResourceCategoryResponse[];
}