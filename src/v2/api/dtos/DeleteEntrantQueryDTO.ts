import { FullNameDTO } from './FullNameDTO';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export enum EntrantActions {
  PRIORITY = 'priority',
  CONTRACT = 'contract',
  ENTRANT = 'entrant',
}

export class DeleteEntrantQueryDTO extends FullNameDTO {
  @ApiProperty({
    enum: EntrantActions,
  })
  @IsEnum(EntrantActions, validationOptionsMsg('Action priority must be an enum'))
  @IsNotEmpty(validationOptionsMsg('Action cannot be empty'))
    action: EntrantActions;
}