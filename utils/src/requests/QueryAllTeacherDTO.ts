import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsBooleanString, IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { validationOptionsMsg } from '../ValidationUtil';
import { QueryAllDTO } from './QueryAllDTO';
import { SortQATParam } from '../enums/params/SortQATParam';
import { TeacherRole } from '../enums/db/TeacherRoleEnum';

export class QueryAllTeacherDTO extends QueryAllDTO {
  @ApiPropertyOptional({
    description: 'Accepts teacher full name',
  })
  @IsOptional()
    search?: string;

  @ApiPropertyOptional({
    enum: SortQATParam,
  })
  @IsEnum(SortQATParam, validationOptionsMsg('Sort must be an enum'))
  @IsOptional()
    sort?: SortQATParam;

  @ApiPropertyOptional({
    description: 'GroupId',
  })
  @IsOptional()
    groupId?: string;

  @ApiPropertyOptional({
    description: 'Teacher\'s cathedras',
  })
  @IsArray(validationOptionsMsg('Cathedras must be an array'))
  @IsOptional()
    cathedrasId?: string[];

  @ApiPropertyOptional({
    description: 'Teacher\'s roles',
    type: [TeacherRole],
    enum: TeacherRole,
  })
  @IsEnum(TeacherRole, validationOptionsMsg('Each element of roles should be an enum', true))
  @IsArray(validationOptionsMsg('Roles must be an array'))
  @IsOptional()
    roles?: TeacherRole[];

  @ApiPropertyOptional({
    description: 'Option to select teachers that are not from provided cathedra',
    default: false,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
    notInDepartments?: boolean;
}
