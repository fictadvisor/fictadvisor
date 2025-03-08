import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class SemesterResponse {
  @ApiProperty({
    description: 'Studying year',
  })
  @AutoMap()
    year: number;

  @ApiProperty({
    description: 'Studying semester',
  })
  @AutoMap()
    semester: number;
}
export class StudyingSemester extends SemesterResponse {
  @ApiProperty({
    type: Date,
    description: 'Semester\'s start date',
  })
    startDate: string;

  @ApiProperty({
    type: Date,
    description: 'Semester\'s end date',
  })
    endDate: string;
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
