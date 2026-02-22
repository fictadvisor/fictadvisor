import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  TokensDTO,
  RegistrationDTO,
  UpdatePasswordDTO,
  ResetPasswordDTO,
  UniqueUserDTO,
  TelegramDTO,
  StudentDTO,
  UserDTO,
  RegisterTelegramDTO,
} from '@fictadvisor/utils/requests';
import { createHash, createHmac } from 'crypto';
import * as bcrypt from 'bcryptjs';
import { State, User, RoleName } from '@prisma-client/fictadvisor';
import { JwtPayload } from './types/jwt.payload';
import { TelegramAPI } from '../../telegram-api/telegram-api';
import { SecurityConfigService } from '../../../config/security-config.service';
import { TelegramConfigService } from '../../../config/telegram-config.service';
import { EmailService } from '../../email/email.service';
import { GroupService } from '../../group/v2/group.service';
import { PrismaService } from '../../../database/v2/prisma.service';
import { UserRepository } from '../../../database/v2/repositories/user.repository';
import { RoleRepository } from '../../../database/v2/repositories/role.repository';
import { StudentRepository } from '../../../database/v2/repositories/student.repository';
import { GroupRepository } from '../../../database/v2/repositories/group.repository';
import { InvalidTelegramCredentialsException } from '../../../common/exceptions/invalid-telegram-credentials.exception';
import { InvalidResetTokenException } from '../../../common/exceptions/invalid-reset-token.exception';
import { TooManyActionsException } from '../../../common/exceptions/too-many-actions.exception';
import { InvalidVerificationTokenException } from '../../../common/exceptions/invalid-verification-token.exception';
import { InvalidEntityIdException } from '../../../common/exceptions/invalid-entity-id.exception';
import { AlreadyRegisteredException } from '../../../common/exceptions/already-registered.exception';
import { NotRegisteredException } from '../../../common/exceptions/not-registered.exception';
import { PasswordRepeatException } from '../../../common/exceptions/password-repeat.exception';
import { CaptainAlreadyRegisteredException } from '../../../common/exceptions/captain-already-registered.exception';
import { AbsenceOfCaptainException } from '../../../common/exceptions/absence-of-captain.exception';

export const ONE_MINUTE = 1000 * 60;
export const HOUR = ONE_MINUTE * 60;
export const AVATARS = [
  'https://i.imgur.com/0ySPaF0.jpeg',
  'https://i.imgur.com/K58n0UQ.jpeg',
  'https://i.imgur.com/9ZGjAgT.png',
  'https://i.imgur.com/nKjNZfC.png',
  'https://i.imgur.com/BdjXDoZ.png',
  'https://i.imgur.com/lxqeV2H.png',
  'https://i.imgur.com/haNSNwb.png',
  'https://i.imgur.com/pFrr37l.png',
  'https://i.imgur.com/K1VUoCG.png',
  'https://i.imgur.com/cIUqJci.png',
  'https://i.imgur.com/OTXludE.png',
  'https://i.imgur.com/6ogcyVF.png',
];

@Injectable()
export class AuthService {

  constructor (
    private roleRepository: RoleRepository,
    private jwtService: JwtService,
    private securityConfig: SecurityConfigService,
    private telegramConfig: TelegramConfigService,
    private emailService: EmailService,
    private userRepository: UserRepository,
    private studentRepository: StudentRepository,
    private telegramApi: TelegramAPI,
    private groupRepository: GroupRepository,
    private groupService: GroupService,
    private config: ConfigService,
    private prisma: PrismaService,
  ) {}

  async validateUser (username: string, password: string) {
    const user = await this.userRepository.findOne({
      OR: [
        { username },
        { email: username },
      ],
    });
    if (!user) {
      throw new InvalidEntityIdException('User');
    }

    if (!user.password || !password) {
      throw new UnauthorizedException('Use forgot password to get access to your account');
    }

    const isMatch = await this.checkPassword(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('The password is incorrect');
    }

    delete user.password;
    return user;
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

  async register (registrationDTO: RegistrationDTO) {
    const { telegram, student: { isCaptain, ...createStudent }, user } = registrationDTO;

    if (await this.checkIfUserIsRegistered(user)) {
      throw new AlreadyRegisteredException();
    }

    const captain = await this.groupService.findCaptain(createStudent.groupId);

    if (!captain && !isCaptain) {
      throw new AbsenceOfCaptainException();
    } else if (captain && isCaptain) {
      throw new CaptainAlreadyRegisteredException();
    }

    if (telegram) {
      if (this.isExchangeValid(telegram)) {
        user.avatar = telegram.photo_url;
        user.telegramId = telegram.id;
      } else {
        throw new InvalidTelegramCredentialsException();
      }
    }

    const tokenBody = {
      ...user,
      password: await this.hashPassword(user.password),
      avatar: user.avatar ?? AVATARS[Math.floor(Math.random() * AVATARS.length)],
      ...createStudent,
      isCaptain,
    };

    await this.requestEmailVerification(tokenBody);
  }

  async verify (body: { id: string, telegramId: bigint }, { groupId, isCaptain, middleName, ...student }: StudentDTO) {
    const group = await this.groupRepository.findOne({ id: groupId });
    const data = {
      id: body.id,
      telegramId: body?.telegramId ? body.telegramId : undefined,
      middleName: middleName || '',
      ...student,
      groupCode: group.code,
    };
    if (isCaptain) {
      await this.telegramApi.verifyCaptain(data);
    } else {
      const cap = await this.groupService.getCaptain(groupId);

      if (cap.telegramId) {
        await this.telegramApi.verifyStudent({ captainTelegramId: cap.telegramId, ...data });
      }
    }
  }

  login (user: User): TokensDTO {
    if (user.state === State.PENDING) {
      throw new UnauthorizedException('The email hasn\'t verified yet');
    }
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
    if (!telegram || !this.isExchangeValid(telegram)) {
      throw new InvalidTelegramCredentialsException();
    }
    const user = await this.userRepository.findOne({
      telegramId: telegram.id,
    });
    if (!user) {
      throw new InvalidEntityIdException('User');
    }
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
    await this.validateUser(user.username, oldPassword);

    if (oldPassword === newPassword) {
      throw new PasswordRepeatException();
    }

    await this.setPassword({ email: user.email }, newPassword);

    return this.getTokens(user);
  }

  async forgotPassword (email: string) {
    if (!await this.checkIfUserIsRegistered({ email })) {
      throw new NotRegisteredException('email');
    }

    const repo = this.prisma.resetPasswordToken;

    let token = await repo.findFirst({ where: { email } });
    if (token) {
      if (Date.now() - token.createdAt.getTime() < ONE_MINUTE) {
        throw new TooManyActionsException();
      } else {
        await repo.delete({ where: { token: token.token } });
      }
    }

    token = await repo.create({
      data: {
        email,
      },
    });

    await this.emailService.sendEmail({
      to: email,
      subject: 'Відновлення пароля на fictadvisor.com',
      message: 'Для відновлення пароля натисни на кнопку нижче. Посилання діє годину.',
      link: `${this.config.get<string>('frontBaseUrl')}/password-recovery/${token.token}`,
    });

    new Promise((resolve) => {
      setTimeout(() =>
        resolve(
          repo.deleteMany({ where: { token: token.token } })
        ), HOUR
      );
    });
  }

  async resetPassword (token: string, { password }: ResetPasswordDTO) {
    const resetToken = await this.prisma.resetPasswordToken.findFirst({ where: { token } });
    if (!resetToken) {
      throw new InvalidResetTokenException();
    }

    await this.setPassword(resetToken, password);
    await this.prisma.resetPasswordToken.delete({ where: { token } });
  }

  async repeatEmailVerification (email: string) {
    const token = await this.prisma.verifyEmailToken.findFirst({ where: { email } });

    if (!token) {
      throw new NotRegisteredException('email');
    }

    await this.requestEmailVerification(token);
  }

  async requestEmailVerification (user: UserDTO & StudentDTO) {
    const repo = this.prisma.verifyEmailToken;

    let token = await repo.findFirst({ where: { email: user.email } });
    if (token) {
      if (Date.now() - token.createdAt.getTime() < ONE_MINUTE) {
        throw new TooManyActionsException();
      } else {
        await repo.delete({ where: { token: token.token } });
      }
    }

    token = await repo.create({
      data: {
        ...user,
      },
    });
    await this.emailService.sendEmail({
      to: user.email,
      subject: 'Верифікація пошти на fictadvisor.com',
      message: 'Для верифікації пошти натисни на кнопку нижче. Посилання діє годину.',
      link: `${this.config.get<string>('frontBaseUrl')}/register/email-verification/${token.token}`,
    });

    new Promise((resolve) => {
      setTimeout(() =>
        resolve(
          repo.deleteMany({ where: { token: token.token } })
        ), HOUR
      );
    });
  }

  async verifyEmail (token: string) {
    const verifyToken = await this.prisma.verifyEmailToken.findFirst({ where: { token } });
    if (!verifyToken) {
      throw new InvalidVerificationTokenException();
    }
    const { email, telegramId, username, avatar, firstName, lastName, groupId, middleName, isCaptain, password } = verifyToken;

    if (!(await this.isPseudoRegistered(email))) {
      const user = await this.userRepository.findOne({
        OR: [
          { email },
          { username },
          telegramId !== null
            ? { telegramId }
            : undefined,
        ],
      });
      if (user) {
        throw new AlreadyRegisteredException();
      }
    }

    const tokenUser = {
      email,
      username,
      telegramId,
      avatar,
      password,
    };
    const student = {
      firstName,
      middleName,
      lastName,
      groupId,
    };

    const user = await this.isPseudoRegistered(email)
      ? await this.pseudoRegister(tokenUser, student)
      : await this.trulyRegister(tokenUser, isCaptain, student);

    await this.prisma.verifyEmailToken.delete({ where: { token } });

    await this.roleRepository.create({
      name: RoleName.USER,
      weight: 10,
      grants: {
        create: [{ permission: `users.${user.id}.*` }],
      },
      userRoles: {
        create: {
          studentId: user.id,
        },
      },
    });
    return this.getTokens(user);
  }

  async setPassword (search: UniqueUserDTO, password: string) {
    const hash = await this.hashPassword(password);
    return this.userRepository.update({
      OR: [
        { id: search.id },
        { email: search.email },
        { telegramId: search.telegramId },
        { username: search.username },
      ],
    },
    {
      password: hash,
      lastPasswordChanged: new Date(),
    });
  }

  async hashPassword (password: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  async checkPassword (password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async checkIfUserIsRegistered (query: { email?: string, username?: string }) {
    const user = await this.userRepository.findOne({
      OR: [
        { email: query.email },
        { username: query.username },
      ],
    });
    return !!user?.password;
  }

  async isPseudoRegistered (email: string) {
    const user = await this.userRepository.findOne({ email });
    return (user != null && user.password == null);
  }

  async trulyRegister (user: UserDTO, isCaptain: boolean, createStudent: Omit<StudentDTO, 'isCaptain'>) {
    const dbUser = await this.userRepository.create({
      ...user,
      lastPasswordChanged: new Date(),
      state: State.APPROVED,
    });
    await this.studentRepository.create({
      userId: dbUser.id,
      ...createStudent,
    });

    await this.verify(dbUser, {
      isCaptain,
      ...createStudent,
    });

    return dbUser;
  }

  async pseudoRegister (user: UserDTO, createStudent: Omit<StudentDTO, 'isCaptain'>) {
    await this.userRepository.update(
      { email: user.email }, {
        ...user,
        lastPasswordChanged: new Date(),
        state: State.APPROVED,
      });
    const dbUser = await this.userRepository.findOne({ email: user.email });
    await this.studentRepository.updateById(dbUser.id, createStudent);

    return dbUser;
  }

  async checkCaptain (groupId: string) {
    const captain = await this.groupService.findCaptain(groupId);
    return !!captain;
  }

  async checkResetToken (token: string) {
    return this.prisma.resetPasswordToken.findFirst({ where: { token } });
  }

  async registerTelegram (data: RegisterTelegramDTO) {
    const repo = this.prisma.registerTelegramToken;

    const token = await repo.findFirst({ where: { telegramId: data.telegramId } });
    if (token) {
      await repo.delete({ where: { token: token.token } });
    }
    await repo.create({
      data,
    });

    new Promise((resolve) => {
      setTimeout(() =>
        resolve(
          repo.deleteMany({ where: { token: data.token } })
        ), HOUR
      );
    });
  }

  async checkTelegram (token: string) {
    return this.prisma.registerTelegramToken.findFirst({ where: { token } });
  }
}
