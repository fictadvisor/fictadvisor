import { ApiProperty } from '@nestjs/swagger';

export class DisciplineTeacherAndSubjectResponse {
  @ApiProperty({
    description: 'Id of a specific discipline',
  })
    disciplineTeacherId: string;
  
  @ApiProperty({
    description: 'Name of a specific subject',
  })
    subjectName: string;
}