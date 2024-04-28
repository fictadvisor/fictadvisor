import { PaginatedQuestionCommentsResponse } from '@fictadvisor/utils/responses';

import { TeacherCommentAdmin } from '@/app/admin/teachers/common/types';

export const extractTeacherComments = (
  data: PaginatedQuestionCommentsResponse,
) => {
  const allComments: TeacherCommentAdmin[] = [];

  data.questions.forEach(question => {
    question.comments.forEach(comment => {
      allComments.push({
        discipline: comment.discipline,
        semester: comment.semester as 1 | 2,
        year: comment.year,
        comment: comment.comment,
        userId: comment.userId,
        disciplineTeacherId: comment.disciplineTeacherId,
        questionId: question.id,
      });
    });
  });

  return allComments;
};
