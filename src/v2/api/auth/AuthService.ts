import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../database/PrismaService';
import { JwtPayload } from '../../security/JwtPayload';
import { SecurityConfigService } from '../../config/SecurityConfigService';
import { User } from '@prisma/client'
import { TokensDTO } from './dto/TokensDTO';
import { RegistrationDTO, TelegramDTO } from './dto/RegistrationDTO';
import { createHash, createHmac } from 'crypto';
import { TelegramConfigService } from '../../config/TelegramConfigService';
import { InvalidTelegramCredentialsException } from '../../utils/exceptions/InvalidTelegramCredentialsException';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private securityConfig: SecurityConfigService,
    private telegramConfig: TelegramConfigService
  ) {}

  async validateUser(username: string, password: string) {
    return await this.prisma.user.findFirst({
      where: {
        OR: [
          { username: username },
          { email: username }
        ],
        password: password
      }
    });
  }

  isExchangeValid({hash, ...data}: TelegramDTO): boolean {
    if (!data) return false;

    const str = Object.keys(data)
      .sort()
      .map(key => `${key}=${data[key]}`)
      .join('\n');

    try {
      const secretKey = createHash('sha256')
        .update(this.telegramConfig.botToken).digest();
      const signature = createHmac('sha256', secretKey)
        .update(str).digest('hex');

      return hash === signature;
    } catch (e){
      return false;
    }
  }

  async register(registrationDTO: RegistrationDTO): Promise<TokensDTO> {
    const { telegram, student: {isCaptain, ...createStudent}, user} = registrationDTO;

    if (telegram) {
      if (this.isExchangeValid(telegram)) {
        Object.assign(user, {
          telegramId: telegram.id,
          avatar: telegram.photo_url
        });
      } else {
        throw new InvalidTelegramCredentialsException();
      }
    }

    const dbUser = await this.prisma.user.create({
      data: {
        ...user,
        student: {
          create: createStudent
        }
      }
    })

    if (isCaptain) this.verifyCaptain();
    else this.verifyStudent();

    return this.getTokens(dbUser);
  }

  verifyStudent() {
    // TODO add url to Telegram Bot API
    return;
  }

  verifyCaptain() {
    // TODO add url to Telegram Bot API
    return;
  }

  login(user: User): TokensDTO {
    return this.getTokens(user);
  }

  async refresh(user: User): Promise<object | null> {
    const payload: JwtPayload = {
      sub: user.id,
      username: user.username
    }
    return this.getAccessToken(payload);
  }

  getTokens(user: User): TokensDTO {
    const payload: JwtPayload = {
      sub: user.id,
      username: user.username
    }

    return {
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: this.securityConfig.jwtRefreshTtl,
      }),
      accessToken: this.jwtService.sign(payload)
    }
  }

  getAccessToken(payload: JwtPayload) {
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }

  async loginTelegram(telegram: TelegramDTO): Promise<TokensDTO> {
    if (!this.isExchangeValid(telegram)) {
      throw new InvalidTelegramCredentialsException();
    }

    const user = await this.prisma.user.findUnique({
      where: {
        telegramId: String(telegram.id),
      }
    });

    return this.getTokens(user);
  }
}