import { IsBoolean } from 'class-validator';

export class CreateSuperheroDTO {
  @IsBoolean()
    dorm: boolean;
}