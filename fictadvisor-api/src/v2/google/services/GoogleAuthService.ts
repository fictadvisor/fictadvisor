import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';
import { GoogleConfigService } from '../../config/GoogleConfigService';
import { UserRepository } from '../../database/repositories/UserRepository';
import { GoogleUserPayload } from '../types/auth/GoogleUserPayload';
import { DbUser } from '../../database/entities/DbUser';
import { PrismaService } from '../../database/PrismaService';
import { GoogleAuthError } from '@fictadvisor/utils/enums';
import { GoogleAuthAPI } from '../apis/GoogleAuthAPI';
import { SecurityConfigService } from '../../config/SecurityConfigService';
import { AuthTokenResponse } from '../types/auth/AuthTokenResponse';
import { GoogleUserRepository } from '../../database/repositories/GoogleUserRepository';
import { GoogleNotLinkedException } from '../../utils/exceptions/GoogleNotLinkedException';

// Google variables
const AUTH_BASE_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const TRUSTED_ISSUERS = ['https://accounts.google.com', 'accounts.google.com'];
const CALENDAR_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'openid',
  'https://www.googleapis.com/auth/calendar',
];
// Encryption variables
const IV_BYTES = 16;
const KEY_BYTES = 16;

@Injectable()
export class GoogleAuthService {
  constructor (
    private googleConfig: GoogleConfigService,
    private securityConfig: SecurityConfigService,
    private authAPI: GoogleAuthAPI,
    private userRepository: UserRepository,
    private googleUserRepository: GoogleUserRepository,
    private prisma: PrismaService,
  ) {}

  async isIdTokenValid (idToken): Promise<boolean> {
    try {
      await this.authAPI.getIdTokenInfo(idToken);
    } catch (e) {
      return false;
    }

    const { aud, iss } = this.getUserPayload(idToken);

    return (aud === this.googleConfig.clientId) && TRUSTED_ISSUERS.includes(iss);
  }

  getUserPayload (idToken): GoogleUserPayload {
    const payloadB64Url = idToken.split('.')[1];
    const base64 = payloadB64Url.replace(/-/g, '+').replace(/_/g, '/');
    const plainText = Buffer.from(base64, 'base64').toString();

    return JSON.parse(plainText);
  }

  async getAuthUrl (user: DbUser, redirectUri: string, scopes: string[]): Promise<string> {
    const tokenRepo = this.prisma.googleStateToken;
    let token = await tokenRepo.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (!token) {
      token = await tokenRepo.create({
        data: {
          userId: user.id,
        },
      });
    }

    const params = {
      client_id: this.googleConfig.clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: scopes.join(' '),
      access_type: 'offline',
      include_granted_scopes: 'true',
      login_hint: user.googleId,
      state: token.token,
    };
    const query = new URLSearchParams(params);
    return `${AUTH_BASE_URL}?${query.toString()}`;
  }

  async getCalendarUrl (user: DbUser): Promise<string> {
    return this.getAuthUrl(user, this.googleConfig.calendarCallbackUri, CALENDAR_SCOPES);
  }

  async saveCalendarTokens (user: DbUser, authCode?: string, error?: string): Promise<GoogleAuthError | undefined> {
    if (error) return error as GoogleAuthError;

    return await this.exchangeCodeForTokens(user, authCode, CALENDAR_SCOPES);
  }

  async exchangeCodeForTokens (user: DbUser, authCode: string, requiredScopes: string[]): Promise<GoogleAuthError | undefined> {
    let tokenResponse: AuthTokenResponse;
    try {
      tokenResponse = await this.authAPI.getAuthTokens(authCode);
    } catch (e) {
      return e.response.data.error;
    }

    const { refresh_token, id_token, scope } = tokenResponse;
    if (!refresh_token) return;
    const { sub, email_verified } = this.getUserPayload(id_token);

    if (!email_verified) return GoogleAuthError.EMAIL_NOT_VERIFIED;

    if (user.googleId) {
      if (user.googleId !== sub) return GoogleAuthError.WRONG_ACCOUNT;
    } else {
      const user = this.userRepository.find({ googleId: sub });
      if (user) return GoogleAuthError.ACCOUNT_ALREADY_REGISTERED;
    }

    const grantedScopes = scope.split(' ');
    if (!this.checkGrantedScopes(grantedScopes, requiredScopes)) {
      return GoogleAuthError.ACCESS_DENIED;
    }

    await this.saveRefreshToken(user, refresh_token);
  }

  checkGrantedScopes (grantedScopes: string[], requiredScopes: string[]): boolean {
    const scopeSet = new Set<string>(requiredScopes);
    for (const scope of grantedScopes) {
      scopeSet.delete(scope);
    }
    return scopeSet.size === 0;
  }

  async saveRefreshToken (user: DbUser, refreshToken: string): Promise<void> {
    const { id, googleId } = user;

    refreshToken = this.encryptToken(refreshToken);

    if (googleId) {
      const googleUser = await this.googleUserRepository.findById(googleId);
      if (googleUser) {
        await this.googleUserRepository.updateById(googleId, { refreshToken });
      } else {
        await this.googleUserRepository.create({ googleId, refreshToken });
      }
    } else {
      await this.userRepository.updateById(id, { googleId });
      await this.googleUserRepository.create({ googleId, refreshToken });
    }
  }

  async getAccessToken (googleId: string): Promise<string | null> {
    if (!googleId) return null;

    const googleUser = await this.googleUserRepository.findById(googleId);
    if (!googleUser) return null;

    let { refreshToken } = googleUser;
    refreshToken = this.decryptToken(refreshToken);

    return await this.refreshAccessToken(googleId, refreshToken);
  }

  async refreshAccessToken (googleId: string, refreshToken: string): Promise<string | null> {
    try {
      const { access_token } = await this.authAPI.refreshAccessToken(refreshToken);

      return access_token;
    } catch (e) {
      await this.googleUserRepository.deleteById(googleId);

      return null;
    }
  }

  async checkUserCalendarPermissions (googleId: string): Promise<boolean> {
    if (!googleId)
      throw new GoogleNotLinkedException();

    try {
      const accessToken = await this.getAccessToken(googleId);
      if (!accessToken) return false;

      if (!(await this.hasCalendarPermissions(accessToken))) {
        return false;
      }
    } catch (e) {
      return false;
    }

    return true;
  }

  async hasCalendarPermissions (accessToken: string): Promise<boolean> {
    try {
      const { scope } = await this.authAPI.getAccessTokenInfo(accessToken);
      const grantedScopes = scope.split(' ');

      return this.checkGrantedScopes(grantedScopes, CALENDAR_SCOPES);
    } catch (e) {
      return false;
    }
  }


  private encryptToken (token): string {
    const iv = randomBytes(IV_BYTES);
    const key = scryptSync(this.securityConfig.secret, 'salt', KEY_BYTES);
    const cipher = createCipheriv('aes-128-cbc', key, iv);

    let encrypted = cipher.update(token, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    return iv.toString('hex') + encrypted;
  }

  private decryptToken (token: string): string {
    const iv = Buffer.from(token.slice(0, 2 * IV_BYTES), 'hex');
    const key = scryptSync(this.securityConfig.secret, 'salt', KEY_BYTES);
    const decipher = createDecipheriv('aes-128-cbc', key, iv);

    let decrypted = decipher.update(token.slice(2 * IV_BYTES), 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
  }
}
