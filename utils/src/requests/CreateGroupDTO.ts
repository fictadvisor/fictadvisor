import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID, Matches } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class CreateGroupDTO {
  @ApiProperty({
    description: 'Code of the group to create',
  })
  @Matches(
    /І[МПКАСОВТ]-([зпв]|зп)?\d\d(мн|мп|ф)?і?/,
    validationOptionsMsg('Proper name is expected')
  )
  @IsNotEmpty(validationOptionsMsg('Code cannot be empty'))
  @IsString(validationOptionsMsg('Code must be a string'))
    code: string;
  
  @ApiProperty({
    description: 'Educational program id',  
  })
  @IsNotEmpty(validationOptionsMsg('Educational program id cannot be empty'))
  @IsString(validationOptionsMsg('Educational program must be a string'))
  @IsUUID(undefined, validationOptionsMsg('Educational program id must be UUID'))
    eduProgramId: string;
  
  @ApiProperty({
    description: 'Cathedra id',
  })
  @IsNotEmpty(validationOptionsMsg('Cathedra id cannot be empty'))
  @IsString(validationOptionsMsg('Cathedra id must be a string'))
  @IsUUID(undefined, validationOptionsMsg('Cathedra id must be UUID'))
    cathedraId: string;
  
  @ApiProperty({
    description: 'Year of admission',
  })
  @IsNumber(undefined, validationOptionsMsg('Admission year must be a number'))
  @IsNotEmpty(validationOptionsMsg('Admission year cannot be empty'))
    admissionYear: number;
}