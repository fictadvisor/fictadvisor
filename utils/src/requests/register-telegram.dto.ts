import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';

export class RegisterTelegramDTO {
  @ApiProperty({
    description: 'Token to verify user\'s telegram',
  })
  @IsString(validationOptionsMsg('Token should be string'))
  @IsNotEmpty(validationOptionsMsg('Token cannot be empty'))
    token: string;

  @ApiProperty({
    description: 'User\'s telegram id',
  })
  @IsNumber({}, validationOptionsMsg('Telegram should be number'))
  @IsNotEmpty(validationOptionsMsg('Telegram id cannot be empty'))
    telegramId: number;
}
