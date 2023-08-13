import { Subject } from '@prisma/client';
import { PaginatedData } from './PaginatedData';

class Comment {
  disciplineTeacherId: string;
  questionId: string;
  userId: string;
  value: string;
  disciplineTeacher: {
    id: string,
    teacherId: string,
    disciplineId: string,
    discipline: {
      id: string,
      subject: Subject,
      subjectId: string,
      groupId: string,
      semester: number,
      year: number,
      isSelective: boolean,
      description: string,
    };
  };
}

export class QuestionCommentData {
  id: string;
  category: string;
  name: string;
  order: number;
  description?: string;
  text: string;
  isRequired: boolean;
  criteria?: string;
  comments: PaginatedData<Comment>;
}