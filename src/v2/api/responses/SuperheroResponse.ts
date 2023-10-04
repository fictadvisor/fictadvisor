import { ApiProperty } from '@nestjs/swagger';
import { State } from '@prisma/client';

export class SuperheroResponse {
  @ApiProperty({
    description: 'Superhero\'s id',
  })
    userId: string;
  
  @ApiProperty({
    description: 'Whether the superhero is in dormintory or not',
  })
    dorm: boolean;

  @ApiProperty({
    description: 'State for superhero',
    enum: State,
  })
    state: State;
}