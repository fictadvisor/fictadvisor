import { ApiProperty } from '@nestjs/swagger';
import { QuestionResponse } from './QuestionResponse';
import { TeacherResponse } from './TeacherResponse';
import { SubjectResponse } from './SubjectResponse';

class Category {
  @ApiProperty({
    description: 'Categories name',
  })
    name: string;

  @ApiProperty({
    description: 'Number of questions in this category',
  })
    count: number;

  @ApiProperty({
    type: [QuestionResponse],
    description: 'Array of questions of this category',
  })
    questions: QuestionResponse[];
}

export class DisciplineTeacherQuestionsResponse {
  @ApiProperty({
    type: TeacherResponse,
    description: 'The teacher to whom the question belongs',
  })
    teacher: TeacherResponse;
  
  @ApiProperty({
    description: 'The subject of the teacher',
    type: SubjectResponse,
  })
    subject: SubjectResponse;

  @ApiProperty({
    type: [Category],
    description: 'An array of categories with questions',
  })
    categories: Category[];
}
