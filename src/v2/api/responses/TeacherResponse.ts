import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TeacherRole } from '@prisma/client';

export class TeacherResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    firstName: string;

  @ApiPropertyOptional()
    middleName?: string;

  @ApiProperty()
    lastName: string;

  @ApiPropertyOptional()
    description?: string;

  @ApiPropertyOptional()
    avatar?: string;

  @ApiProperty()
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
