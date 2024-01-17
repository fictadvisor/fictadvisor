import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsUUID } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class UpdateStudentSelectiveDTO {
  @ApiPropertyOptional({
    description: 'Ids of selective disciplines to connect',
  })
  @IsArray(validationOptionsMsg('Ids of selective disciplines should be an array'))
  @IsUUID(undefined, validationOptionsMsg('Ids of selective disciplines should be UUIDs', true))
  @IsOptional()
    connectedSelective?: string[];

  @ApiPropertyOptional({
    description: 'Ids of selective disciplines to disconnect',
  })
  @IsArray(validationOptionsMsg('Ids of selective disciplines should be an array'))
  @IsUUID(undefined, validationOptionsMsg('Ids of selective disciplines should be UUIDs', true))
  @IsOptional()
    disconnectedSelective?: string[];
}