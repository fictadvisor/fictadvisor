import { ApiProperty } from '@nestjs/swagger';
import { DisciplineResponse } from './discipline.response';
import { QuestionWithCategoryResponse } from './question.response';
import { TeacherResponse } from './teacher.response';
import { AutoMap } from '@automapper/classes';

export class DisciplineTeacher {
  @ApiProperty({
    description: 'Id of the disciplineTeacher',
  })
  @AutoMap()
    id: string;

  @ApiProperty({
    description: 'Teacher id of the disciplineTeacher',
  })
  @AutoMap()
    teacherId: string;

  @ApiProperty({
    description: 'Discipline id of the disciplineTeacher',
  })
  @AutoMap()
    disciplineId: string;

  @ApiProperty({
    description: 'Discipline of the disciplineTeacher',
    type: DisciplineResponse,
  })
  @AutoMap(() => DisciplineResponse)
    discipline: DisciplineResponse;

  @ApiProperty({
    description: 'Teacher of the disciplineTeacher',
    type: TeacherResponse,
  })
  @AutoMap(() => TeacherResponse)
    teacher: TeacherResponse;
}

export class QuestionAnswerResponse {
  @ApiProperty({
    description: 'Id of the disciplineTeacher',
  })
  @AutoMap()
    disciplineTeacherId: string;

  @ApiProperty({
    description: 'Id of the question',
  })
  @AutoMap()
    questionId: string;

  @ApiProperty({
    description: 'Id of the user',
  })
  @AutoMap()
    userId: string;

  @ApiProperty({
    description: 'Text of the question answer',
  })
  @AutoMap()
    value: string;

  @ApiProperty({
    description: 'DisciplineTeacher of the question answer',
    type: DisciplineTeacher,
  })
  @AutoMap(() => DisciplineTeacher)
    disciplineTeacher: DisciplineTeacher;

  @ApiProperty({
    description: 'Questions of the question answer',
    type: QuestionWithCategoryResponse,
  })
  @AutoMap(() => QuestionWithCategoryResponse)
    question: QuestionWithCategoryResponse;
}
