import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { Type } from 'class-transformer';

export class CreateGrantDTO {
  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Permission can not be empty'))
    permission: string;

  @ApiPropertyOptional({
    default: true,
  })
  @IsBoolean(validationOptionsMsg('Set is not a boolean'))
  @IsOptional()
    set?: boolean;
}

export class CreateGrantsDTO {
  @ApiPropertyOptional({
    type: [CreateGrantDTO],
  })
  @Type(() => CreateGrantDTO)
  @ValidateNested({ each: true })
    grants: CreateGrantDTO[];
}