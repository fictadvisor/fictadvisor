import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GoogleConfigService } from '../../config/GoogleConfigService';
import { AuthTokenResponse } from '../types/auth/AuthTokenResponse';
import { AccessTokenInfoResponse } from '../types/auth/AccessTokenInfoResponse';
import { RefreshTokenResponse } from '../types/auth/RefreshTokenResponse';


const TOKENINFO_URL = 'https://oauth2.googleapis.com/tokeninfo';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';

@Injectable()
export class GoogleAuthAPI {
  constructor (
    private config: GoogleConfigService,
  ) {}

  async getIdTokenInfo (idToken: string) {
    const { data } = await axios.get(TOKENINFO_URL, {
      params: {
        id_token: idToken,
      },
    });
    return data;
  }

  async getAccessTokenInfo (accessToken: string): Promise<AccessTokenInfoResponse> {
    const { data } = await axios.get<AccessTokenInfoResponse>(TOKENINFO_URL, {
      params: {
        access_token: accessToken,
      },
    });
    return data;
  }

  async getAuthTokens (authCode: string): Promise<AuthTokenResponse> {
    const params = {
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      redirect_uri: this.config.calendarCallbackUri,
      code: authCode,
      grant_type: 'authorization_code',
    };
    const { data } = await axios.post<AuthTokenResponse>(TOKEN_URL, null, {
      params,
    });
    return data;
  }

  async refreshAccessToken (refreshToken: string): Promise<RefreshTokenResponse> {
    const params = {
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    };
    const { data } = await axios.post<RefreshTokenResponse>(TOKEN_URL, null, {
      params,
    });
    return data;
  }
}
