import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { FullNameWithSpecialtyDTO } from './FullNameWithSpecialtyDTO';

export enum EntrantActions {
  PRIORITY = 'priority',
  CONTRACT = 'contract',
  ENTRANT = 'entrant',
}

export class DeleteEntrantDataQueryDTO extends FullNameWithSpecialtyDTO {
  @ApiProperty({
    enum: EntrantActions,
  })
  @IsNotEmpty(validationOptionsMsg('Action cannot be empty'))
    action: EntrantActions;
}