import { ApiProperty } from '@nestjs/swagger';
import { TeacherResponse } from './TeacherResponse';

export class CathedraWithTeachersResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    name: string;

  @ApiProperty()
    abbreviation: string;

  @ApiProperty({
    type: [TeacherResponse],
  })
    teachers: TeacherResponse[];
}
