import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';
import { DeleteCommentDTO } from './delete-comment.dto';

export class UpdateCommentDTO extends DeleteCommentDTO {
  @ApiProperty({
    description: 'New comment value',
  })
  @IsNotEmpty(validationOptionsMsg('Comment cannot be empty'))
  @IsString(validationOptionsMsg('Comment must be a string'))
  @MinLength(4, validationOptionsMsg('Comment is too short (min: 4)'))
  @MaxLength(4000, validationOptionsMsg('Comment is too long (max: 4000)'))
    comment: string;
}
