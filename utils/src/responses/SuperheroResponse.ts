import { ApiProperty } from '@nestjs/swagger';
import { State } from '../enums';

export class SuperheroResponse {
  @ApiProperty({
    description: 'Superhero\'s id',
  })
    userId: string;

  @ApiProperty({
    description: 'Whether the superhero is in dormitory or not',
  })
    dorm: boolean;

  @ApiProperty({
    description: 'State for superhero',
    enum: State,
  })
    state: State;
}
