import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, ValidateNested } from 'class-validator';
import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { QuerySemesterDTO } from './QuerySemesterDTO';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { Type } from 'class-transformer';

export class QueryAllDisciplinesDTO extends QueryAllDTO {
  @ApiPropertyOptional({
    description: 'Array of group\'s ids',
  })
  @IsOptional()
    groups?: string[];

  @ApiPropertyOptional({
    description: 'Array of studying semesters',
  })
  @IsOptional()
  @ValidateNested({
    each: true,
  })
  @Type(() => QuerySemesterDTO)
    semesters?: QuerySemesterDTO[];

  @ApiPropertyOptional({
    description: 'Array of teacher\'s ids',
  })
  @IsOptional()
    teachers?: string[];

  @ApiPropertyOptional({
    description: 'Sorting parameter',
    enum: ['name', 'semester', 'group'],
  })
  @IsIn(['name', 'semester', 'group'], validationOptionsMsg('Wrong value for sort'))
  @IsOptional()
    sort?: 'name' | 'semester' | 'group';
}