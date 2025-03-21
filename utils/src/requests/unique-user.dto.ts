import { IsOptional } from 'class-validator';

export class UniqueUserDTO {
  @IsOptional()
    telegramId?: number;

  @IsOptional()
    email?: string;

  @IsOptional()
    username?: string;

  @IsOptional()
    id?: string;
}