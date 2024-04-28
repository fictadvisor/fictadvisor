import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class CreatePageTextDTO {
    @ApiProperty({
      description: 'Key of new page text',
    })
    @IsNotEmpty(validationOptionsMsg('Key can not be empty'))
      key: string;

    @ApiProperty({
      description: 'Value of new page text',
    })
    @IsNotEmpty(validationOptionsMsg('Value can not be empty'))
      value: string;

    @ApiPropertyOptional({
      description: 'Link for new page text',
    })
    @IsOptional()
      link?: string;

    @ApiPropertyOptional({
      description: 'Should new page text be shown',
    })
    @IsOptional()
      isShown?: boolean;
}