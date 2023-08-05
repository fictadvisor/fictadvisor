import { FullNameDTO } from './FullNameDTO';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
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
  @IsNotEmpty(validationOptionsMsg('Action cannot be empty'))
    action: EntrantActions;
}