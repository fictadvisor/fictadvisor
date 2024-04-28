import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';
import { QueryAllDTO } from './QueryAllDTO';
import { State } from '../enums/db/StateEnum';
import { SortQAUParam } from '../enums/params/SortQAUParam';

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