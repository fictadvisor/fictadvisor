import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';
import { QueryAllDTO } from './QueryAllDTO';
import { SortQAQParam } from '../enums/params/SortQAQParam';
import { QuestionType } from '../enums/db/QuestionTypeEnum';

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
