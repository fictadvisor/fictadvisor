import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { FullNameDTO } from './FullNameDTO';

export class FullNameWithSpecialtyDTO extends FullNameDTO {
  @ApiProperty()
  @IsNotEmpty()
    specialty: string;
}