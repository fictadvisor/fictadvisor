import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBooleanString, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class GeneralEventFiltrationDTO {
  @ApiPropertyOptional({
    description: 'Visualization parameter: show lectures',
  })
  @IsOptional()
  @IsBooleanString(validationOptionsMsg('addLecture must be a boolean string'))
    addLecture?: boolean;

  @ApiPropertyOptional({
    description: 'Visualization parameter: show laboratories',
  })
  @IsOptional()
  @IsBooleanString(validationOptionsMsg('addLaboratory must be a boolean string'))
    addLaboratory?: boolean;

  @ApiPropertyOptional({
    description: 'Visualization parameter: show practices',
  })
  @IsOptional()
  @IsBooleanString(validationOptionsMsg('addPractice must be a boolean string'))
    addPractice?: boolean;
}
