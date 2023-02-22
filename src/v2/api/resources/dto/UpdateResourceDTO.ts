import { IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateResourceDTO {
  @MinLength(3, {
    message: 'name is too short (min: 3)',
  })
  @MaxLength(50, {
    message: 'name is too long (max: 50)',
  })
  @IsOptional()
    name: string;

  @IsOptional()
    link: string;

  @IsOptional()
    icon: string;
}