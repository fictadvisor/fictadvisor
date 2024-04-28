import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Matches } from 'class-validator';
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
    code: string;
  
  @ApiProperty({
    description: 'Educational program id',  
  })
  @IsNotEmpty(validationOptionsMsg('Educatioal program id cannot be empty'))
    eduProgramId: string;
  
  @ApiProperty({
    description: 'Cathedra id',
  })
  @IsNotEmpty(validationOptionsMsg('Cathedra id cannot be empty'))
    cathedraId: string;
  
  @ApiProperty({
    description: 'Year of admission',
  })
  @IsNumber(undefined, validationOptionsMsg('Admission year must be a number'))
  @IsNotEmpty(validationOptionsMsg('Admission year cannot be empty'))
    admissionYear: number;
}