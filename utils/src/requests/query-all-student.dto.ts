import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';
import { QueryAllDTO } from './query-all.dto';
import { SortQGSParam } from '../enums/params/sort-qgs-param.enum';
import { State } from '../enums/db/state.enum';
import { GroupRoles } from '../enums/other/group-roles.enum';

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
    sort?: SortQGSParam;

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
    roles?: (keyof typeof GroupRoles)[];

  @ApiPropertyOptional({
    description: 'Array of students states',
    enum: State,
    type: [State],
  })
  @IsArray(validationOptionsMsg('States must be an array'))
  @IsEnum(State, validationOptionsMsg('Each element of states must be an enum', true))
  @IsOptional()
    states?: State[];
}
