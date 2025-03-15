import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';
import { QueryAllDTO } from './query-all.dto';
import { SortQACParam } from '../enums';

export class QueryAllCathedrasDTO extends QueryAllDTO {
  @ApiPropertyOptional({
    enum: SortQACParam,
  })
  @IsEnum(SortQACParam, validationOptionsMsg('Sort must be an enum'))
  @IsOptional()
    sort?: SortQACParam;

  @ApiPropertyOptional({
    description: 'Search by name option',
  })
  @IsString(validationOptionsMsg('Search must be string'))
  @IsOptional()
    search?: string;

  @ApiPropertyOptional({
    description: 'Search by abbreviation option',
  })
  @IsString(validationOptionsMsg('Abbreviation must be string'))
  @IsOptional()
    abbreviation?: string;

  @ApiPropertyOptional({
    description: 'Search by faculty array option',
  })
  @IsArray(validationOptionsMsg('Faculties must be an array'))
  @IsOptional()
    divisions?: string[];
}
