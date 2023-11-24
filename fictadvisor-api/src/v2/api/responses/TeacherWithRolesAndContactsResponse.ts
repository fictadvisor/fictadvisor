import { ApiProperty } from '@nestjs/swagger';
import { CathedraResponse } from './CathedraResponse';
import { TeacherRole } from '@prisma/client';
import { ContactResponse } from './ContactResponse';

export class TeacherWithRolesAndContactsResponse {
  @ApiProperty({
    description: 'Teacher\'s id',
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

  @ApiProperty({
    description: 'Teacher\'s description',
  })
    description: string;

  @ApiProperty({
    description: 'Teacher\'s avatar URL',
  })
    avatar: string;

  @ApiProperty({
    type: [CathedraResponse],
  })
    cathedras: CathedraResponse[];

  @ApiProperty({
    type: [TeacherRole],
    enum: TeacherRole,
  })
    roles: TeacherRole[];

  @ApiProperty({
    type: [ContactResponse],
  })
    contacts: ContactResponse[];
}
