import { IsNotEmpty } from 'class-validator';

export class CreateDisciplineTeacherDTO {
  @IsNotEmpty()
    teacherId: string;
  @IsNotEmpty()
    disciplineId: string;
}