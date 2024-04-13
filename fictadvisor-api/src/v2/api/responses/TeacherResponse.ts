import { ApiProperty } from '@nestjs/swagger';
import { AcademicStatus, Position, ScientificDegree } from '@prisma/client';

export class ShortTeacherResponse {
  @ApiProperty({
    description: 'Id of specified teacher',
  })
    id: string;

  @ApiProperty({
    description: 'Teacher\'s first name',
  })
    firstName: string;

  @ApiProperty({
    description: 'Teacher\'s middle name',
  })
    middleName: string;

  @ApiProperty({
    description: 'Teacher\'s last name',
  })
    lastName: string;
}

export class TeacherResponse extends ShortTeacherResponse {
  @ApiProperty({
    description: 'Some description of the teacher',
  })
    description: string;

  @ApiProperty({
    description: 'Link to teacher avatar image',
  })
    avatar: string;


  @ApiProperty({
    description: 'Academic status of the teacher',
    enum: AcademicStatus,
  })
    academicStatus: AcademicStatus;

  @ApiProperty({
    description: 'Scientific degree of the teacher',
    enum: ScientificDegree,
  })
    scientificDegree: ScientificDegree;

  @ApiProperty({
    description: 'Position of the teacher',
    enum: Position,
  })
    position: Position;

  @ApiProperty({
    description: 'Teacher rating according to the poll, updated at 00:00 (UTC)',
  })
    rating: number;
}
