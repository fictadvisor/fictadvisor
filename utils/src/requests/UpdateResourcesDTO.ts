import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';
import { UpdateResourceDTO } from './UpdateResourceDTO';
import { Type } from 'class-transformer';

export class UpdateResourcesDTOItem extends UpdateResourceDTO {
  @ApiProperty({
    description: 'Id of specific resource',
  })
  @IsUUID(undefined, validationOptionsMsg('Resource id must be UUID'))
  @IsNotEmpty(validationOptionsMsg('Resource id can not be empty'))
    id: string;
}

export class UpdateResourcesDTO {
  @ApiProperty({
    type: [UpdateResourcesDTOItem],
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateResourcesDTOItem)
  @IsArray(validationOptionsMsg('Resources must be an array'))
  @IsNotEmpty(validationOptionsMsg('Resources can not be empty'))
    resources: UpdateResourcesDTOItem[];
}