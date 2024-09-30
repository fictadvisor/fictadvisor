import { ApiProperty } from '@nestjs/swagger';
import { UpdateDisciplineTeacherDTO } from './UpdateDisciplineTeacherDTO';
import { IsNotEmpty, IsString } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class CreateDisciplineTeacherDTO extends UpdateDisciplineTeacherDTO {
  @ApiProperty({
    description: 'Id of the teacher',
  })
  @IsString(validationOptionsMsg('TeacherId must be a string'))
  @IsNotEmpty(validationOptionsMsg('Teacher id cannot be empty'))
    teacherId: string;

  @ApiProperty({
    description: 'Id of the discipline',
  })
  @IsString(validationOptionsMsg('Discipline id must be a string'))
  @IsNotEmpty(validationOptionsMsg('Discipline id cannot be empty'))
    disciplineId: string;
}
