import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class UpdatePageTextDTO {
    @ApiProperty({
      description: 'Key of specific page text',
    })
    @IsNotEmpty(validationOptionsMsg('Key can not be empty'))
      key: string;

    @ApiPropertyOptional({
      description: 'Value of page text',
    })
    @IsOptional()
      value?: string;

    @ApiPropertyOptional({
      description: 'Link for page text',
    })
    @IsOptional()
      link?: string;

    @ApiPropertyOptional({
      description: 'Should page text be shown',
    })
    @IsOptional()
      isShown?: boolean;
}

export class UpdatePageTextsDTO {
    @ApiProperty({
      type: [UpdatePageTextDTO],
    })
    @IsNotEmpty(validationOptionsMsg('PageTexts can not be empty'))
      pageTexts: UpdatePageTextDTO[];
}