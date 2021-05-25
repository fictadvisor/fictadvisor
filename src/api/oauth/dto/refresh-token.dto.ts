import { Expose } from 'class-transformer';

export class RefreshTokenDto {
  @Expose({ name: 'refresh_token' })
  refreshToken: string;
}
