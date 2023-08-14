import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { GeneralEventFiltrationDTO } from './GeneralEventFiltrationDTO';

export class EventFiltrationDTO extends GeneralEventFiltrationDTO {
  @ApiPropertyOptional({
    description: 'Visualization parameter: show selected disciplines',
  })
  @IsOptional()
    isOwnSelected?: boolean;

  @ApiPropertyOptional({
    description: 'Visualization parameter: show other events',
  })
  @IsOptional()
    otherEvents?: boolean;
}
