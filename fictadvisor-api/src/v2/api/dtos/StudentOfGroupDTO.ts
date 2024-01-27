import { IsNotEmpty } from 'class-validator';

export class StudentOfGroupDTO {
  @IsNotEmpty()
    groupId: string;
  
  @IsNotEmpty()
    userId: string;
}