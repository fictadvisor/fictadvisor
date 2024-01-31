import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class QueryAllPageTextsDTO {
    @ApiProperty({
      description: 'Keys of necessary page texts',
    })
    @IsNotEmpty(validationOptionsMsg('Keys can not be empty'))
      keys: string[];
}