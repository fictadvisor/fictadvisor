import { State } from '@prisma/client';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDTO {
  @MinLength(4, {
    message: 'username is too short (min: 4)',
  })
  @MaxLength(30, {
    message: 'username is too long (max: 30)',
  })
  @IsNotEmpty({
    message: 'username can not be empty',
  })
  @IsOptional()
    username?: string;

  @IsOptional()
    state?: State;

  @IsOptional()
    lastPasswordChanged?: Date;

  @MinLength(7, {
    message: 'password is too short (min: 7)',
  })
  @MaxLength(50, {
    message: 'password is too long (max: 50)',
  })
  @IsOptional()
    password?: string;

  @MaxLength(400, {
    message: 'avatar link is too long (max: 400)',
  })
  @IsOptional()
    avatar?: string;
}
