import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../security/JwtPayload';
import { SecurityConfigService } from '../../config/SecurityConfigService';
import { State, User, RoleName } from '@prisma/client';
import { TokensDTO } from './dto/TokensDTO';
import { RegistrationDTO } from './dto/RegistrationDTO';
import { createHash, createHmac } from 'crypto';
import { TelegramConfigService } from '../../config/TelegramConfigService';
import { UserRepository } from '../user/UserRepository';
import { InvalidTelegramCredentialsException } from '../../utils/exceptions/InvalidTelegramCredentialsException';
import { UpdatePasswordDTO } from './dto/UpdatePasswordDTO';
import * as crypto from 'crypto';
import { EmailService } from '../../email/EmailService';
import { ResetPasswordDTO } from './dto/ResetPasswordDTO';
import { InvalidResetTokenException } from '../../utils/exceptions/InvalidResetTokenException';
import { TooManyActionsException } from '../../utils/exceptions/TooManyActionsException';
import { InvalidVerificationTokenException } from 'src/v2/utils/exceptions/InvalidVerificationTokenException';
import { TelegramAPI } from '../../telegram/TelegramAPI';
import { StudentRepository } from '../user/StudentRepository';
import { GroupRepository } from '../group/GroupRepository';
import bcrypt from 'bcrypt';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { UniqueUserDTO } from '../user/dto/UniqueUserDTO';
import { IdentityQueryDTO } from './dto/IdentityQueryDTO';
import { AlreadyRegisteredException } from '../../utils/exceptions/AlreadyRegisteredException';
import { NotRegisteredException } from '../../utils/exceptions/NotRegisteredException';
import { PasswordRepeatException } from '../../utils/exceptions/PasswordRepeatException';
import { GroupService } from '../group/GroupService';
import { RoleService } from '../user/role/RoleService';
import { RoleRepository } from '../user/role/RoleRepository';
import { TelegramDTO } from './dto/TelegramDTO';
import { StudentDTO } from './dto/StudentDTO';
import { UserDTO } from './dto/UserDTO';

export const ONE_MINUTE = 1000 * 60;
export const HOUR = ONE_MINUTE * 60;

@Injectable()
export class AuthService {

  private resetPasswordTokens: Map<string, { email: string, date: Date }> = new Map();
  private verifyEmailTokens: Map<string, { email: string, date: Date }> = new Map();

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
  ) {
  }

  async validateUser (username: string, password: string) {
    const user = await this.userRepository.getByUnique({
      username,
      email: username,
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

    user.password = await this.hashPassword(user.password);

    if (await this.isPseudoRegistered(user.email)) {
      await this.pseudoRegister(user, isCaptain, createStudent);
    } else {
      await this.trulyRegister(user, isCaptain, createStudent);
    }

    await this.requestEmailVerification(user.email);
  }

  async verify ({ id, telegramId }: { id: string, telegramId: number }, { groupId, isCaptain, middleName, ...student }: StudentDTO) {
    const group = await this.groupRepository.getGroup(groupId);
    const data = {
      id,
      telegramId: telegramId ? telegramId : undefined,
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
    if (!this.isExchangeValid(telegram)) {
      throw new InvalidTelegramCredentialsException();
    }

    const user = await this.userRepository.getByUnique({
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
    await this.setPassword({ email }, password);

    this.resetPasswordTokens.delete(token);
  }

  async requestEmailVerification (email: string) {
    if (!await this.checkIfUserIsRegistered({ email })) {
      throw new NotRegisteredException();
    }

    const uuid = crypto.randomUUID();
    for (const [token, value] of this.verifyEmailTokens.entries()) {
      if (value.email === email) {
        if (Date.now() - value.date.getTime() < ONE_MINUTE) {
          throw new TooManyActionsException();
        } else {
          this.verifyEmailTokens.delete(token);
        }
      }
    }

    this.verifyEmailTokens.set(uuid, {
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
      this.verifyEmailTokens.delete(uuid);
      this.userRepository.deleteByEmail(email);
    }, HOUR);
  }

  async verifyEmail (token: string) {
    if (!this.verifyEmailTokens.has(token)) {
      throw new InvalidVerificationTokenException();
    }
    const email = this.verifyEmailTokens.get(token).email;
    const user = await this.userRepository.updateByEmail(email, { state: State.APPROVED });

    this.verifyEmailTokens.delete(token);

    const { id } = await this.roleRepository.createWithGrants({
      name: RoleName.USER,
      weight: 10,
    },
    [{ permission: `users.${user.id}.*` }],
    );
    await this.studentRepository.addRole(user.id, id);
    return this.getTokens(user);
  }

  async setPassword (search: UniqueUserDTO, password) {
    const hash = await this.hashPassword(password);

    return this.userRepository.updateByUnique(search, {
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
    const user = await this.userRepository.getByUnique(query);
    return (user != null && user.password != null);
  }

  async isPseudoRegistered (email: string) {
    const user = await this.userRepository.getByUnique({ email });
    return (user != null && user.password == null);
  }

  async trulyRegister (user: UserDTO, isCaptain:boolean, createStudent: Omit<StudentDTO, 'isCaptain'>) {
    const dbUser = await this.userRepository.create({
      ...user,
      lastPasswordChanged: new Date(),
    });
    await this.studentRepository.create({
      userId: dbUser.id,
      ...createStudent,
    });

    await this.verify(dbUser, {
      isCaptain,
      ...createStudent,
    });
  }

  async pseudoRegister (user: UserDTO, isCaptain:boolean, createStudent: Omit<StudentDTO, 'isCaptain'>) {
    const dbUser = await this.userRepository.updateByEmail(user.email, {
      ...user,
      lastPasswordChanged: new Date(),
    });
    await this.studentRepository.update(dbUser.id, createStudent);
  }

  async checkCaptain (groupId: string) {
    const captain = await this.groupService.getCaptain(groupId);
    return !!captain;
  }

  checkResetToken (token: string) {
    return this.resetPasswordTokens.has(token);
  }
}