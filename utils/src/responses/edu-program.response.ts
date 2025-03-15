import { ApiProperty } from '@nestjs/swagger';
import { EducationProgram } from '../enums/db/education-program.enum';

export class EduProgramResponse {
  @ApiProperty({
    description: 'Educational program id',
  })
    id: string;
  
  @ApiProperty({
    description: 'Educational program name',
  })
    name: string;
  
  @ApiProperty({
    description: 'Educational program abbreviation',
  })
    abbreviation: EducationProgram;
  
  @ApiProperty({
    description: 'Amount of groups in the educational program',
  })
    groupsAmount: number;
}

export class EduProgramsResponse {
  @ApiProperty({
    description: 'Array of educational programs',
    type: [EduProgramResponse],
  })
    programs: EduProgramResponse[];
}
