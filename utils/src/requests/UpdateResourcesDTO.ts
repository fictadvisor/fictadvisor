import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';
import { UpdateResourceDTO } from './UpdateResourceDTO';

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


