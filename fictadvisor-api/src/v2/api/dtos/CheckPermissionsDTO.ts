import { IsArray, IsEnum, IsObject, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PERMISSION } from '../../security/PERMISSION';

export class CheckPermissionsDTO {
    @ApiProperty({
      enum: PERMISSION,
      type: [PERMISSION],
      description: 'Permissions to check',
    })
    @IsEnum(PERMISSION, { each: true })
    @IsArray()
      permissions: PERMISSION[];

    @ApiPropertyOptional({
      description: 'Values for permissions',
    })
    @IsObject()
    @IsOptional()
      values: object;
}

