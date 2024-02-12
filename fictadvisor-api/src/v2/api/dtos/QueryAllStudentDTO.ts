import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { RoleName, State } from '@prisma/client';
import { SortQGSParam } from './GroupStudentsQueryDTO';

export const GroupRoles = {
  STUDENT: RoleName.STUDENT,
  MODERATOR: RoleName.MODERATOR,
  CAPTAIN: RoleName.CAPTAIN,
};

export class QueryAllStudentDTO extends QueryAllDTO {
  @ApiPropertyOptional({
    description: 'Search by full name',
  })
  @IsOptional()
    search?: string;

  @ApiPropertyOptional({
    description: 'Sorting parameters',
    enum: SortQGSParam,
    default: SortQGSParam.LAST_NAME,
  })
  @IsOptional()
  @IsEnum(SortQGSParam, validationOptionsMsg('Sort must be an enum'))
    sort?: string;

  @ApiPropertyOptional({
    description: 'Sorting order',
    enum: ['asc', 'desc'],
    default: 'asc',
  })
    order?: 'asc' | 'desc';

  @ApiPropertyOptional({
    description: 'Array of groups ids',
  })
  @IsArray(validationOptionsMsg('Groups must be an array'))
  @IsOptional()
    groups?: string[];

  @ApiPropertyOptional({
    description: 'Array of students roles',
    enum: GroupRoles,
    type: [GroupRoles],
  })
  @IsArray(validationOptionsMsg('Roles must be an array'))
  @IsEnum(GroupRoles, validationOptionsMsg('Each element of roles must be an enum', true))
  @IsOptional()
    roles?: string[];

  @ApiPropertyOptional({
    description: 'Array of students states',
    enum: State,
    type: [State],
  })
  @IsArray(validationOptionsMsg('States must be an array'))
  @IsEnum(State, validationOptionsMsg('Each element of states must be an enum', true))
  @IsOptional()
    states?: string[];
}