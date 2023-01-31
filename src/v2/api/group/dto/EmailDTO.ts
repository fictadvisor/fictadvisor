import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class EmailDTO {
  @MinLength(1, {
    message: 'empty list (min: 1)',
  })
  @MaxLength(50, {
    message: 'too much students (max: 50)',
  })
  @IsEmail({}, {
    each: true,
    message: 'one of emails is not email',
  })
    emails: string[];
}
