import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty } from '@nestjs/swagger';

export class AttachSelectiveDisciplinesDTO {
  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Array can not be empty'))
    disciplines: string[];
}