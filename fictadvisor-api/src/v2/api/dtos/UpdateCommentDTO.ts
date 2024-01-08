import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { DeleteCommentDTO } from './DeleteCommentDTO';

export class UpdateCommentDTO extends DeleteCommentDTO {
  @ApiProperty({
    description: 'New comment value',
  })
  @IsNotEmpty(validationOptionsMsg('Comment should not be empty'))
  @IsString(validationOptionsMsg('Comment must be a string'))
    comment: string;
}