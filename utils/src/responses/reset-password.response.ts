import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordResponse {
  @ApiProperty()
  token: string;
}
