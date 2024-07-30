import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GoogleConfigService } from '../config/GoogleConfigService';
import { UserRepository } from '../database/repositories/UserRepository';
import { InvalidGoogleTokenException } from '../utils/exceptions/InvalidGoogleTokenException';
import { GoogleUserPayload } from './types/GoogleUserPayload';

const TOKENINFO_URL = 'https://oauth2.googleapis.com/tokeninfo';
const TRUSTED_ISSUERS = ['https://accounts.google.com', 'accounts.google.com'];

@Injectable()
export class GoogleAuthService {
  constructor (
    private config: GoogleConfigService,
    private userRepository: UserRepository,
  ) {}

  async isIdTokenValid(idToken): Promise<boolean> {
    try {
      await axios.get(TOKENINFO_URL, {
        params: {
          id_token: idToken
        }
      })
    } catch(e) {
      return false;
    }

    const { aud, iss } = this.getUserPayload(idToken);
    if (aud !== this.config.clientId || !TRUSTED_ISSUERS.find(issuer => issuer === iss)) {
      return false;
    }

    return true;
  }

  getUserPayload(idToken): GoogleUserPayload {
    const payloadB64Url = idToken.split('.')[1];
    const base64 = payloadB64Url.replace(/-/g, '+').replace(/_/g, '/');
    const plainText = Buffer.from(base64, 'base64').toString();

    return JSON.parse(plainText);
  }
}
