import { ApiProperty } from '@nestjs/swagger';
import { DisciplineResponse } from './DisciplineResponse';
import { QuestionWithCategoryResponse } from './QuestionResponse';
import { TeacherResponse } from './TeacherResponse';

class DisciplineTeacher {
  @ApiProperty({
    description: 'Id of the disciplineTeacher',
  })
    id: string;

  @ApiProperty({
    description: 'Teacher id of the disciplineTeacher',
  })
    teacherId: string;

  @ApiProperty({
    description: 'Discipline id of the disciplineTeacher',
  })
    disciplineId: string;

  @ApiProperty({
    description: 'Discipline of the disciplineTeacher',
    type: DisciplineResponse,
  })
    discipline: DisciplineResponse;

  @ApiProperty({
    description: 'Teacher of the disciplineTeacher',
    type: TeacherResponse,
  })
    teacher: TeacherResponse;
}

export class QuestionAnswerResponse {
  @ApiProperty({
    description: 'Id of the disciplineTeacher',
  })
    disciplineTeacherId: string;

  @ApiProperty({
    description: 'Id of the question',
  })
    questionId: string;

  @ApiProperty({
    description: 'Id of the user',
  })
    userId: string;

  @ApiProperty({
    description: 'Text of the question answer',
  })
    value: string;

  @ApiProperty({
    description: 'DisciplineTeacher of the question answer',
    type: DisciplineTeacher,
  })
    disciplineTeacher: DisciplineTeacher;

  @ApiProperty({
    description: 'Questions of the question answer',
    type: QuestionWithCategoryResponse,
  })
    question: QuestionWithCategoryResponse;
}
