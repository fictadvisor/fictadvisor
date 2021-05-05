import { assign } from "src/common/common.object";
import { Superhero, SuperheroState } from "src/database/entities/superhero.entity";

export class SuperheroDto {
    name: string;

    username: string;

    year: number;

    dorm: boolean;

    state: SuperheroState;

    image: string;

    public static from(h: Superhero) {
        return assign(
            new SuperheroDto(),
            {
                name: h.name,
                username: h.username,
                year: h.year,
                dorm: h.dorm,
                state: h.state,
                image: h.user?.image ?? '/assets/avatar.png',
            }
        );
    }
};
