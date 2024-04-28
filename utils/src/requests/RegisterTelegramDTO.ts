import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class RegisterTelegramDTO {
  @ApiProperty({
    description: 'Token to verify user\'s telegram',
  })
  @IsNotEmpty(validationOptionsMsg('Token cannot be empty'))
    token: string;

  @ApiProperty({
    description: 'User\'s telegram id',
  })
  @IsNotEmpty(validationOptionsMsg('Telegram id cannot be empty'))
    telegramId: number;
}