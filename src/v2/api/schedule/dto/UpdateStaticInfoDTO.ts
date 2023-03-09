import { validationOptionsMsg } from '../../../utils/GLOBALS';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateStaticInfoDTO {
  @IsOptional()
    startTime?: Date;

  @IsOptional()
    endTime?: Date;

  @IsOptional()
    teachersId?: string[];

  @IsOptional()
    url?: string;

  @IsNotEmpty(validationOptionsMsg('Resource can\'t be empty'))
    resource?: string;

  @IsNotEmpty(validationOptionsMsg('Evaluating system can\'t be empty'))
    evaluatingSystem?: string;

  @IsBoolean()
    isSelective: boolean;
}