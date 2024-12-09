import { ApiProperty } from '@nestjs/swagger';
import { SubjectResponse } from './SubjectResponse';
import { GroupResponse } from './GroupResponse';
import { ShortTeacherResponse } from './TeacherResponse';
import { PaginationDataResponse } from './PaginationDataResponse';
import { SemesterResponse } from './SemesterResponse';
import { DisciplineTypeResponse } from './DisciplineTypeResponse';

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

export class DisciplineAdminResponse extends BaseDisciplineResponse {
  @ApiProperty({
    description: 'Name of discipline',
  })
    name: string;

  @ApiProperty({
    description: 'Group associated with the discipline',
    type: GroupResponse,
  })
    group: GroupResponse;

  @ApiProperty({
    description: 'Teachers associated with the discipline',
    type: [ShortTeacherResponse],
  })
    teachers: ShortTeacherResponse[];
}

export class DisciplinesResponse {
  @ApiProperty({
    type: [DisciplineAdminResponse],
    description: 'List of discipline\'s data',
  })
    disciplines: DisciplineAdminResponse[];

  @ApiProperty({
    description: 'Pagination info',
    type: PaginationDataResponse,
  })
    pagination: PaginationDataResponse;
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
    description: 'Subject of a specific discipline',
  })
    subject: SubjectResponse;
}

export class ShortDisciplinesResponse {
  @ApiProperty({
    type: [ShortDisciplineResponse],
    description: 'List of disciplines',
  })
    disciplines: ShortDisciplineResponse[];
}

export class ExtendedDisciplineResponse extends DisciplineResponse {
  @ApiProperty({
    description: 'Group associated with the discipline',
    type: GroupResponse,
  })
    group: GroupResponse;

  @ApiProperty({
    description: 'Subject of the discipline',
    type: SubjectResponse,
  })
    subject: SubjectResponse;

  @ApiProperty({
    description: 'Discipline types of the discipline',
    type: [DisciplineTypeResponse],
  })
    disciplineTypes: DisciplineTypeResponse[];
}

export class DisciplineIdsResponse {
  @ApiProperty({
    description: 'Ids of disciplines',
  })
    disciplines: string[];
}

export class BaseSelectiveDisciplineResponse extends SubjectResponse {
  @ApiProperty({
    description: 'Id of a specific discipline',
  })
    id: string;
}

export class SelectiveDisciplinesResponse extends SemesterResponse {
  @ApiProperty({
    description: 'Selective disciplines for selected semester',
    type: [BaseSelectiveDisciplineResponse],
  })
    disciplines: BaseSelectiveDisciplineResponse[];
}

export class SelectiveDisciplinesWithAmountResponse extends SelectiveDisciplinesResponse {
  @ApiProperty({
    description: 'Amount of selective disciplines for semester',
  })
    amount: number;
}

export class SortedDisciplinesByPeriodResponse extends BaseDisciplineResponse {
  @ApiProperty({
    description: 'Array of disciplines ids',
  })
    disciplines: string[];
}
