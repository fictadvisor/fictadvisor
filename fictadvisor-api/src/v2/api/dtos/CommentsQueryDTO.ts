import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { validationOptionsMsg } from './../../utils/GLOBALS';

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
  @ApiPropertyOptional()
  @IsOptional()
    subjectId?: string;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsNumber({}, validationOptionsMsg('Year must be a number'))
  @IsOptional()
    year?: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsNumber({}, validationOptionsMsg('Semester must be a number'))
  @IsOptional()
    semester?: number;

  @ApiPropertyOptional({
    enum: CommentsSort,
    description: 'Ascending by default',
  })
  @IsEnum(CommentsSort, validationOptionsMsg('SortBy must be an enum'))
  @IsOptional()
    sortBy?: CommentsSort;

  @ApiPropertyOptional({
    description: 'Visualization parameter: access to parts of divided data',
  })
  @Type(() => Number)
  @IsNumber({}, validationOptionsMsg('Page must be a nubmer'))
  @IsOptional()
    page?: number;

  @ApiPropertyOptional({
    description: 'Visualization parameter: Divide data by amount of subjects',
  })
  @Type(() => Number)
  @IsNumber({}, validationOptionsMsg('PageSize must be a number'))
  @IsOptional()
    pageSize?: number;
}
