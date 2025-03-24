import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';

export class UpdateGrantDTO {
  @ApiPropertyOptional({
    description: 'A string that specifies the permission itself',
  })
  @IsOptional()
  @IsString(validationOptionsMsg('Permission must be a string'))
  @MinLength(3, validationOptionsMsg('Permission can not be less then 3 chars'))
  @MaxLength(200, validationOptionsMsg('Permission can not be longer then 200 chars'))
    permission?: string;

  @ApiPropertyOptional({
    description: 'Established right or not',
  })
  @IsOptional()
  @IsBoolean(validationOptionsMsg('Set must be boolean'))
    set?: boolean;

  @ApiPropertyOptional({
    description: 'The priority or importance of the grant',
  })
  @IsOptional()
  @IsNumber({}, validationOptionsMsg('Weight must be a number'))
  @Min(1, validationOptionsMsg('Weight can not be less then 1'))
  @Max(5000, validationOptionsMsg('Weight can not be bigger then 5000'))
    weight?: number;
}
