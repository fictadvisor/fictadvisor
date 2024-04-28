import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GeneralEventFiltrationDTO {
  @ApiPropertyOptional({
    description: 'Visualization parameter: show lectures',
  })
  @IsOptional()
    addLecture?: boolean;

  @ApiPropertyOptional({
    description: 'Visualization parameter: show laboratories',
  })
  @IsOptional()
    addLaboratory?: boolean;

  @ApiPropertyOptional({
    description: 'Visualization parameter: show practices',
  })
  @IsOptional()
    addPractice?: boolean;
}
