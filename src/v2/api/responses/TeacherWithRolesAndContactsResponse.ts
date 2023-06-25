import { ApiProperty } from '@nestjs/swagger';
import { CathedraResponse } from './CathedraResponse';
import { TeacherRole } from '@prisma/client';
import { ContactResponse } from './ContactResponse';

export class TeacherWithRolesAndContactsResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    firstName: string;

  @ApiProperty()
    middleName: string;

  @ApiProperty()
    lastName: string;

  @ApiProperty()
    description: string;

  @ApiProperty()
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
