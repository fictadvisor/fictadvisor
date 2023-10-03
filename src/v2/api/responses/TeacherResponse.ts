import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TeacherRole } from '@prisma/client';

export class TeacherResponse {
  @ApiProperty({
    description: 'Id of specified teacher',
  })
    id: string;

  @ApiProperty({
    description: 'Teacher\'s first name',
  })
    firstName: string;

  @ApiPropertyOptional({
    description: 'Teacher\'s middle name',
  })
    middleName?: string;

  @ApiProperty({
    description: 'Teacher\'s last name',
  })
    lastName: string;

  @ApiPropertyOptional({
    description: 'Some description of the teacher',
  })
    description?: string;

  @ApiPropertyOptional({
    description: 'Link to teacher avatar image',
  })
    avatar?: string;

  @ApiProperty({
    description: 'Teacher rating according to the poll, updated at 00:00 (UTC)',
  })
    rating: number;
}

export class ExtendTeacherResponse extends TeacherResponse {
  @ApiProperty()
    disciplineTeacherId: string;

  @ApiProperty({
    type: [TeacherRole],
    enum: TeacherRole,
  })
    roles: TeacherRole[];
}
