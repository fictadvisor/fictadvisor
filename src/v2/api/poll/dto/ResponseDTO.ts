import { IsNotEmpty } from 'class-validator';

export class ResponseDTO {
  @IsNotEmpty()
    questionId: string;
  
  @IsNotEmpty()
    value: string;
  
  @IsNotEmpty()
    userId: string;
}