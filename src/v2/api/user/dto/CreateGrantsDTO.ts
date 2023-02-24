import { IsBoolean, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';
import { Type } from 'class-transformer';
import { CreateAnswerDTO } from '../../teacher/dto/CreateAnswersDTO';

export class CreateGrantsDTO {
  @Type(() => CreateAnswerDTO)
  @ValidateNested({ each: true })
    grants: CreateGrantDTO[];
}

export class CreateGrantDTO {
  @IsNotEmpty(validationOptionsMsg('permission can not be empty'))
    permission: string;

  @IsBoolean()
  @IsOptional()
    set?: boolean;
}