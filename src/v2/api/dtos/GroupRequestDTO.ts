import { IsBoolean, IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class GroupRequestDTO {
  @IsNotEmpty(validationOptionsMsg('Group id can not be empty'))
    groupId: string;

  @IsBoolean(validationOptionsMsg('IsCaptain is not a number'))
  @IsNotEmpty(validationOptionsMsg('IsCaptain can not be empty'))
    isCaptain: boolean;
}