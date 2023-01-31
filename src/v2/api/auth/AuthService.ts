import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../database/PrismaService';
import { type JwtPayload } from '../../security/JwtPayload';
import { SecurityConfigService } from '../../config/SecurityConfigService';
import { State, type User } from '@prisma/client';
import { type TokensDTO } from './dto/TokensDTO';
import { type RegistrationDTO, type StudentDTO, type TelegramDTO } from './dto/RegistrationDTO';
import { createHash, createHmac } from 'crypto';
import { TelegramConfigService } from '../../config/TelegramConfigService';
import { UserRepository } from '../user/UserRepository';
import { InvalidTelegramCredentialsException } from '../../utils/exceptions/InvalidTelegramCredentialsException';
import { type UpdatePasswordDTO } from './dto/UpdatePasswordDTO';
import * as crypto from 'crypto';
import { EmailService } from '../../email/EmailService';
import { type ResetPasswordDTO } from './dto/ResetPasswordDTO';
import { InvalidResetTokenException } from '../../utils/exceptions/InvalidResetTokenException';
import { TooManyActionsException } from '../../utils/exceptions/TooManyActionsException';
import { InvalidVerificationTokenException } from 'src/v2/utils/exceptions/InvalidVerificationTokenException';
import { TelegramAPI } from '../../telegram/TelegramAPI';
import { StudentRepository } from '../user/StudentRepository';
import { CreateStudentData } from '../user/dto/СreateStudentData';
import { GroupRepository } from '../group/GroupRepository';

export const ONE_MINUTE = 1000 * 60;
export const HOUR = ONE_MINUTE * 60;

@Injectable()
export class AuthService {
  private readonly resetPasswordTokens = new Map<string, { email: string, date: Date }>();
  private readonly verificateEmailTokens = new Map<string, { email: string, date: Date }>();

  constructor (
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly securityConfig: SecurityConfigService,
    private readonly telegramConfig: TelegramConfigService,
    private readonly emailService: EmailService,
    private readonly userRepository: UserRepository,
    private readonly studentRepository: StudentRepository,
    private readonly telegramApi: TelegramAPI,
    private readonly groupRepository: GroupRepository
  ) {
  }

  async validateUser (username: string, password: string) {
    return await this.prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email: username },
        ],
        password,
      },
    });
  }

  isExchangeValid ({ hash, ...data }: TelegramDTO): boolean {
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
    } catch (e) {
      return false;
    }
  }

  async register (registrationDTO: RegistrationDTO): Promise<TokensDTO> {
    const { telegram, student: { isCaptain, ...createStudent }, user } = registrationDTO;

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

    const dbUser = await this.userRepository.create(user);
    await this.studentRepository.create({
      userId: dbUser.id,
      ...createStudent,
    });

    await this.verify(dbUser.id, +dbUser.telegramId, {
      isCaptain,
      ...createStudent,
    });

    return this.getTokens(dbUser);
  }

  async verify (id: string, telegramId: number, { groupId, isCaptain, ...student }: StudentDTO) {
    const group = await this.groupRepository.getGroup(groupId);
    const data = {
      id,
      telegramId,
      ...student,
      groupCode: group.code,
    };
    if (isCaptain) {
      await this.telegramApi.verifyCaptain(data);
    } else {
      await this.telegramApi.verifyStudent(data);
    }
  }

  login (user: User): TokensDTO {
    return this.getTokens(user);
  }

  async refresh (user: User): Promise<object | null> {
    const payload = this.createPayload(user);
    return this.getAccessToken(payload);
  }

  getTokens (user: User): TokensDTO {
    const payload = this.createPayload(user);

    return {
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: this.securityConfig.jwtRefreshTtl,
      }),
      accessToken: this.jwtService.sign(payload),
    };
  }

  getAccessToken (payload: JwtPayload) {
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async loginTelegram (telegram: TelegramDTO): Promise<TokensDTO> {
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

  createPayload (user: User): JwtPayload {
    return {
      sub: user.id,
      username: user.username,
      createdAt: Date.now(),
    };
  }

  async updatePassword ({ oldPassword, newPassword }: UpdatePasswordDTO, user: User): Promise<TokensDTO> {
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

  async forgotPassword (email: string) {
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

  async resetPassword (token: string, { password }: ResetPasswordDTO) {
    if (!this.resetPasswordTokens.has(token)) {
      throw new InvalidResetTokenException();
    }

    const email = this.resetPasswordTokens.get(token).email;
    await this.userRepository.updateByEmail(email, { password, lastPasswordChanged: new Date() });

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

  async verifyEmail (token: string) {
    if (!this.verificateEmailTokens.has(token)) {
      throw new InvalidVerificationTokenException();
    }
    const email = this.verificateEmailTokens.get(token).email;
    await this.userRepository.updateByEmail(email, { state: State.APPROVED });

    this.verificateEmailTokens.delete(token);
  }
}
