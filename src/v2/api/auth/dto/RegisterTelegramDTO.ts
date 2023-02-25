import { IsNotEmpty } from 'class-validator';

export class RegisterTelegramDTO {
  @IsNotEmpty()
    token: string;

  @IsNotEmpty()
    telegramId: number;
}