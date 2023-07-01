import { ApiProperty } from '@nestjs/swagger';
import { State } from '@prisma/client';

export class UserResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    username: string;

  @ApiProperty()
    email: string;

  @ApiProperty()
    telegramId?: number;

  @ApiProperty()
    avatar: string;

  @ApiProperty({
    enum: State,
  })
    state: State;
}
