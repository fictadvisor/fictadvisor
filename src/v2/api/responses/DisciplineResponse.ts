import { ApiProperty } from '@nestjs/swagger';
import { SubjectResponse } from './SubjectResponse';

export class BaseDisciplineResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    year: number;

  @ApiProperty()
    isSelective: boolean;

  @ApiProperty()
    semester: number;
}
export class DisciplineResponse extends BaseDisciplineResponse {
  @ApiProperty()
    subjectId: string;

  @ApiProperty()
    groupId: string;

  @ApiProperty()
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
