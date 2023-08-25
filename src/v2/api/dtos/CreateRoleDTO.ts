import { ApiProperty } from '@nestjs/swagger';
import { RoleName } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class CreateRoleDTO {
  @ApiProperty({ enum: RoleName })
  @IsEnum(RoleName, validationOptionsMsg('Name is not an enum'))
  @IsNotEmpty(validationOptionsMsg('Name can not be empty'))
    name: RoleName;

  @ApiProperty()
  @IsNumber({}, validationOptionsMsg('Weight is not a number'))
  @IsNotEmpty(validationOptionsMsg('Weight can not be empty'))
    weight: number;
}