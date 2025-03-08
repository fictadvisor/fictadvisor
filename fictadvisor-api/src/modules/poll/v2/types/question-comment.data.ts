import { PaginatedData } from '../../../../database/types/paginated.data';
import { AutoMap } from '@automapper/classes';
import { DbDisciplineTeacher } from '../../../../database/v2/entities/discipline-teacher.entity';

export class CommentData {
  @AutoMap()
    disciplineTeacherId: string;

  @AutoMap()
    questionId: string;

  @AutoMap()
    userId: string;

  @AutoMap()
    value: string;

  @AutoMap(() => DbDisciplineTeacher)
    disciplineTeacher: DbDisciplineTeacher;
}

export class QuestionCommentData {
  @AutoMap()
    id: string;

  @AutoMap()
    category: string;

  @AutoMap()
    name: string;

  @AutoMap()
    order: number;

  @AutoMap()
    description?: string;

  @AutoMap()
    text: string;

  @AutoMap()
    isRequired: boolean;

  @AutoMap()
    criteria?: string;

  comments: PaginatedData<CommentData>;
}
