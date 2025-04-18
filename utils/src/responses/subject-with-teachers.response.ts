import { ApiProperty } from '@nestjs/swagger';
import { TeacherWithRolesAndCathedrasResponse } from './teacher-with-roles-and-cathedras.response';

export class SubjectWithTeachersResponse {
  @ApiProperty({
    description: 'The name of the selected subject',
  })
    subjectName: string;

  @ApiProperty({
    type: [TeacherWithRolesAndCathedrasResponse],
    description: 'Teachers connected to the selected subject',
  })
    teachers: TeacherWithRolesAndCathedrasResponse[];

}
