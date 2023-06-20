import { ApiProperty } from '@nestjs/swagger';
import { DisciplineResponse } from './DisciplineResponse';
import { QuestionResponse } from './QuestionResponse';
import { TeacherResponse } from './TeacherResponse';

class DisciplineTeacher {
  @ApiProperty()
    id: string;

  @ApiProperty()
    teacherId: string;

  @ApiProperty()
    disciplineId: string;

  @ApiProperty({
    type: DisciplineResponse,
  })
    discipline: DisciplineResponse;

  @ApiProperty({
    type: TeacherResponse,
  })
    teacher: TeacherResponse;
}

export class QuestionAnswerResponse {
  @ApiProperty()
    disciplineTeacherId: string;

  @ApiProperty()
    questionId: string;

  @ApiProperty()
    userId: string;

  @ApiProperty()
    value: string;

  @ApiProperty({
    type: DisciplineTeacher,
  })
    disciplineTeacher: DisciplineTeacher;

  @ApiProperty({
    type: QuestionResponse,
  })
    question: QuestionResponse;
}