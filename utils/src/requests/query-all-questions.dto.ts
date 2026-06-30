import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';
import { QueryAllDTO } from './query-all.dto';
import { SortQAQParam } from '../enums/params/sort-qaq-param.enum';
import { QuestionType } from '../enums/db/question-type.enum';

export class QueryAllQuestionsDTO extends QueryAllDTO {
  @ApiPropertyOptional({
    description: 'Accepts text of question',
  })
  @IsOptional()
    search?: string;

  @ApiPropertyOptional({
    description: 'Accepts answer types',
    type: [QuestionType],
    enum: QuestionType,
    enumName: 'QuestionType',
  })
  @IsArray(validationOptionsMsg('Answer types must be an array'))
  @IsEnum(QuestionType, validationOptionsMsg('Each answer type should be an enum', true))
  @IsOptional()
    types?: QuestionType[];

  @ApiPropertyOptional({
    enum: SortQAQParam,
    enumName: 'SortQAQParam',
  })
  @IsEnum(SortQAQParam, validationOptionsMsg('Sort must be an enum'))
  @IsOptional()
    sort?: SortQAQParam;
}
