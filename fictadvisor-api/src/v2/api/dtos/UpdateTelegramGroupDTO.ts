import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { TelegramSource } from '@prisma/client';

export class UpdateTelegramGroupDTO {
  @ApiPropertyOptional()
  @IsNumber({}, validationOptionsMsg('TelegramId is not a number'))
  @IsOptional()
    telegramId?: bigint;

  @ApiPropertyOptional({
    enum: TelegramSource,
  })
  @IsEnum(TelegramSource, validationOptionsMsg('Source is not an enum'))
  @IsOptional()
    source?: TelegramSource;

  @ApiPropertyOptional()
  @IsNumber({}, validationOptionsMsg('ThreadId is not a number'))
  @IsOptional()
    threadId?: bigint;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean(validationOptionsMsg('PostInfo is not a boolean'))
    postInfo?: boolean;
}