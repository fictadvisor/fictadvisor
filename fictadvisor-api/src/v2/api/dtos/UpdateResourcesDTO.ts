import { ApiProperty } from '@nestjs/swagger';
import { UpdateResourceDTO } from './UpdateResourceDTO';
import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';

export class UpdateResourcesDTOItem extends UpdateResourceDTO {
    @ApiProperty({
      description: 'Id of specific resource',
    })
    @IsNotEmpty({
      message: 'Resource id can not be empty',
    })
      id: string;
}

export class UpdateResourcesDTO {
    @ApiProperty({
      type: [UpdateResourcesDTOItem],
    })
    @IsNotEmpty(validationOptionsMsg('Resources can not be empty'))
      resources: UpdateResourcesDTOItem[];
}


