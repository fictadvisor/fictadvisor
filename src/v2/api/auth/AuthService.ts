import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../database/PrismaService';
import { JwtPayload } from '../../security/JwtPayload';
import { SecurityConfigService } from '../../config/SecurityConfigService';
import { User } from '@prisma/client'
import { TokensDTO } from './dto/TokensDTO';
import { RegistrationDTO } from './dto/RegistrationDTO';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private securityConfig: SecurityConfigService
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

  async register(user: RegistrationDTO): Promise<TokensDTO> {
    const { email, password, username, isCaptain, ...student} = user;
    const dbUser = await this.prisma.user.create({
      data: {
        username,
        email,
        password,
        student: {
          create: student
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

  async refresh(refreshToken: string): Promise<object | null> {
    try {
      const payload: JwtPayload = await this.jwtService.verify(refreshToken);
      return this.getAccessToken(payload);
    } catch (err) {
      return null;
    }
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
}