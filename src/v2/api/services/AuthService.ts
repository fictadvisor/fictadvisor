import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../security/JwtPayload';
import { SecurityConfigService } from '../../config/SecurityConfigService';
import { State, User, RoleName } from '@prisma/client';
import { TokensDTO } from '../dtos/TokensDTO';
import { RegistrationDTO } from '../dtos/RegistrationDTO';
import { createHash, createHmac } from 'crypto';
import { TelegramConfigService } from '../../config/TelegramConfigService';
import { UserRepository } from '../../database/repositories/UserRepository';
import { InvalidTelegramCredentialsException } from '../../utils/exceptions/InvalidTelegramCredentialsException';
import { UpdatePasswordDTO } from '../dtos/UpdatePasswordDTO';
import * as crypto from 'crypto';
import { EmailService } from './EmailService';
import { ResetPasswordDTO } from '../dtos/ResetPasswordDTO';
import { InvalidResetTokenException } from '../../utils/exceptions/InvalidResetTokenException';
import { TooManyActionsException } from '../../utils/exceptions/TooManyActionsException';
import { InvalidVerificationTokenException } from 'src/v2/utils/exceptions/InvalidVerificationTokenException';
import { TelegramAPI } from '../../telegram/TelegramAPI';
import { StudentRepository } from '../../database/repositories/StudentRepository';
import { GroupRepository } from '../../database/repositories/GroupRepository';
import bcrypt from 'bcrypt';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { UniqueUserDTO } from '../dtos/UniqueUserDTO';
import { IdentityQueryDTO } from '../dtos/IdentityQueryDTO';
import { AlreadyRegisteredException } from '../../utils/exceptions/AlreadyRegisteredException';
import { NotRegisteredException } from '../../utils/exceptions/NotRegisteredException';
import { PasswordRepeatException } from '../../utils/exceptions/PasswordRepeatException';
import { GroupService } from './GroupService';
import { RoleService } from './RoleService';
import { RoleRepository } from '../../database/repositories/RoleRepository';
import { TelegramDTO } from '../dtos/TelegramDTO';
import { StudentDTO } from '../dtos/StudentDTO';
import { UserDTO } from '../dtos/UserDTO';
import { RegisterTelegramDTO } from '../dtos/RegisterTelegramDTO';
import { ConfigService } from '@nestjs/config';
import { CaptainAlreadyRegisteredException } from '../../utils/exceptions/CaptainAlreadyRegisteredException';

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

  private resetPasswordTokens: Map<string, { email: string, date: Date }> = new Map();
  private verifyEmailTokens: Map<string, { date: Date, isCaptain: boolean, user: UserDTO & { student: any } }> = new Map();
  private registerTelegramTokens: Map<string, number> = new Map();

  constructor (
    private roleService: RoleService,
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
  ) {}

  async validateUser (username: string, password: string) {
    const user = await this.userRepository.find({
      OR: [
        { username },
        { email: username },
      ],
    });
    if (!user) {
      throw new InvalidEntityIdException('user');
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

    if (await this.checkIfUserIsRegistered({ email: user.email, username: user.username })) {
      throw new AlreadyRegisteredException();
    }

    const captain = await this.groupService.getCaptain(createStudent.groupId);
    if (captain && isCaptain) {
      throw new CaptainAlreadyRegisteredException();
    }

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

    const userForDb = {
      ...user,
      password: await this.hashPassword(user.password),
      avatar: user.avatar ? user.avatar : AVATARS[Math.floor(Math.random() * AVATARS.length)],
      student: createStudent,
    };

    await this.requestEmailVerification(userForDb, isCaptain);
  }

  async verify (body: { id: string, telegramId: number }, { groupId, isCaptain, middleName, ...student }: StudentDTO) {
    const group = await this.groupRepository.findById(groupId);
    const data = {
      id: body.id,
      telegramId: body?.telegramId ? body.telegramId : undefined,
      middleName: middleName ? middleName : '',
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
    const user = await this.userRepository.find({
      telegramId: telegram.id,
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
    await this.validateUser(user.username, oldPassword);

    if (oldPassword === newPassword) {
      throw new PasswordRepeatException();
    }

    await this.setPassword({ email: user.email }, newPassword);

    return this.getTokens(user);
  }

  async forgotPassword (email: string) {
    if (!await this.checkIfUserIsRegistered({ email })) {
      throw new NotRegisteredException();
    }

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
      link: `${this.config.get<string>('frontBaseUrl')}/password-recovery/${uuid}`,
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
    await this.setPassword({ email }, password);

    this.resetPasswordTokens.delete(token);
  }

  async repeatEmailVerification (email: string) {
    const obj = Object.values(this.verifyEmailTokens).find((t) => t.user.email === email);

    if (!obj) {
      throw new NotRegisteredException();
    }

    await this.requestEmailVerification(obj.user, obj.isCaptain);
  }

  async requestEmailVerification (user: UserDTO & { student: any }, isCaptain: boolean) {
    for (const [token, value] of this.verifyEmailTokens.entries()) {
      if (value.user.email === user.email) {
        if (Date.now() - value.date.getTime() < ONE_MINUTE) {
          throw new TooManyActionsException();
        } else {
          this.verifyEmailTokens.delete(token);
        }
      }
    }

    const uuid = crypto.randomUUID();
    this.verifyEmailTokens.set(uuid, {
      date: new Date(),
      isCaptain,
      user,
    });
    await this.emailService.sendEmail({
      to: user.email,
      subject: 'Верифікація пошти на fictadvisor.com',
      message: 'Для верифікації пошти перейди за посиланням нижче. Посилання діє годину.',
      link: `${this.config.get<string>('frontBaseUrl')}/register/email-verification/${uuid}`,
    });

    setTimeout(async () => {
      this.verifyEmailTokens.delete(uuid);
    }, HOUR);
  }

  async verifyEmail (token: string) {
    if (!this.verifyEmailTokens.has(token)) {
      throw new InvalidVerificationTokenException();
    }
    const { user: { student, ...tokenUser }, isCaptain } = this.verifyEmailTokens.get(token);


    if (!(await this.isPseudoRegistered(tokenUser.email))) {
      const telegram = tokenUser.telegramId ? {} : { telegramId: tokenUser.telegramId };
      const user = await this.userRepository.find({
        OR: [
          { email: tokenUser.email },
          { username: tokenUser.username },
          { ...telegram },
        ],
      });
      if (user) {
        throw new AlreadyRegisteredException();
      }
    }

    let user;

    if (await this.isPseudoRegistered(tokenUser.email)) {
      user = await this.pseudoRegister(tokenUser, isCaptain, student);
    } else {
      user = await this.trulyRegister(tokenUser, isCaptain, student);
    }

    this.verifyEmailTokens.delete(token);

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
    },
    );
    return this.getTokens(user);
  }

  async setPassword (search: UniqueUserDTO, password) {
    const hash = await this.hashPassword(password);
    return this.userRepository.updateMany({
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

  async checkIfUserIsRegistered (query: IdentityQueryDTO) {
    const user = await this.userRepository.find({
      OR: [
        { email: query.email },
        { username: query.username },
      ],
    });
    return (user != null && user.password != null);
  }

  async isPseudoRegistered (email: string) {
    const user = await this.userRepository.find({ email });
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

  async pseudoRegister (user: UserDTO, isCaptain:boolean, createStudent: Omit<StudentDTO, 'isCaptain'>) {
    const dbUser = await this.userRepository.update(
      { email: user.email }, 
      {
        ...user,
        lastPasswordChanged: new Date(),
        state: State.APPROVED,
      });
    await this.studentRepository.updateById(dbUser.id, createStudent);

    return dbUser;
  }

  async checkCaptain (groupId: string) {
    const captain = await this.groupService.getCaptain(groupId);
    return !!captain;
  }

  checkResetToken (token: string) {
    return this.resetPasswordTokens.has(token);
  }

  registerTelegram (register: RegisterTelegramDTO) {
    let telegramKey;
    for (const [key, value] of this.registerTelegramTokens.entries()) {
      if (value === register.telegramId) {
        telegramKey = key;
        break;
      }
    }
    if (telegramKey) this.registerTelegramTokens.delete(telegramKey);
    this.registerTelegramTokens.set(register.token, register.telegramId);

    setTimeout(() => {
      this.registerTelegramTokens.delete(register.token);
    }, HOUR);
  }

  checkTelegram (token: string) {
    return this.registerTelegramTokens.has(token);
  }
}