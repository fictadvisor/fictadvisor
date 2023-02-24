import { IsBoolean, IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class GroupRequestDTO {
    @IsNotEmpty(validationOptionsMsg('groupId can not be empty'))
      groupId: string;

    @IsBoolean()
    @IsNotEmpty(validationOptionsMsg('isCaptain can not be empty'))
      isCaptain: boolean;
}