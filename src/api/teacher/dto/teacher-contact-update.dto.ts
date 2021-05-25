import { TeacherContactState } from '../../../database/entities/teacher-contact.entity';
import { IsEnum, IsOptional } from 'class-validator';
import { TeacherState } from '../../../database/entities/teacher.entity';

export class TeacherContactUpdateDto {
  name?: string;
  value?: string;

  @IsOptional()
  @IsEnum(TeacherState)
  state?: TeacherContactState;
}
