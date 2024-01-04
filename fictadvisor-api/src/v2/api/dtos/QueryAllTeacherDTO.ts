import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SortQATParam } from './SortQATParam';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { TeacherRole } from '@prisma/client';

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
}
