import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { validationOptionsMsg } from '../ValidationUtil';
import { QueryAllDTO } from './QueryAllDTO';
import { QuerySemesterDTO } from './QuerySemesterDTO';
import { CommentsSortBy } from '../enums/other/CommentsSortByEnum';

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
