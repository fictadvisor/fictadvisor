import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryAllCathedrasDTO extends QueryAllDTO {
  @ApiPropertyOptional({
    enum: ['name', 'abbreviation'],
  })
  @IsOptional()
    sort?: 'name' | 'abbreviation';
}