import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';
import { CommentsSortOrder } from '../enums/other/comments-sort-order.enum';

export class CommentsQueryDTO {
  @ApiPropertyOptional({
    description: 'Subject id',
  })
  @IsOptional()
    subjectId?: string;

  @ApiPropertyOptional({
    description: 'Academic year',
  })
  @Type(() => Number)
  @IsNumber({}, validationOptionsMsg('Year must be a number'))
  @IsOptional()
    year?: number;

  @ApiPropertyOptional({
    description: 'Number of semester',
  })
  @Type(() => Number)
  @IsNumber({}, validationOptionsMsg('Semester must be a number'))
  @IsOptional()
    semester?: number;

  @ApiPropertyOptional({
    enum: CommentsSortOrder,
    description: 'Ascending by default',
  })
  @IsEnum(CommentsSortOrder, validationOptionsMsg('SortBy must be an enum'))
  @IsOptional()
    sortBy?: CommentsSortOrder;

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
