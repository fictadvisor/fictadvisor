import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Put,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { AuthLoginResponse } from '../responses/AuthLoginResponse';
import { AuthRefreshResponse } from '../responses/AuthRefreshResponse';
import { LocalAuthGuard } from '../../security/LocalGuard';
import { AuthService } from '../services/AuthService';
import { RegistrationDTO } from '../dtos/RegistrationDTO';
import { JwtGuard } from '../../security/JwtGuard';
import { ForgotPasswordDTO } from '../dtos/ForgotPasswordDTO';
import { ResetPasswordDTO } from '../dtos/ResetPasswordDTO';
import { UpdatePasswordDTO } from '../dtos/UpdatePasswordDTO';
import { VerificationEmailDTO } from '../dtos/VerificationEmailDTO';
import { IdentityQueryDTO } from '../dtos/IdentityQueryDTO';
import { TelegramDTO } from '../dtos/TelegramDTO';
import { UserService } from '../services/UserService';
import { TelegramGuard } from '../../security/TelegramGuard';
import { RegisterTelegramDTO } from '../dtos/RegisterTelegramDTO';

@ApiTags('Auth')
@Controller({
  version: '2',
  path: '/auth',
})
export class AuthController {
  constructor (
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @ApiBasicAuth()
  @ApiOkResponse({
    type: AuthLoginResponse,
  })
  @ApiUnauthorizedResponse({
    description: `\n
                  UnauthorizedException:
                    The email hasn't verified yet`,
  })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login (@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @UseGuards(TelegramGuard)
  @Post('/registerTelegram')
  async registerTelegram (
    @Body() body: RegisterTelegramDTO,
  ) {
    this.authService.registerTelegram(body);
  }

  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n
                  InvalidBodyException:
                    Group id can not be empty
                    First name is not correct (A-Я(укр.)\\-' ), or too short (min: 2), or too long (max: 40)
                    First name is empty
                    Middle name is not correct (A-Я(укр.)\\-' ), or too short (min: 2), or too long (max: 40)
                    Last name is not correct (A-Я(укр.)\\-' ), or too short (min: 2), or too long (max: 40)
                    Last name is empty
                    Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)
                    Username is empty
                    Email is not an email
                    Email is empty
                    The password must be between 8 and 50 characters long, include at least 1 digit and 1 letter
                    password is empty
                    first_name can not be empty
                    hash can not be empty
                    photo_url can not be empty
                    username can not be empty
                  
                  AlreadyRegisteredException:
                    User is already registered

                  CaptainAlreadyRegisteredException:
                    Captain of this group is already registered`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
                  InvalidTelegramCredentialsException:
                    Your telegram hash is invalid`,
  })
  @ApiTooManyRequestsResponse({
    description: `\n
                  TooManyActionsException:
                    Too many actions. Try later`,
  })
  @Post('/register')
  async register (@Body() body: RegistrationDTO) {
    return this.authService.register(body);
  }

  @ApiOkResponse({
    type: AuthLoginResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
                  InvalidBodyException:
                    first_name can not be empty
                    hash can not be empty
                    photo_url can not be empty
                    username can not be empty`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
                  InvalidTelegramCredentialsException:
                    Your telegram hash is invalid`,
  })
  @Post('/loginTelegram')
  async loginTelegram (@Body() body: TelegramDTO) {
    return this.authService.loginTelegram(body);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: AuthRefreshResponse,
  })
  @UseGuards(JwtGuard)
  @Post('/refresh')
  async refresh (@Request() req) {
    return this.authService.refresh(req.user);
  }

  @UseGuards(JwtGuard)
  @Put('/updatePassword')
  async updatePassword (
    @Body() body: UpdatePasswordDTO,
    @Request() req,
  ) {
    return this.authService.updatePassword(body, req.user);
  }

  @UseGuards(JwtGuard)
  @Get('/me')
  getMe (
    @Request() req,
  ) {
    return this.userService.getUser(req.user.id);
  }

  @Post('/forgotPassword')
  async forgotPassword (
    @Body() body: ForgotPasswordDTO,
  ) {
    return this.authService.forgotPassword(body.email);
  }

  @Post('/resetPassword/:token')
  async resetPassword (
    @Param('token') token: string,
    @Body() body: ResetPasswordDTO,
  ) {
    return this.authService.resetPassword(token, body);
  }

  @Post('/register/verifyEmail')
  requestEmailVerification (
    @Body() body: VerificationEmailDTO,
  ) {
    return this.authService.repeatEmailVerification(body.email);
  }

  @Post('/register/verifyEmail/:token')
  verifyEmail (
    @Param('token') token: string,
  ) {
    return this.authService.verifyEmail(token);
  }

  @Get('/verifyIsRegistered')
  verifyExistsByUnique (
    @Query() query: IdentityQueryDTO,
  ) {
    return this.authService.checkIfUserIsRegistered(query);
  }

  @Get('/checkCaptain/:groupId')
  checkCaptain (
    @Param('groupId') groupId: string,
  ) {
    return this.authService.checkCaptain(groupId);
  }

  @Get('/checkResetToken/:token')
  checkResetToken (
    @Param('token') token: string,
  ) {
    const isAvailable = this.authService.checkResetToken(token);
    return { isAvailable };
  }

  @Get('/checkRegisterTelegram/:token')
  checkRegisterTelegram (
    @Param('token') token: string,
  ) {
    const isRegistered = this.authService.checkTelegram(token);
    return { isRegistered };
  }
}
