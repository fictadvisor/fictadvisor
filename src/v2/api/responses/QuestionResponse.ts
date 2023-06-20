import { ApiProperty } from '@nestjs/swagger';
import { QuestionDisplay, QuestionType } from '@prisma/client';

export class QuestionResponse {
  @ApiProperty()
    id: string;
  
  @ApiProperty()
    category: string;
  
  @ApiProperty()
    name: string;
  
  @ApiProperty()
    description: string;
  
  @ApiProperty()
    text: string;
  
  @ApiProperty()
    isRequired: boolean;
  
  @ApiProperty()
    criteria: string;
  
  @ApiProperty({
    enum: QuestionType,
  })
    type: QuestionType;
  
  @ApiProperty({
    enum: QuestionDisplay,
  })
    display: QuestionDisplay;
}