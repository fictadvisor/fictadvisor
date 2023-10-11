import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TelegramDTO {
  @ApiProperty({
    description: 'Date of authorization',
  })
  @IsNumber({}, validationOptionsMsg('Auth date must be a number'))
    auth_date: number;

  @ApiProperty({
    description: 'User\'s telegram firstName',
  })
  @IsNotEmpty(validationOptionsMsg('First name cannot be empty'))
    first_name: string;

  @ApiProperty({
    description: 'Telegram hash',
  })
  @IsNotEmpty(validationOptionsMsg('Hash cannot be empty'))
    hash: string;

  @ApiProperty({
    description: 'User\'s telegram id',
  })
  @IsNumber({}, validationOptionsMsg('Telegram id must be a bigint'))
    id: bigint;

  @ApiPropertyOptional({
    description: 'User\'s telegram lastName',
  })
  @IsOptional()
    last_name?: string;

  @ApiPropertyOptional({
    description: 'Link to user\'s telegram photo',
  })
  @IsOptional()
    photo_url?: string;

  @ApiProperty({
    description: 'User\'s telegram username',
  })
  @IsNotEmpty(validationOptionsMsg('Username cannot be empty'))
    username: string;
}