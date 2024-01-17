import { ApiProperty } from '@nestjs/swagger';

export class SemesterResponse {
  @ApiProperty({
    description: 'Studying year',
  })
    year: number;

  @ApiProperty({
    description: 'Studying semester',
  })
    semester: number;
}
class StudyingSemester extends SemesterResponse {
  @ApiProperty({
    description: 'Semester\'s start date',
  })
    startDate: Date;

  @ApiProperty({
    description: 'Semester\'s end date',
  })
    endDate: Date;
}

export class CurrentSemester extends StudyingSemester {
  @ApiProperty({
    description: 'Whether semester is finished',
  })
    isFinished: boolean;
}

export class SemestersResponse {
  @ApiProperty({
    type: [StudyingSemester],
    description: 'Studying semesters',
  })
    semesters: StudyingSemester[];
}
