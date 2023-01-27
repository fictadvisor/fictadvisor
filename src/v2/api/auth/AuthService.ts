import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../database/PrismaService';
import { JwtPayload } from '../../security/JwtPayload';
import { SecurityConfigService } from '../../config/SecurityConfigService';
import { State, User } from '@prisma/client';
import { TokensDTO } from './dto/TokensDTO';
import { RegistrationDTO, TelegramDTO } from './dto/RegistrationDTO';
import { createHash, createHmac } from 'crypto';
import { TelegramConfigService } from '../../config/TelegramConfigService';
import {UserRepository } from '../user/UserRepository'; 
import { InvalidTelegramCredentialsException } from '../../utils/exceptions/InvalidTelegramCredentialsException';
import { UpdatePasswordDTO } from './dto/UpdatePasswordDTO';
import * as crypto from 'crypto';
import { EmailService } from '../../email/EmailService';
import { ResetPasswordDTO } from './dto/ResetPasswordDTO';
import { InvalidResetTokenException } from '../../utils/exceptions/InvalidResetTokenException';
import { TooManyActionsException } from '../../utils/exceptions/TooManyActionsException';
import { InvalidVerificationTokenException } from 'src/v2/utils/exceptions/InvalidVerificationTokenException';

export const ONE_MINUTE = 1000 * 60;
export const HOUR = ONE_MINUTE * 60;

@Injectable()
export class AuthService {

  private resetPasswordTokens: Map<string, {email: string, date: Date}> = new Map();
  private verificateEmailTokens: Map<string, {email: string, date: Date}> = new Map();

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private securityConfig: SecurityConfigService,
    private telegramConfig: TelegramConfigService,
    private emailService: EmailService,
    private userRepository: UserRepository,
  ) {}

  async validateUser(username: string, password: string) {
    return await this.prisma.user.findFirst({
      where: {
        OR: [
          { username: username },
          { email: username },
        ],
        password: password,
      },
    });
  }

  isExchangeValid({hash, ...data}: TelegramDTO): boolean {
    if (!data) return false;

    const str = Object.keys(data)
      .sort()
      .map((key) => `${key}=${data[key]}`)
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
          avatar: telegram.photo_url,
        });
      } else {
        throw new InvalidTelegramCredentialsException();
      }
    }

    const dbUser = await this.prisma.user.create({
      data: {
        ...user,
        student: {
          create: createStudent,
        },
      },
    });

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
    const payload = this.createPayload(user);
    return this.getAccessToken(payload);
  }

  getTokens(user: User): TokensDTO {
    const payload = this.createPayload(user);

    return {
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: this.securityConfig.jwtRefreshTtl,
      }),
      accessToken: this.jwtService.sign(payload),
    };
  }

  getAccessToken(payload: JwtPayload) {
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async loginTelegram(telegram: TelegramDTO): Promise<TokensDTO> {
    if (!this.isExchangeValid(telegram)) {
      throw new InvalidTelegramCredentialsException();
    }

    const user = await this.prisma.user.findUnique({
      where: {
        telegramId: String(telegram.id),
      },
    });

    return this.getTokens(user);
  }

  createPayload(user: User): JwtPayload {
    return {
      sub: user.id,
      username: user.username,
      createdAt: Date.now(),
    };
  }

  async updatePassword({ oldPassword, newPassword }: UpdatePasswordDTO, user: User): Promise<TokensDTO> {
    const dbUser: User = await this.validateUser(user.username, oldPassword);

    if (!dbUser) {
      return null;
    }

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: newPassword,
        lastPasswordChanged: new Date(Date.now()),
      },
    });

    return this.getTokens(user);
  }

  async forgotPassword(email: string) {
    const uuid = crypto.randomUUID();
    for (const [token, value] of this.resetPasswordTokens.entries()) {
      if (value.email === email) {
        if (Date.now() - value.date.getTime() < ONE_MINUTE) {
          throw new TooManyActionsException();
        } else {
          this.resetPasswordTokens.delete(token);
        }
      }
    }

    this.resetPasswordTokens.set(uuid, {
      email,
      date: new Date(),
    });
    await this.emailService.sendEmail({
      to: email,
      subject: 'Відновлення паролю на fictadvisor.com',
      message: 'Для відновлення паролю перейдіть за посиланням нижче. Посилання діє годину.',
      link: `https://fictadvisor.com/password-recovery/${uuid}`,
    });

    setTimeout(() => {
      this.resetPasswordTokens.delete(uuid);
    }, HOUR);
  }

  async resetPassword(token: string, { password }: ResetPasswordDTO) {
    if (!this.resetPasswordTokens.has(token)) {
      throw new InvalidResetTokenException();
    }

    const email = this.resetPasswordTokens.get(token).email;
    this.userRepository.updateByEmail(email, {password, lastPasswordChanged: new Date()});

    this.resetPasswordTokens.delete(token);
  }

  async requestEmailVerification (email: string) {
    const uuid = crypto.randomUUID();
    for (const [token, value] of this.verificateEmailTokens.entries()) {
      if (value.email === email) {
        if (Date.now() - value.date.getTime() < ONE_MINUTE) {
          throw new TooManyActionsException();
        } else {
          this.verificateEmailTokens.delete(token);
        }
      }
    }

    this.verificateEmailTokens.set(uuid, {
      email,
      date: new Date(),
    });
    await this.emailService.sendEmail({
      to: email,
      subject: 'Верифікація пошти на fictadvisor.com',
      message: 'Для верифікації пошти перейдіть за посиланням нижче. Посилання діє годину.',
      link: `https://fictadvisor.com/register/email-verification/${uuid}`,
    });

    setTimeout(() => {
      this.verificateEmailTokens.delete(uuid);
      this.userRepository.deleteByEmail(email);
    }, HOUR);
  }
  
  async verificateEmail(token: string) {
    if (!this.verificateEmailTokens.has(token)) {
      throw new InvalidVerificationTokenException();
    }
    const email = this.verificateEmailTokens.get(token).email;
    this.userRepository.updateByEmail(email, {state: State.APPROVED} );

    this.verificateEmailTokens.delete(token);
  }
}