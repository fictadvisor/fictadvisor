import { GetTeacherCommentsResponse } from '@/lib/api/teacher/types/GetTeacherCommentsResponse';

import { TeacherCommentAdmin } from '../../../../common/types';

export const extractTeacherComments = (data: GetTeacherCommentsResponse) => {
  const allComments: TeacherCommentAdmin[] = [];

  data.questions.forEach(question => {
    question.comments.forEach(comment => {
      allComments.push({
        discipline: comment.discipline,
        semester: comment.semester,
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
