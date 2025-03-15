import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsUUID } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';

export class QueryAllResourcesDTO {
  @ApiPropertyOptional({
    description: 'Id`s array of necessary page texts',
  })
  @IsOptional()
  @IsUUID(undefined, validationOptionsMsg('Id must be UUID', true))
  @IsArray(validationOptionsMsg('Id`s must be an array'))
    ids?: string[];
}
