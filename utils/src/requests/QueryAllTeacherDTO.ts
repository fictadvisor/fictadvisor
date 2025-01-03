import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';
import { validationOptionsMsg } from '../ValidationUtil';
import { QueryAllDTO } from './QueryAllDTO';
import {
  SortQATParam,
  DisciplineTypeEnum,
} from '../enums';

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
  @IsUUID(4, validationOptionsMsg('Group id must be a UUID'))
    groupId?: string;

  @ApiPropertyOptional({
    description: 'Teacher\'s cathedras',
  })
  @IsArray(validationOptionsMsg('Cathedras must be an array'))
  @IsOptional()
    cathedrasId?: string[];

  @ApiPropertyOptional({
    description: 'Teacher\'s discipline types',
    type: [DisciplineTypeEnum],
    enum: DisciplineTypeEnum,
  })
  @IsEnum(DisciplineTypeEnum, validationOptionsMsg('Each element of discipline types should be an enum', true))
  @IsArray(validationOptionsMsg('Discipline types must be an array'))
  @IsOptional()
    disciplineTypes?: DisciplineTypeEnum[];

  @ApiPropertyOptional({
    description: 'Option to select teachers that are not from provided cathedra',
    default: false,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
    notInDepartments?: boolean;
}
