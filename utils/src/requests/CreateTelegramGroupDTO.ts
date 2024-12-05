import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';
import { TelegramSource } from '../enums';

export class CreateTelegramGroupDTO {
  @ApiProperty({
    description: 'Telegram chat id',
  })
  @IsNotEmpty(validationOptionsMsg('TelegramId can not be empty'))
  @IsNumber({}, validationOptionsMsg('TelegramId must be a number'))
    telegramId: bigint;

  @ApiProperty({
    enum: TelegramSource,
    description: 'Type of telegram chat',
  })
  @IsEnum(TelegramSource, validationOptionsMsg('Source must be an enum'))
  @IsNotEmpty(validationOptionsMsg('Source can not be empty'))
    source: TelegramSource;

  @ApiPropertyOptional({
    description: 'Telegram group thread id',
  })
  @IsNumber({}, validationOptionsMsg('ThreadId must be a number'))
  @IsOptional()
    threadId?: bigint;

  @ApiProperty({
    description: 'Whether to write messages about classes',
  })
  @IsNotEmpty(validationOptionsMsg('PostInfo can not be empty'))
  @IsBoolean(validationOptionsMsg('PostInfo must be a boolean'))
    postInfo: boolean;
}
