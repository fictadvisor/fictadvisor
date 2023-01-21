import { IsEnum, IsOptional } from 'class-validator';
import { SuperheroState } from 'src/v1/database/entities/superhero.entity';

export class UpdateSuperheroDto {
  @IsOptional()
  @IsEnum(SuperheroState)
  state: SuperheroState;
}
