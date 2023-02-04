import { IsBoolean, IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateSuperheroDto {
  @IsInt()
  @Min(1)
  @Max(5)
    year: number;

  @IsBoolean()
    dorm: boolean;

  @IsNotEmpty()
    username: string;

  @IsNotEmpty()
    name: string;
}
