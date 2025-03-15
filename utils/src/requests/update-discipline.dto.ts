import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';

export class UpdateDisciplineDTO {
  @ApiPropertyOptional({
    description: 'isSelective property of discipline',
  })
  @IsBoolean(validationOptionsMsg('isSelective property must be boolean'))
  @IsOptional()
    isSelective?: boolean;
}
