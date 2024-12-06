import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';
import { QueryAllDTO } from './QueryAllDTO';
import { SortQARParam, RoleName } from '../enums';

export class QueryAllRolesDTO extends QueryAllDTO {
  @ApiPropertyOptional({
    description: 'Group id of roles',
  })
  @IsUUID(undefined, validationOptionsMsg('Group id must be a UUID'))
  @IsOptional()
    groupId?: string;

  @ApiPropertyOptional({
    enum: SortQARParam,
    description: 'Sorting by field',
    default: 'displayName',
  })
  @IsEnum(SortQARParam, validationOptionsMsg('Sort must be an enum'))
  @IsOptional()
    sort?: SortQARParam;

  @ApiPropertyOptional({
    description: 'The name of the role',
    enum: RoleName,
  })
  @IsEnum(RoleName, validationOptionsMsg('Name must be an enum'))
  @IsOptional()
    name?: RoleName;
}
