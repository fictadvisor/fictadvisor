import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { State } from '@prisma/client';
import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export enum SortQAUParam {
    USERNAME  = 'username',
    EMAIL = 'email',
}

export class QueryAllUsersDTO extends QueryAllDTO {
    @ApiPropertyOptional({
      enum: SortQAUParam,
      description: 'Sorting by field',
      default: 'username',
    })
    @IsEnum(SortQAUParam, validationOptionsMsg('Sort must be an enum'))
    @IsOptional()
      sort?: SortQAUParam;

    @ApiPropertyOptional({
      description: 'Symbols that should be in username or email',
    })
    @IsOptional()
      search?: string;

    @ApiPropertyOptional({
      description: 'State of the user',
      enum: State,
      type: [State],
    })
    @IsArray()
    @IsEnum(State, validationOptionsMsg('Each element of states should be an enum', true))
    @IsOptional()
      state?: State[];
}