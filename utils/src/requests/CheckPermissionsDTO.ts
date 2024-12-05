import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { PERMISSION } from '../security';
import { validationOptionsMsg } from '../ValidationUtil';

export class PermissionValuesDTO {
  @ApiPropertyOptional({
    description: 'The value of the user id',
  })
  @IsString(validationOptionsMsg('The user id must be a string'))
  @IsOptional()
    userId?: string;

  @ApiPropertyOptional({
    description: 'The value of the group id',
  })
  @IsString(validationOptionsMsg('The group id must be a string'))
  @IsOptional()
    groupId?: string;

  @ApiPropertyOptional({
    description: 'The value of the role id',
  })
  @IsString(validationOptionsMsg('The role id must be a string'))
  @IsOptional()
    roleId?: string;

  @ApiPropertyOptional({
    description: 'The value of the teacher id',
  })
  @IsString(validationOptionsMsg('The teacher id must be a string'))
  @IsOptional()
    teacherId?: string;
}

export class CheckPermissionsDTO {
  @ApiProperty({
    enum: PERMISSION,
    type: [PERMISSION],
    description: 'Permissions to check',
  })
  @IsEnum(PERMISSION, { each: true })
  @IsArray(validationOptionsMsg('The permissions must be an array'))
    permissions: PERMISSION[];

  @ApiPropertyOptional({
    description: 'Values for permissions',
  })
  @IsObject(validationOptionsMsg('Values must be an object'))
  @IsOptional()
    values?: PermissionValuesDTO;
}

