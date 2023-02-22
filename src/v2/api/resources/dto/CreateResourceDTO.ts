import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateResourceDTO {
  @MinLength(3, {
    message: 'name is too short (min: 3)',
  })
  @MaxLength(50, {
    message: 'name is too long (max: 50)',
  })
  @IsNotEmpty({
    message: 'name can not be empty',
  })
    name: string;

  @IsNotEmpty({
    message: 'link can not be empty',
  })
    link: string;

  @IsNotEmpty({
    message: 'icon can not be empty',
  })
    icon: string;
}