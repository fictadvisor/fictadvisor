import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { QueryAllDTO } from './query-all.dto';
import { validationOptionsMsg } from '../validation.util';
import { SortQASParam } from '../enums';

export class QueryAllSubjectsDTO extends QueryAllDTO {
  @ApiPropertyOptional({
    description: 'GroupId',
  })
  @IsString(validationOptionsMsg('GroupId must be a string'))
  @IsUUID(4, validationOptionsMsg('GroupId must be a valid UUID v4'))
  @IsOptional()
    groupId?: string;

  @ApiPropertyOptional({
    enum: SortQASParam,
  })
  @IsOptional()
    sort?: SortQASParam;
}
