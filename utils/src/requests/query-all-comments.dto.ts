import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { validationOptionsMsg } from '../validation.util';
import { QueryAllDTO } from './query-all.dto';
import { QuerySemesterDTO } from './query-semester.dto';
import { CommentsSortBy } from '../enums/other/comments-sort-by.enum';

export class QueryAllCommentsDTO extends QueryAllDTO {
  @ApiPropertyOptional({
    enum: CommentsSortBy,
    default: CommentsSortBy.SEMESTER,
  })
  @IsEnum(CommentsSortBy, validationOptionsMsg('Sort must be an enum'))
    sort?: CommentsSortBy;

  @ApiPropertyOptional({
    description: 'Array of studying semesters',
  })
  @IsOptional()
  @ValidateNested(validationOptionsMsg('Each value of semesters must be an studying semester', true))
  @Type(() => QuerySemesterDTO)
    semesters?: QuerySemesterDTO[];
}
