import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SortQAQParam } from './SortQAQParam';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { QuestionType } from '@prisma/client';

export class QueryAllQuestionDTO extends QueryAllDTO {
  @ApiPropertyOptional({
    description: 'Accepts text of question',
  })
  @IsOptional()
    search?: string;

  @ApiPropertyOptional({
    description: 'Accepts answer types',
    type: [QuestionType],
    enum: QuestionType,
  })
  @IsArray(validationOptionsMsg('Answer types must be an array'))
  @IsEnum(QuestionType, validationOptionsMsg('Each answer type should be an enum', true))
  @IsOptional()
    types?: QuestionType[];

  @ApiPropertyOptional({
    enum: SortQAQParam,
  })
  @IsEnum(SortQAQParam, validationOptionsMsg('Sort must be an enum'))
  @IsOptional()
    sort?: SortQAQParam;
}
