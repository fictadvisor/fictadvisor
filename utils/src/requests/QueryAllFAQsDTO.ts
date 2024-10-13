import { QueryAllDTO } from './QueryAllDTO';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';
import { SortQAFAQParam } from '../enums';

export class QueryAllFAQsDTO extends QueryAllDTO {
  @ApiPropertyOptional({
    description: 'Accepts text of FAQ',
  })
    search?: string;

  @ApiPropertyOptional({
    enum: SortQAFAQParam,
    default: SortQAFAQParam.TEXT,
  })
  @IsEnum(SortQAFAQParam, validationOptionsMsg('Sort must be an enum'))
    sort: SortQAFAQParam = SortQAFAQParam.TEXT;

  @ApiPropertyOptional({
    description: 'Array of FAQ categories ids',
  })
  @IsOptional()
  @IsArray(validationOptionsMsg('Categories must be an array'))
  @IsString(validationOptionsMsg('Each category must be a string', true))
  @IsUUID(undefined, validationOptionsMsg('Each category must be a UUID', true))
    categories: string[];
}