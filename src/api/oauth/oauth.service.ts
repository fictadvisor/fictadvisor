import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from 'src/database/entities/refresh-token.entity';
import { User } from 'src/database/entities/user.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { OAuthTelegramDto } from './dto/oauth-telegram.dto';
import { OAuthTokenDto } from './dto/oauth-token.dto';
import { v4 as uuid } from 'uuid';
import { assign } from 'src/common/common.object';
import { JwtPayload } from 'src/jwt/jwt.payload';
import { ServiceException } from 'src/common/common.exception';
import * as ms from 'ms';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OAuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  private async getToken(user: User): Promise<OAuthTokenDto> {
    const refreshToken = uuid();

    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    await this.refreshTokenRepository
      .create({ user, token: refreshToken })
      .save();

    return OAuthTokenDto.of(this.jwtService.sign(payload), refreshToken);
  }

  async login(oauth: OAuthTelegramDto): Promise<OAuthTokenDto> {
    let user: User = await this.userRepository.findOne({
      telegramId: oauth.telegramId,
    });

    user = assign(user == null ? new User() : user, {
      telegramId: oauth.telegramId,
      username: oauth.username,
      firstName: oauth.firstName,
      lastName: oauth.lastName,
      image: oauth.image,
    });

    return await this.getToken(await this.userRepository.save(user));
  }

  async refresh(refreshToken: string): Promise<OAuthTokenDto> {
    const ttl = ms(this.configService.get<string>('security.jwt.refreshTtl'));
    const token = await this.refreshTokenRepository.findOne(
      { token: refreshToken, createdAt: MoreThanOrEqual(new Date(Date.now() - ttl)) },
      { relations: ['user'] }
    );

    if (!token) {
      throw ServiceException.create(HttpStatus.UNAUTHORIZED, {
        message: 'Invalid refresh token',
      });
    }

    await this.refreshTokenRepository.remove(token);

    return await this.getToken(token.user);
  }
}
