export class AccessTokenInfoResponse {
  azp: string;
  aud: string;
  sub: string;
  scope: string;
  exp: string;
  expires_in: string;
  email: string;
  email_verified: 'true' | 'false';
  access_type: 'offline' | 'online';
}
