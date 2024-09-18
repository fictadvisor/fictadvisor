import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';
import { QueryAllDTO } from './QueryAllDTO';
import { State, SortQAUParam } from '../enums';

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
    @IsString(validationOptionsMsg('Search must be an enum'))
    @IsOptional()
      search?: string;

    @ApiPropertyOptional({
      description: 'State of the user',
      enum: State,
      type: [State],
    })
    @IsArray()
    @IsEnum(State, validationOptionsMsg('Each element of states must be an enum', true))
    @IsOptional()
      state?: State[];
}
