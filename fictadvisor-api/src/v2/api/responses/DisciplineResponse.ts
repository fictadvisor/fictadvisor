import { ApiProperty } from '@nestjs/swagger';
import { SubjectResponse } from './SubjectResponse';
import { GroupResponse } from './GroupResponse';
import { ShortTeacherResponse } from './TeacherResponse';
import { PaginationDataResponse } from './PaginationDataResponse';

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

export class DisciplineIdsResponse {
  @ApiProperty({
    description: 'Ids of disciplines',
  })
    disciplines: string[];
}