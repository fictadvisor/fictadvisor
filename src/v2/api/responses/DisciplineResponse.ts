import { ApiProperty } from '@nestjs/swagger';

export class DisciplineResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    subjectId: string;
  
  @ApiProperty()
    groupId: string;

  @ApiProperty()
    semester: number;
  
  @ApiProperty()
    year: number;

  @ApiProperty()
    isSelective: boolean;
  
  @ApiProperty()
    description: string;
}