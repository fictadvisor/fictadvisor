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
  ApiBearerAuth,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiTooManyRequestsResponse,
  ApiParam,
  ApiBody,
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
import { OrdinaryStudentResponse } from '../responses/StudentResponse';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { JWTTokensResponse } from '../responses/JWTTokensResponse';
import { GroupByIdPipe } from '../pipes/GroupByIdPipe';
import { IsAvailableResponse, IsRegisteredResponse } from '../responses/TokenResponse';
import { LoginDTO } from '../dtos/LoginDTO';

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

  @ApiBearerAuth()
  @ApiOkResponse({
    type: AuthLoginResponse,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized
    UnauthorizedException:
      The email hasn't verified yet`,
  })
  @ApiBody({
    type: LoginDTO,
  })
  @ApiEndpoint({
    summary: 'Login to the user account',
    guards: LocalAuthGuard,
  })
  @Post('/login')
  async login (@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Token cannot be empty
      Telegram id cannot be empty`,
  })
  @ApiEndpoint({
    summary: 'Register user\'s telegram account',
    guards: TelegramGuard,
  })
  @Post('/registerTelegram')
  async registerTelegram (
    @Body() body: RegisterTelegramDTO,
  ) {
    return this.authService.registerTelegram(body);
  }

  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Group id cannot be empty
      First name is not correct (A-Я(укр.)\\-' ), or too short (min: 2), or too long (max: 40)
      First name cannot be empty
      Middle name is not correct (A-Я(укр.)\\-' ), or too long (max: 40)
      Last name is not correct (A-Я(укр.)\\-' ), or too short (min: 2), or too long (max: 40)
      Last name cannot be empty
      isCaptain must be a boolean
      isCaptain cannot be empty
      Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)
      Username cannot be empty
      Email is not an email
      Email cannot be empty
      The password must be between 8 and 50 characters long, include at least 1 digit and 1 letter
      Password cannot be empty
      Auth date must be a number
      First name cannot be empty
      Hash cannot be empty
      Telegram id must be a bigint
      Username cannot be empty
                  
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
  @ApiEndpoint({
    summary: 'Register new user',
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
      Auth date must be a number
      First name cannot be empty
      Hash cannot be empty
      Telegram id must be a bigint
      Username cannot be empty
      
    InvalidEntityIdException
      User with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    InvalidTelegramCredentialsException:
      Your telegram hash is invalid`,
  })
  @ApiEndpoint({
    summary: 'Login with Telegram',
  })
  @Post('/loginTelegram')
  async loginTelegram (@Body() body: TelegramDTO) {
    return this.authService.loginTelegram(body);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: AuthRefreshResponse,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiEndpoint({
    summary: 'Refresh access token',
    guards: JwtGuard,
  })
  @Post('/refresh')
  async refresh (@Request() req) {
    return this.authService.refresh(req.user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: AuthLoginResponse,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorisedException:
      Unauthorized
      The password is incorrect`,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      User with such id is not found
      
    InvalidBodyException:
      The password must be between 8 and 50 characters long, include at least 1 digit and 1 letter
      Old password cannot be empty
      New password cannot be empty

    PasswordRepeatException:
      The passwords are the same`,
  })
  @ApiEndpoint({
    summary: 'Change old password',
    guards: JwtGuard,
  })
  @Put('/updatePassword')
  async updatePassword (
    @Body() body: UpdatePasswordDTO,
    @Request() req,
  ) {
    return this.authService.updatePassword(body, req.user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: OrdinaryStudentResponse,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorisedException:
      Unauthorized`,
  })
  @UseGuards(JwtGuard)
  @ApiEndpoint({
    summary: 'Get information about the current user based on JWT authorization',
  })
  @Get('/me')
  getMe (
    @Request() req,
  ) {
    return this.userService.getUser(req.user.id);
  }

  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n
    NotRegisteredException:
      This email is not registered yet
      
    InvalidBodyException:
      Email is not an email
      Email is empty`,
  })
  @ApiTooManyRequestsResponse({
    description: `\n
    TooManyActionsException:
      Too many actions. Try later`,
  })
  @ApiEndpoint({
    summary: 'Request a password reset procedure based on the email address provided',
  })
  @Post('/forgotPassword')
  async forgotPassword (
    @Body() body: ForgotPasswordDTO,
  ) {
    return this.authService.forgotPassword(body.email);
  }

  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n
    InvalidResetTokenException:
      Reset token is expired or invalid
     
    InvalidBodyException:
      The password must be between 8 and 50 characters long, include at least 1 digit and 1 letter
      Password is empty`,
  })
  @ApiParam({
    name: 'token',
    required: true,
    description: 'A password reset token that is generated and sent to the user\'s email address.',
  })
  @ApiEndpoint({
    summary: 'Set a new password using a valid password reset token',
  })
  @Post('/resetPassword/:token')
  async resetPassword (
    @Param('token') token: string,
    @Body() body: ResetPasswordDTO,
  ) {
    return this.authService.resetPassword(token, body);
  }

  @ApiOkResponse()
  @ApiTooManyRequestsResponse({
    description: `\n
    TooManyActionsException:
      Too many actions. Try later`,
  })
  @ApiBadRequestResponse({
    description: `\n
    NotRegisteredException:
      This email is not registered yet
    
    InvalidBodyException:
      Email is not email
      Email is empty`,
  })
  @ApiEndpoint({
    summary: 'Resend the email confirmation request for a user who has not completed the registration process yet',
  })
  @Post('/register/verifyEmail')
  requestEmailVerification (
    @Body() body: VerificationEmailDTO,
  ) {
    return this.authService.repeatEmailVerification(body.email);
  }

  @ApiOkResponse({
    type: JWTTokensResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidVerificationTokenException:
      Verification token is expired or invalid`,
  })
  @ApiParam({
    name: 'token',
    required: true,
    description: 'A verification token that is generated and sent to the user\'s email address.',
  })
  @ApiEndpoint({
    summary: 'Verify the user\'s email address during the completion of registration in the system using token',
  })
  @Post('/register/verifyEmail/:token')
  verifyEmail (
    @Param('token') token: string,
  ) {
    return this.authService.verifyEmail(token);
  }

  @ApiOkResponse({
    type: Boolean,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)
      Username is empty
      Email is not an email
      Email is empty`,
  })
  @ApiEndpoint({
    summary: 'Check whether the user is registered in the system by email and/or username',
  })
  @Get('/verifyIsRegistered')
  verifyExistsByUnique (
    @Query() query: IdentityQueryDTO,
  ) {
    return this.authService.checkIfUserIsRegistered(query);
  }

  @ApiOkResponse({
    type: Boolean,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Group with such id is not found`,
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: 'Id of the group for which the check',
  })
  @ApiEndpoint({
    summary: 'Check if the group has a captain',
  })
  @Get('/checkCaptain/:groupId')
  checkCaptain (
    @Param('groupId', GroupByIdPipe) groupId: string,
  ): Promise<boolean> {
    return this.authService.checkCaptain(groupId);
  }

  @ApiOkResponse({
    type: IsAvailableResponse,
  })
  @ApiParam({
    name: 'token',
    required: true,
    description: 'The reset token to be checked for availability',
  })
  @ApiEndpoint({
    summary: 'Check if reset token is available',
  })
  @Get('/checkResetToken/:token')
  async checkResetToken (
    @Param('token') token: string,
  ): Promise<IsAvailableResponse> {
    const isAvailable = !!(await this.authService.checkResetToken(token));
    return { isAvailable };
  }

  @ApiOkResponse({
    type: IsRegisteredResponse,
  })
  @ApiParam({
    name: 'token',
    required: true,
    description: 'The token used to check the Telegram registration status',
  })
  @ApiEndpoint({
    summary: 'Check telegram registration status by a token',
  })
  @Get('/checkRegisterTelegram/:token')
  async checkRegisterTelegram (
    @Param('token') token: string,
  ): Promise<IsRegisteredResponse> {
    const isRegistered = !!(await this.authService.checkTelegram(token));
    return { isRegistered };
  }
}
