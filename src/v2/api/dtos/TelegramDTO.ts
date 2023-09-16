import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TelegramDTO {
  @ApiProperty()
  @IsNumber()
    auth_date: number;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('first_name can not be empty'))
    first_name: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('hash can not be empty'))
    hash: string;

  @ApiProperty()
  @IsNumber()
    id: bigint;

  @ApiPropertyOptional()
  @IsOptional()
    last_name: string;

  @ApiPropertyOptional()
  @IsOptional()
    photo_url: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('username can not be empty'))
    username: string;
}