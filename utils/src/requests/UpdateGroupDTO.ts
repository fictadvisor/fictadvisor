import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Matches } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class UpdateGroupDTO {
  @ApiPropertyOptional({
    description: 'New group code',
  })
  @Matches(/І[МПКАСОВТ]-([зпв]|зп)?\d\d(мн|мп|ф)?і?/, validationOptionsMsg('Proper name is expected'))
  @IsOptional()
    code?: string;
  
  @ApiPropertyOptional({
    description: 'Captain id',
  })
  @IsOptional()
    captainId?: string;
  
  @ApiPropertyOptional({
    description: 'Moderator ids',
  })
  @IsOptional()
    moderatorIds?: string[];
  
  @ApiPropertyOptional({
    description: 'Educational program id',
  })
  @IsOptional()
    eduProgramId?: string;
  
  @ApiPropertyOptional({
    description: 'Cathedra id',
  })
  @IsOptional()
    cathedraId?: string;
  
  @ApiPropertyOptional({
    description: 'Year of admission',
  })
  @IsOptional()
  @IsNumber(undefined, validationOptionsMsg('Admission year must be a number'))
    admissionYear?: number;
}