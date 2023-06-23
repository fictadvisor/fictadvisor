import { ApiProperty } from '@nestjs/swagger';

export class TeacherWithRatingResponse {
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

  @ApiProperty()
    rating: number;
}