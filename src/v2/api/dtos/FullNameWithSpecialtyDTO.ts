import { FullNameDTO } from './FullNameDTO';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FullNameWithSpecialtyDTO extends FullNameDTO {
  @ApiProperty()
  @IsNotEmpty()
    specialty: string;
}