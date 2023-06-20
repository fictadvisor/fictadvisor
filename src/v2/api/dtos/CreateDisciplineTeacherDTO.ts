import { ApiProperty } from '@nestjs/swagger';
import { UpdateDisciplineTeacherDTO } from './UpdateDisciplineTeacherDTO';

export class CreateDisciplineTeacherDTO extends UpdateDisciplineTeacherDTO {
  @ApiProperty()
    teacherId: string;
  @ApiProperty()
    disciplineId: string;
}