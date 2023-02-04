import { Expose } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class OAuthTelegramDto {
  @IsInt()
  @Expose({ name: 'telegram_id' })
    telegramId: number;

  @Expose({ name: 'first_name' })
    firstName: string;

  @IsOptional()
  @Expose({ name: 'last_name' })
    lastName?: string;

  @IsOptional()
  @Expose({ name: 'username' })
    username?: string;

  @IsOptional()
    image?: string;
}
