import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsUUID } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class UpdateStudentSelectivesDTO {
  @ApiPropertyOptional({
    description: 'Ids of selective disciplines to connect',
  })
  @IsArray(validationOptionsMsg('Ids of selective disciplines should be an array'))
  @IsUUID(undefined, validationOptionsMsg('Ids of selective disciplines should be UUIDs', true))
  @IsOptional()
    connectedSelectives?: string[];

  @ApiPropertyOptional({
    description: 'Ids of selective disciplines to disconnect',
  })
  @IsArray(validationOptionsMsg('Ids of selective disciplines should be an array'))
  @IsUUID(undefined, validationOptionsMsg('Ids of selective disciplines should be UUIDs', true))
  @IsOptional()
    disconnectedSelectives?: string[];
}