import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateQueueDTO {
  @IsNotEmpty()
  @MinLength(1)
    name: string;
}
