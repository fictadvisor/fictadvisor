import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { validationOptionsMsg } from '../ValidationUtil';

export class CreateGrantDTO {
  @ApiProperty({
    description: 'A string that specifies the permission itself',
  })
  @IsNotEmpty(validationOptionsMsg('Permission cannot be empty'))
  @IsString(validationOptionsMsg('Permission must be a string'))
  @MinLength(3, validationOptionsMsg('Permission must be more then 3 chars'))
  @MaxLength(200, validationOptionsMsg('Permission must be less then 200 chars'))
    permission: string;

  @ApiPropertyOptional({
    description: 'Established right or not',
    default: true,
  })
  @IsBoolean(validationOptionsMsg('Set must be a boolean'))
  @IsOptional()
    set?: boolean;

  @ApiProperty({
    description: 'The priority or importance of the grant',
    default: 1,
  })
  @IsNumber({}, validationOptionsMsg('Weight must be a number'))
  @IsNotEmpty(validationOptionsMsg('Weight cannot be empty'))
  @Min(1, validationOptionsMsg('Weight must be more then 1'))
  @Max(5000, validationOptionsMsg('Weight must be less then 5000'))
    weight: number;
}

export class CreateGrantsDTO {
  @ApiProperty({
    type: [CreateGrantDTO],
    description: 'An array of grants of the role',
  })
  @Type(() => CreateGrantDTO)
  @ValidateNested(validationOptionsMsg('Grants must be an array of CreateGrantDTO', true))
    grants: CreateGrantDTO[];
}
