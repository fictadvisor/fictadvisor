import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { UpdateTelegramGroupDTO } from './UpdateTelegramGroupDTO';

export class CreateTelegramGroupDTO extends UpdateTelegramGroupDTO {
  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('TelegramId can not be empty'))
  @IsNumber({}, validationOptionsMsg('TelegramId is not a number'))
    telegramId: bigint;
}