import { IsEmpty, MaxLength, MinLength } from "class-validator";

export class CreateSubjectDTO {
  @MinLength(5, {
    message: 'Name is too short (min: 5)',
  })
  @MaxLength(150, {
    message: 'Name is too long (max: 150)',
  })
  @IsEmpty({
    message: 'Name can not be empty',
  })
  name: string;
}