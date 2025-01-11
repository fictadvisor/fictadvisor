import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBooleanString, IsOptional } from 'class-validator';
import { GeneralEventFiltrationDTO } from './GeneralEventFiltrationDTO';
import { validationOptionsMsg } from '../ValidationUtil';

export class EventFiltrationDTO extends GeneralEventFiltrationDTO {
  @ApiPropertyOptional({
    description: 'Visualization parameter: show selected disciplines',
  })
  @IsOptional()
  @IsBooleanString(validationOptionsMsg('showOwnSelective must be a boolean string'))
    showOwnSelective?: boolean;

  @ApiPropertyOptional({
    description: 'Visualization parameter: show other events',
  })
  @IsOptional()
  @IsBooleanString(validationOptionsMsg('addOtherEvents must be a boolean string'))
    addOtherEvents?: boolean;
}
