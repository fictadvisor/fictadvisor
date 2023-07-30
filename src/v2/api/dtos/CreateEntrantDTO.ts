import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEntrantDTO {
  @IsOptional()
    username: string;

  @IsNotEmpty()
    firstName: string;

  @IsOptional()
    middleName: string;

  @IsNotEmpty()
    lastName: string;

  @IsOptional()
    telegramId: bigint;

  @IsOptional()
    email: string;

  @IsNotEmpty()
    speciality: string;

  @IsOptional()
    isDorm: boolean;

  @IsOptional()
    printedEdbo: boolean;
}