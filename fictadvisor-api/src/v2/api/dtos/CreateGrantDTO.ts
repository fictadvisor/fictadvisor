import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { Type } from 'class-transformer';

export class CreateGrantDTO {
  @ApiProperty({
    description: 'A string that specifies the permission itself',
  })
  @IsNotEmpty(validationOptionsMsg('Permission cannot be empty'))
  @MinLength(3, validationOptionsMsg('Permission can not be less then 3 chars'))
  @MaxLength(200, validationOptionsMsg('Permission can not be longer then 200 chars'))
    permission: string;

  @ApiPropertyOptional({
    description: 'Established right or not',
    default: true,
  })
  @IsBoolean(validationOptionsMsg('Set is not a boolean'))
  @IsOptional()
    set?: boolean;

  @ApiProperty({
    description: 'The priority or importance of the grant',
    default: 1,
  })
  @IsNumber({}, validationOptionsMsg('Weight is not a number'))
  @IsNotEmpty(validationOptionsMsg('Weight cannot be empty'))
  @Min(1, validationOptionsMsg('Weight can not be less then 1'))
  @Max(5000, validationOptionsMsg('Weight can not be bigger then 5000'))
    weight: number;
}

export class CreateGrantsDTO {
  @ApiPropertyOptional({
    type: [CreateGrantDTO],
    description: 'An array of grants of the role',
  })
  @Type(() => CreateGrantDTO)
  @ValidateNested({ each: true })
    grants: CreateGrantDTO[];
}