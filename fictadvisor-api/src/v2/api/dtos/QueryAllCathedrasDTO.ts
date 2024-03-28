import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export enum SortQACParam {
  NAME='name',
  ABBREVIATION='abbreviation',
  TEACHERS='teachers',
}

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
  @IsString()
  @IsOptional()
    search?: string;

  @ApiPropertyOptional({
    description: 'Search by abbreviation option',
  })
  @IsString()
  @IsOptional()
    abbreviation?: string;

  @ApiPropertyOptional({
    description: 'Search by faculty array option',
  })
  @IsArray(validationOptionsMsg('Faculties must be an array'))
  @IsOptional()
    divisions?: string[];
}