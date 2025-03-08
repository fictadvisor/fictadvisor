import { ApiProperty } from '@nestjs/swagger';
import { EducationProgram } from '../enums';
import { AutoMap } from '@automapper/classes';

export class EduProgramResponse {
  @ApiProperty({
    description: 'Educational program id',
  })
  @AutoMap()
    id: string;

  @ApiProperty({
    description: 'Educational program name',
  })
  @AutoMap()
    name: string;

  @ApiProperty({
    description: 'Educational program abbreviation',
  })
  @AutoMap(() => String)
    abbreviation: EducationProgram;

  @ApiProperty({
    description: 'Amount of groups in the educational program',
  })
  @AutoMap()
    groupsAmount: number;
}

export class EduProgramsResponse {
  @ApiProperty({
    description: 'Array of educational programs',
    type: [EduProgramResponse],
  })
    programs: EduProgramResponse[];
}
