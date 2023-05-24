import { IsBoolean, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { Type } from 'class-transformer';

export class CreateGrantsDTO {
  @Type(() => CreateGrantDTO)
  @ValidateNested({ each: true })
    grants: CreateGrantDTO[];
}

export class CreateGrantDTO {
  @IsNotEmpty(validationOptionsMsg('Permission can not be empty'))
    permission: string;

  @IsBoolean(validationOptionsMsg('Set is not a boolean'))
  @IsOptional()
    set?: boolean;
}