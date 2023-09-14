import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { TelegramSource } from '@prisma/client';

export class CreateTelegramGroupDTO {
  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('TelegramId can not be empty'))
  @IsNumber({}, validationOptionsMsg('TelegramId is not a number'))
    telegramId: bigint;

  @ApiProperty({
    enum: TelegramSource,
  })
  @IsEnum(TelegramSource, validationOptionsMsg('Source is not an enum'))
  @IsNotEmpty(validationOptionsMsg('Source can not be empty'))
    source: TelegramSource;

  @ApiPropertyOptional()
  @IsNumber({}, validationOptionsMsg('ThreadId is not a number'))
  @IsOptional()
    threadId?: bigint;
}