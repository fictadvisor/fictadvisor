import { IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';

export enum CommentsSort {
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export const CommentsSortMapper: { [key in CommentsSort]: Prisma.Enumerable<Prisma.QuestionAnswerOrderByWithRelationInput>} = {
  [CommentsSort.NEWEST]: [
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
  [CommentsSort.OLDEST]: [
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

export class CommentsQueryDTO {
  @IsOptional()
    subjectId?: string;

  @Type(() => Number)
  @IsOptional()
    year?: number;

  @Type(() => Number)
  @IsOptional()
    semester?: number;

  @IsEnum(CommentsSort)
  @IsOptional()
    sortBy?: CommentsSort;
}
