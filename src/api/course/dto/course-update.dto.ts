import { IsEnum, IsOptional } from 'class-validator';
import { CourseState } from '../../../database/entities/course.entity';

export class CourseUpdateDto {
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(CourseState)
  state?: CourseState;
}
