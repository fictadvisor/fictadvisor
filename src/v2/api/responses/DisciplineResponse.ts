import { ApiProperty } from '@nestjs/swagger';
import { SubjectResponse } from './SubjectResponse';

export class BaseDisciplineResponse {
  @ApiProperty({
    description: 'Id of specified discipline',
  })
    id: string;

  @ApiProperty({
    description: 'Year number',
  })
    year: number;

  @ApiProperty({
    description: 'Whether discipline is selective or not',
  })
    isSelective: boolean;

  @ApiProperty({
    description: 'Semester number',
  })
    semester: number;
}
export class DisciplineResponse extends BaseDisciplineResponse {
  @ApiProperty({
    description: 'Bound subject id',
  })
    subjectId: string;

  @ApiProperty({
    description: 'Bound group id',
  })
    groupId: string;

  @ApiProperty({
    description: 'Some discipline description',
  })
    description: string;
}

export class ShortDisciplineResponse extends BaseDisciplineResponse {
  @ApiProperty({
    type: SubjectResponse,
  })
    subject: SubjectResponse;
}

export class ShortDisciplinesResponse {
  @ApiProperty({
    type: [ShortDisciplineResponse],
  })
    disciplines: ShortDisciplineResponse[];
}
