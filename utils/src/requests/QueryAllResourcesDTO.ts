import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class QueryAllResourcesDTO {
    @ApiPropertyOptional({
      description: 'Id`s array of necessary page texts',
    })
    @IsOptional()
    @IsArray(validationOptionsMsg('Id`s must be an array'))
      ids?: string[];
}