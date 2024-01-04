import { ApiProperty } from '@nestjs/swagger';
import { State } from '@prisma/client';

export class CaptainResponse {
  @ApiProperty({
    description: 'Id of a specific captain',
  })
    id: string;

  @ApiProperty({
    description: 'Email of a specific captain',
  })
    email: string;

  @ApiProperty({
    description: 'Username of a specific captain',
  })
    username: string;

  @ApiProperty({
    description: 'Link to the captain\'s avatar image',
  })
    avatar: string;

  @ApiProperty({
    description: 'Password of a specific captain',
  })
    password: string;

  @ApiProperty({
    description: 'Captain\'s telegram id',
  })
    telegramId: number;

  @ApiProperty({
    description: 'Date when the recent password change',
  })
    lastPasswordChanged: string;

  @ApiProperty({
    enum: State,
    description: 'State whether captain is verified',
  })
    state: State;
}
