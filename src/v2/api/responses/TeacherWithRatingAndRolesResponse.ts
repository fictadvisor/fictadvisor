import { ApiProperty } from '@nestjs/swagger';
import { TeacherRole } from '@prisma/client';

export class TeacherWithRatingAndRolesResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    firstName: string;

  @ApiProperty()
    middleName: string;

  @ApiProperty()
    lastName: string;

  @ApiProperty()
    description: string;

  @ApiProperty()
    avatar: string;

  @ApiProperty({
    type: [TeacherRole],
    enum: TeacherRole,
  })
    roles: TeacherRole[];
  
  @ApiProperty()
    rating: number;
  
}