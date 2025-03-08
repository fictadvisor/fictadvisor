import { ApiProperty } from '@nestjs/swagger';
import { SubjectResponse } from './subject.response';
import { GroupResponse } from './group.response';
import { ShortTeacherResponse } from './teacher.response';
import { PaginationDataResponse } from './pagination-data.response';
import { SemesterResponse } from './semester.response';
import { DisciplineTypeResponse } from './discipline-type.response';
import { AutoMap } from '@automapper/classes';

export class BaseDisciplineResponse {
  @ApiProperty({
    description: 'Id of specified discipline',
  })
  @AutoMap()
    id: string;

  @ApiProperty({
    description: 'Year number',
  })
  @AutoMap()
    year: number;

  @ApiProperty({
    description: 'Whether discipline is selective or not',
  })
  @AutoMap()
    isSelective: boolean;

  @ApiProperty({
    description: 'Semester number',
  })
  @AutoMap()
    semester: number;
}

export class DisciplineAdminResponse extends BaseDisciplineResponse {
  @ApiProperty({
    description: 'Name of discipline',
  })
  @AutoMap()
    name: string;

  @ApiProperty({
    description: 'Group associated with the discipline',
    type: GroupResponse,
  })
  @AutoMap(() => GroupResponse)
    group: GroupResponse;

  @ApiProperty({
    description: 'Teachers associated with the discipline',
    type: [ShortTeacherResponse],
  })
  @AutoMap(() => [ShortTeacherResponse])
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
  @AutoMap()
    subjectId: string;

  @ApiProperty({
    description: 'Bound group id',
  })
  @AutoMap()
    groupId: string;

  @ApiProperty({
    description: 'Some discipline description',
  })
  @AutoMap()
    description: string;
}

export class ShortDisciplineResponse extends BaseDisciplineResponse {
  @ApiProperty({
    type: SubjectResponse,
    description: 'Subject of a specific discipline',
  })
  @AutoMap(() => SubjectResponse)
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
  @AutoMap(() => GroupResponse)
    group: GroupResponse;

  @ApiProperty({
    description: 'Subject of the discipline',
    type: SubjectResponse,
  })
  @AutoMap(() => SubjectResponse)
    subject: SubjectResponse;

  @ApiProperty({
    description: 'Discipline types of the discipline',
    type: [DisciplineTypeResponse],
  })
  @AutoMap(() => [DisciplineTypeResponse])
    disciplineTypes: DisciplineTypeResponse[];
}

export class DisciplineIdsResponse {
  @ApiProperty({
    description: 'Ids of disciplines',
  })
  @AutoMap(() => [String])
    disciplines: string[];
}

export class BaseSelectiveDisciplineResponse extends SubjectResponse {
  @ApiProperty({
    description: 'Id of a specific discipline',
  })
  @AutoMap()
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
