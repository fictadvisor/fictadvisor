import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';
import { FullNameWithSpecialtyDTO } from './FullNameWithSpecialtyDTO';
import { EntrantActions } from '../enums/other/EntrantActionsEnum';

export class DeleteEntrantDataQueryDTO extends FullNameWithSpecialtyDTO {
  @ApiProperty({
    enum: EntrantActions,
  })
  @IsNotEmpty(validationOptionsMsg('Action cannot be empty'))
    action: EntrantActions;
}