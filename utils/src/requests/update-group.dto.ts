import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, IsUUID, Matches } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';

export class UpdateGroupDTO {
  @ApiPropertyOptional({
    description: 'New group code',
  })
  @Matches(/І[МПКАСОВТ]-([зпв]|зп)?\d\d(мн|мп|ф)?і?/, validationOptionsMsg('Proper name is expected'))
  @IsOptional()
  @IsString(validationOptionsMsg('Code must be a string'))
    code?: string;

  @ApiPropertyOptional({
    description: 'Captain id',
  })
  @IsString(validationOptionsMsg('Captain id must be a string'))
  @IsUUID(undefined, validationOptionsMsg('Captain id must be UUID'))
  @IsOptional()
    captainId?: string;
  
  @ApiPropertyOptional({
    description: 'Moderator ids',
  })
  @IsArray(validationOptionsMsg('Moderator ids must be an array'))
  @IsString(validationOptionsMsg('Moderator id must be a string', true))
  @IsUUID(undefined, validationOptionsMsg('Moderator id must be UUID', true))
  @IsOptional()
    moderatorIds?: string[];
  
  @ApiPropertyOptional({
    description: 'Educational program id',
  })
  @IsString(validationOptionsMsg('Educational program id must be a string'))
  @IsUUID(undefined, validationOptionsMsg('Educational program id must be UUID'))
  @IsOptional()
    eduProgramId?: string;
  
  @ApiPropertyOptional({
    description: 'Cathedra id',
  })
  @IsString(validationOptionsMsg('Cathedra id must be a string'))
  @IsUUID(undefined, validationOptionsMsg('Cathedra id must be UUID'))
  @IsOptional()
    cathedraId?: string;
  
  @ApiPropertyOptional({
    description: 'Year of admission',
  })
  @IsOptional()
  @IsNumber(undefined, validationOptionsMsg('Admission year must be a number'))
    admissionYear?: number;
}
