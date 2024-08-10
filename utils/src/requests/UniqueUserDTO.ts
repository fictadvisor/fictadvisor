import { IsOptional } from 'class-validator';

export class UniqueUserDTO {
  @IsOptional()
    telegramId?: number;

  @IsOptional()
    googleId?: string;

  @IsOptional()
    email?: string;

  @IsOptional()
    username?: string;

  @IsOptional()
    id?: string;
}
