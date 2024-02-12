import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { DeleteCommentDTO } from './DeleteCommentDTO';

export class UpdateCommentDTO extends DeleteCommentDTO {
  @ApiProperty({
    description: 'New comment value',
  })
  @IsNotEmpty(validationOptionsMsg('Comment should not be empty'))
  @IsString(validationOptionsMsg('Comment must be a string'))
  @MinLength(4, validationOptionsMsg('Comment is too short (min: 4)'))
  @MaxLength(4000, validationOptionsMsg('Comment is too long (max: 4000)'))
    comment: string;
}