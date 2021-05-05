import { IsEnum, IsOptional } from "class-validator";
import { SuperheroState } from "src/database/entities/superhero.entity";

export class UpdateSuperheroDto {
    @IsOptional()
    @IsEnum(SuperheroState)
    state: SuperheroState;
};
