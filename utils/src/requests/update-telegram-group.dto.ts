import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';
import { TelegramSource } from '../enums';

export class UpdateTelegramGroupDTO {
  @ApiPropertyOptional({
    description: 'Telegram chat id',
  })
  @IsNumber({}, validationOptionsMsg('TelegramId must be a number'))
  @IsOptional()
    telegramId?: bigint;

  @ApiPropertyOptional({
    enum: TelegramSource,
    description: 'Type of telegram chat',
  })
  @IsEnum(TelegramSource, validationOptionsMsg('Source must be an enum'))
  @IsOptional()
    source?: TelegramSource;

  @ApiPropertyOptional({
    description: 'Thread id',
  })
  @IsNumber({}, validationOptionsMsg('ThreadId must be a number'))
  @IsOptional()
    threadId?: bigint;

  @ApiPropertyOptional({
    description: 'Whether to write messages about classes',
  })
  @IsOptional()
  @IsBoolean(validationOptionsMsg('PostInfo must be a boolean'))
    postInfo?: boolean;
}
