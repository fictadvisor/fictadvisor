import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { TelegramSource } from '@prisma/client';

export class UpdateTelegramGroupDTO {
  @ApiProperty({
    enum: TelegramSource,
  })
  @IsNotEmpty(validationOptionsMsg('Source can not be empty'))
  @IsEnum(TelegramSource, validationOptionsMsg('Source is not an enum'))
    source: TelegramSource;
}