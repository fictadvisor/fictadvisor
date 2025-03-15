import { ApiProperty } from '@nestjs/swagger';
import { AcademicStatus, Position, ScientificDegree } from '../enums';
import { AutoMap } from '@automapper/classes';

export class ShortTeacherResponse {
  @ApiProperty({
    description: 'Id of specified teacher',
  })
  @AutoMap()
    id: string;

  @ApiProperty({
    description: 'Teacher\'s first name',
  })
  @AutoMap()
    firstName: string;

  @ApiProperty({
    description: 'Teacher\'s middle name',
  })
  @AutoMap()
    middleName: string;

  @ApiProperty({
    description: 'Teacher\'s last name',
  })
  @AutoMap()
    lastName: string;
}

export class TeacherResponse extends ShortTeacherResponse {
  @ApiProperty({
    description: 'Some description of the teacher',
  })
  @AutoMap()
    description: string;

  @ApiProperty({
    description: 'Link to teacher avatar image',
  })
  @AutoMap()
    avatar: string;

  @ApiProperty({
    description: 'Academic status of the teacher',
    enum: AcademicStatus,
  })
  @AutoMap(() => String)
    academicStatus: AcademicStatus;

  @ApiProperty({
    description: 'Scientific degree of the teacher',
    enum: ScientificDegree,
  })
  @AutoMap(() => String)
    scientificDegree: ScientificDegree;

  @ApiProperty({
    description: 'Position of the teacher',
    enum: Position,
  })
  @AutoMap(() => String)
    position: Position;

  @ApiProperty({
    description: 'Teacher rating according to the poll, updated at 00:00 (UTC)',
  })
  @AutoMap()
    rating: number;
}
