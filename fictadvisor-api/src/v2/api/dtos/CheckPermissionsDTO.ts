import { IsArray, IsEnum, IsObject, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PERMISSION } from '../../security/PERMISSION';

export class CheckPermissionsDTO {
    @ApiProperty({
      enum: PERMISSION,
      type: [PERMISSION],
    })
    @IsEnum(PERMISSION, { each: true })
    @IsArray()
      permissions: PERMISSION[];

    @ApiPropertyOptional()
    @IsObject()
    @IsOptional()
      values: object;
}

