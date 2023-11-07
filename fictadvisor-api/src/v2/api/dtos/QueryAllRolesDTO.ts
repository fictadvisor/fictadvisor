import { IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { RoleName } from '@prisma/client';
import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { SortQARParam } from './SortQARParam';

export class QueryAllRolesDTO extends QueryAllDTO {
  @ApiPropertyOptional({
    description: 'Group id for roles',
  })
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