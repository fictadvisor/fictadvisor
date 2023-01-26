import { IsOptional, MaxLength, MinLength } from "class-validator";

export class UpdateTeacherDTO {
    @MinLength(2, {
      message: 'firstName is too short (min: 2)',
    })
    @MaxLength(40, {
      message: 'firstName is too long (max: 40)',
    })
    @IsOptional()
    firstName?: string;

    @MinLength(2, {
      message: 'middleName is too short (min: 2)',
    })
    @MaxLength(40, {
      message: 'middleName is too long (max: 40)',
    })
    @IsOptional()
    middleName?: string;

    @MinLength(2, {
      message: 'lastName is too short (min: 2)',
    })
    @MaxLength(40, {
      message: 'lastName is too long (max: 40)',
    })
    @IsOptional()
    lastName?: string;

    @MaxLength(400, {
      message: 'description is too long (max: 400)',
    })
    @IsOptional()
    description?: string;

    @IsOptional()
    avatar?: string;
  }