import { ApiProperty } from '@nestjs/swagger';
import { QuestionResponse } from './QuestionResponse';
import { TeacherResponse } from './TeacherResponse';

class Category {
  @ApiProperty()
    name: string;

  @ApiProperty()
    count: number;

  @ApiProperty({
    type: [QuestionResponse],
  })
    questions: QuestionResponse[];
}

class Subject {
  @ApiProperty()
    id: string;

  @ApiProperty()
    name: string;
}

export class DisciplineTeacherQuestionsResponse {
  @ApiProperty({
    type: TeacherResponse,
  })
    teacher: TeacherResponse;
  
  @ApiProperty({
    type: Subject,
  })
    subject: Subject;

  @ApiProperty({
    type: [Category],
  })
    categories: Category[];
}
