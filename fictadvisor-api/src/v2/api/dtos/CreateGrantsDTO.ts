import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { Type } from 'class-transformer';

export class CreateGrantDTO {
  @ApiProperty({
    description: 'A string that specifies the permission itself',
  })
  @IsNotEmpty(validationOptionsMsg('Permission cannot be empty'))
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