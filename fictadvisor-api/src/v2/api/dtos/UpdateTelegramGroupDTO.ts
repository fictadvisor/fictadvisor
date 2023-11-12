import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { TelegramSource } from '@prisma/client';

export class UpdateTelegramGroupDTO {
  @ApiPropertyOptional({
    description: 'Telegram chat id',
  })
  @IsNumber({}, validationOptionsMsg('TelegramId is not a number'))
  @IsOptional()
    telegramId?: bigint;

  @ApiPropertyOptional({
    enum: TelegramSource,
    description: 'Type of telegram chat',
  })
  @IsEnum(TelegramSource, validationOptionsMsg('Source is not an enum'))
  @IsOptional()
    source?: TelegramSource;

  @ApiPropertyOptional({
    description: 'Thread id',
  })
  @IsNumber({}, validationOptionsMsg('ThreadId is not a number'))
  @IsOptional()
    threadId?: bigint;

  @ApiPropertyOptional({
    description: 'Whether to write messages about classes',
  })
  @IsOptional()
  @IsBoolean(validationOptionsMsg('PostInfo is not a boolean'))
    postInfo?: boolean;
}