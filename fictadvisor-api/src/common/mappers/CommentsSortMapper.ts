import { Prisma } from '@prisma/client/fictadvisor';
import { CommentsSortOrder } from '@fictadvisor/utils/enums';

export const CommentsSortMapper: { [key in CommentsSortOrder]: Prisma.Enumerable<Prisma.QuestionAnswerOrderByWithRelationInput>} = {
  [CommentsSortOrder.NEWEST]: [
    {
      disciplineTeacher: {
        discipline: {
          year: 'desc',
        },
      },
    },
    {
      disciplineTeacher: {
        discipline: {
          semester: 'desc',
        },
      },
    },
  ],
  [CommentsSortOrder.OLDEST]: [
    {
      disciplineTeacher: {
        discipline: {
          year: 'asc',
        },
      },
    },
    {
      disciplineTeacher: {
        discipline: {
          semester: 'asc',
        },
      },
    },
  ],
};
