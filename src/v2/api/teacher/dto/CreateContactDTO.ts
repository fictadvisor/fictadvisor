import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateContactDTO {
  @MaxLength(20, {
    message: 'name is too long (max: 20)',
  })
  @IsNotEmpty({
    message: 'name can not be empty',
  })
    name: string;

  @MaxLength(100, {
    message: 'value is too long (max: 100)',
  })
  @IsNotEmpty({
    message: 'value can not be empty',
  })
    value: string;
}
