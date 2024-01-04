import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterTelegramDTO {
  @ApiProperty()
  @IsNotEmpty()
    token: string;

  @ApiProperty()
  @IsNotEmpty()
    telegramId: number;
}