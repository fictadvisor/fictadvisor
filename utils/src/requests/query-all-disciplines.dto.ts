import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsIn, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { QueryAllDTO } from './query-all.dto';
import { QuerySemesterDTO } from './query-semester.dto';
import { validationOptionsMsg } from '../validation.util';

export class QueryAllDisciplinesDTO extends QueryAllDTO {
  @ApiPropertyOptional({
    description: 'Array of group\'s ids',
  })
  @IsOptional()
  @IsArray(validationOptionsMsg('Groups must be an array'))
  @IsUUID('4', validationOptionsMsg('Groups must be an UUID', true))
    groups?: string[];

  @ApiPropertyOptional({
    description: 'Array of studying semesters',
  })
  @IsOptional()
  @ValidateNested(validationOptionsMsg('Each value of semesters must be an studying semester', true))
  @Type(() => QuerySemesterDTO)
    semesters?: QuerySemesterDTO[];

  @ApiPropertyOptional({
    description: 'Array of teacher\'s ids',
  })
  @IsOptional()
  @IsArray(validationOptionsMsg('Teachers must be an array'))
  @IsUUID('4', validationOptionsMsg('Teachers must be an UUID', true))
    teachers?: string[];

  @ApiPropertyOptional({
    description: 'Sorting parameter',
    enum: ['name', 'semester', 'group'],
  })
  @IsIn(['name', 'semester', 'group'], validationOptionsMsg('Wrong value for sort'))
  @IsOptional()
    sort?: 'name' | 'semester' | 'group';
}
