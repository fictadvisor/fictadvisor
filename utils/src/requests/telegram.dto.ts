import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';

export class TelegramDTO {
  @ApiProperty({
    description: 'Date of authorization',
  })
  @IsNumber({}, validationOptionsMsg('Auth date must be a number'))
  @IsNotEmpty(validationOptionsMsg('Auth date cannot be empty'))
    auth_date: number;

  @ApiProperty({
    description: 'User\'s telegram firstName',
  })
  @IsString(validationOptionsMsg('First name must be a string'))
  @IsNotEmpty(validationOptionsMsg('First name cannot be empty'))
    first_name: string;

  @ApiProperty({
    description: 'Telegram hash',
  })
  @IsString(validationOptionsMsg('Hash must be a string'))
  @IsNotEmpty(validationOptionsMsg('Hash cannot be empty'))
    hash: string;

  @ApiProperty({
    description: 'User\'s telegram id',
  })
  @IsNumber({}, validationOptionsMsg('Telegram id must be a bigint'))
  @IsNotEmpty(validationOptionsMsg('Telegram id cannot be empty'))
    id: bigint;

  @ApiPropertyOptional({
    description: 'User\'s telegram lastName',
  })
  @IsOptional()
  @IsString(validationOptionsMsg('Last name must be a string'))
    last_name?: string;

  @ApiPropertyOptional({
    description: 'Link to user\'s telegram photo',
  })
  @IsOptional()
  @IsString(validationOptionsMsg('Photo url must be a string'))
    photo_url?: string;

  @ApiProperty({
    description: 'User\'s telegram username',
  })
  @IsString(validationOptionsMsg('Username must be a string'))
  @IsNotEmpty(validationOptionsMsg('Username cannot be empty'))
    username: string;

}
