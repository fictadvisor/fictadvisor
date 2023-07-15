import { ApiProperty } from '@nestjs/swagger';
import { State } from '@prisma/client';

export class CaptainResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    email: string;

  @ApiProperty()
    username: string;

  @ApiProperty()
    avatar: string;

  @ApiProperty()
    password: string;

  @ApiProperty()
    telegramId?: number;

  @ApiProperty()
    lastPasswordChanged: string;

  @ApiProperty({
    enum: State,
  })
    state: State;
}
