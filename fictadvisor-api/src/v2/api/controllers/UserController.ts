import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../services/UserService';
import { TelegramGuard } from '../../security/TelegramGuard';
import { ApproveStudentByTelegramDTO } from '../dtos/ApproveDTO';
import { GiveRoleDTO } from '../dtos/GiveRoleDTO';
import { CreateSuperheroDTO } from '../dtos/CreateSuperheroDTO';
import { UserByIdPipe } from '../pipes/UserByIdPipe';
import { CreateContactDTO } from '../dtos/CreateContactDTO';
import { UpdateContactDTO } from '../dtos/UpdateContactDTO';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';
import { UpdateStudentDTO } from '../dtos/UpdateStudentDTO';
import { ContactByUserIdPipe } from '../pipes/ContactByUserIdPipe';
import { GroupRequestDTO } from '../dtos/GroupRequestDTO';
import { Access } from 'src/v2/security/Access';
import { PERMISSION } from '../../security/PERMISSION';
import { TelegramDTO } from '../dtos/TelegramDTO';
import { UserMapper } from '../../mappers/UserMapper';
import { AvatarValidationPipe } from '../pipes/AvatarValidationPipe';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse, ApiParam,
  ApiPayloadTooLargeResponse,
  ApiTags, ApiUnauthorizedResponse,
  ApiUnsupportedMediaTypeResponse,
} from '@nestjs/swagger';
import { SelectiveBySemestersResponse } from '../responses/SelectiveBySemestersResponse';
import { RemainingSelectiveDTO } from '../dtos/RemainingSelectiveDTO';
import { RemainingSelectiveResponse } from '../responses/RemainingSelectiveResponse';
import { GroupByIdPipe } from '../pipes/GroupByIdPipe';
import { StudentPipe } from '../pipes/StudentPipe';
import { StudentMapper } from '../../mappers/StudentMapper';
import { FullStudentResponse, OrdinaryStudentResponse, StudentsResponse } from '../responses/StudentResponse';
import { FullUserResponse, UserResponse } from '../responses/UserResponse';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { SelectiveDisciplinesPipe } from '../pipes/SelectiveDisciplinesPipe';
import { AttachSelectiveDisciplinesDTO } from '../dtos/AttachSelectiveDisciplinesDTO';
import { UserByTelegramIdPipe } from '../pipes/UserByTelegramIdPipe';
import { ContactResponse, ContactsResponse } from '../responses/ContactResponse';
import { UpdateSuperheroDTO } from '../dtos/UpdateSuperheroDTO';
import { DisciplineIdsResponse } from '../responses/DisciplineResponse';
import { SuperheroResponse } from '../responses/SuperheroResponse';
import { ApiEndpoint } from 'src/v2/utils/documentation/decorators';

@ApiTags('User')
@Controller({
  version: '2',
  path: '/users',
})
export class UserController {
  constructor (
    private userService: UserService,
    private userMapper: UserMapper,
    private studentMapper: StudentMapper,
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: StudentsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      User with such id is not found
      
    InvalidBodyException:
      State is not an enum
      isCaptain must be a boolean

    AlreadyRegisteredException:
      User is already registered
    
    InvalidEntityIdException:
      User with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'Id of a user to verify',
  })
  @ApiEndpoint({
    summary: 'Verify user to be a student',
    guards: TelegramGuard,
  })
  @Patch('/:userId/verifyStudent')
  async verify (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() { state, isCaptain }: ApproveStudentByTelegramDTO,
  ) {
    return this.userService.verifyStudent(userId, isCaptain, state);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: SuperheroResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      User with such id is not found

    InvalidBodyException:
      State is not an enum
      Dorm is not a boolean`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'Id of a superhero to verify',
  })
  @ApiEndpoint({
    summary: 'Verify student to be a superhero',
    guards: TelegramGuard,
  })
  @Patch('/:userId/verifySuperhero')
  verifySuperhero (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: UpdateSuperheroDTO,
  ) {
    return this.userService.updateSuperhero(userId, body);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      User with such id is not found

    AlreadyRegisteredException:
      User is already registered

    InvalidBodyException:
      Group id can not be empty
      IsCaptain must be a boolean
      IsCaptain can not be empty
    
    AbsenceOfCaptainException:
      Captain was not found
    
    AbsenceOfCaptainTelegramException:
      Captain's telegramId was not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action
    
    ForbiddenException:
      Forbidden`,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'Id of a user to request to the group',
  })
  @ApiEndpoint({
    summary: 'Request captain or admin to join the group',
    permissions: PERMISSION.USERS_$USERID_GROUP_REQUEST,
  })
  @Patch('/:userId/requestNewGroup')
  requestNewGroup (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: GroupRequestDTO,
  ) {
    return this.userService.requestNewGroup(userId, body);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: SuperheroResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      User with such id is not found

    InvalidBodyException:
      Dorm is not a boolean`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'Id of a user which is going to be a superhero',
  })
  @ApiEndpoint({
    summary: 'Create a new superhero',
    permissions: PERMISSION.USERS_$USERID_SUPERHERO_CREATE,
  })
  @Post('/:userId/superhero')
  async createSuperhero (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: CreateSuperheroDTO,
  ) {
    const superhero = await this.userService.createSuperhero(userId, body);
    return this.studentMapper.getSuperhero(superhero);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: DisciplineIdsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      User with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'Id of a user',
  })
  @ApiEndpoint({
    summary: 'Get user\'s selective disciplines',
    permissions: PERMISSION.USERS_$USERID_SELECTIVE_GET,
  })
  @Get('/:userId/selective')
  async getSelective (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    const dbDisciplines = await this.userService.getSelective(userId);
    return { disciplines: dbDisciplines.map((d) => d.id) };
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: SelectiveBySemestersResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      User with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'Id of a user',
  })
  @ApiEndpoint({
    summary: 'Get user\'s selective disciplines by semesters',
    permissions: PERMISSION.USERS_$USERID_SELECTIVE_GET,
  })
  @Get('/:userId/selectiveBySemesters')
  async getSelectiveBySemesters (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return { selective: await this.userService.getSelectiveBySemesters(userId) };
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException: 
      Role id cannot be empty
    
    InvalidEntityIdException:
      User with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'Id of a user',
  })
  @ApiEndpoint({
    summary: 'Give role to student',
    guards: TelegramGuard,
  })
  @Post('/:userId/roles')
  giveRole (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() { roleId }: GiveRoleDTO,
  ) {
    return this.userService.giveRole(userId, roleId);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      User with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'Id of a user',
  })
  @ApiParam({
    name: 'roleId',
    required: true,
    description: 'Role of a user',
  })
  @ApiEndpoint({
    summary: 'Remove student\'s role',
    guards: TelegramGuard,
  })
  @Delete('/:userId/roles/:roleId')
  removeRole (
    @Param('userId', UserByIdPipe) userId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.userService.removeRole(userId, roleId);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      User with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'Id of a user',
  })
  @ApiEndpoint({
    summary: 'Remove user',
    permissions: PERMISSION.USERS_DELETE,
  })
  @Delete('/:userId')
  deleteUser (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return this.userService.deleteUser(userId);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException: 
      Username is not correct (a-zA-Z0-9_)
      State is not an enum
      Avatar link is too long (max: 400)
      Email is not an email
      Username is too short (min: 2)
      Username is too long (max: 40)
      Email's format is not right

    InvalidEntityIdException:
      User with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'Id of a user',
  })
  @ApiEndpoint({
    summary: 'Update user',
    permissions: PERMISSION.USERS_UPDATE,
  })
  @Patch('/:userId')
  async updateUser (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: UpdateUserDTO,
  ) {
    const user = await this.userService.updateUser(userId, body);
    return this.userMapper.getUser(user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ContactsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      User with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'Id of a user',
  })
  @ApiEndpoint({
    summary: 'Return user\'s contacts',
    permissions: PERMISSION.USERS_$USERID_CONTACTS_GET,
  })
  @Get('/:userId/contacts')
  async getContacts (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    const contacts = await this.userService.getContacts(userId);
    return { contacts };
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ContactResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      User with such id is not found
      
    InvalidBodyException:
      Name is too long (max: 100)
      Name can not be empty
      Name is not correct (a-zA-Z0-9A-Я(укр.)\\-' )
      Display name is too long (max: 100)
      Display name can not be empty
      Link is too long (max: 200)
      Link contains wrong symbols (ASCII only)
      Link is not a url`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'Id of a user to create contact',
  })
  @ApiEndpoint({
    summary: 'Request captain or admin to create a contact',
    permissions: PERMISSION.USERS_$USERID_CONTACTS_CREATE,
  })
  @Post('/:userId/contacts')
  createContact (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: CreateContactDTO,
  ) {
    return this.userService.createContact(userId, body);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ContactResponse,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      User with such id is not found
      Contact with such id is not found
      
    InvalidBodyException:
      Display name is too long (max: 100)
      Link is too long (max: 200)
      Link contains wrong symbols (ASCII only)
      Link is not a url`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'Id of a user to update contact',
  })
  @ApiParam({
    name: 'contactId',
    type: String,
    description: 'Id of contact to be updated',
  })
  @ApiEndpoint({
    summary: 'Request captain or admin to update the contact',
    permissions: PERMISSION.USERS_$USERID_CONTACTS_UPDATE,
  })
  @Patch('/:userId/contacts/:contactId')
  updateContact (
    @Param(ContactByUserIdPipe) params : { userId: string, contactId: string },
    @Body() body: UpdateContactDTO,
  ) {
    return this.userService.updateContact(params.userId, params.contactId, body);
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
    InvalidEntityIdException:
      User with such id is not found
      Contact with such id is not found`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'Id of a user to delete contact',
  })
  @ApiParam({
    name: 'contactId',
    type: String,
    description: 'Id of a contact to delete',
  })
  @ApiEndpoint({
    summary: 'Request captain or admin to delete the contact',
    permissions: PERMISSION.USERS_$USERID_CONTACTS_DELETE,
  })
  @Delete('/:userId/contacts/:contactId')
  deleteContact (
    @Param(ContactByUserIdPipe) params: { userId: string, contactId: string },
  ) {
    return this.userService.deleteContact(params.userId, params.contactId);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      User with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'Id of a user to delete',
  })
  @ApiEndpoint({
    summary: 'Request captain or admin to delete a student',
    permissions: PERMISSION.STUDENTS_DELETE,
  })
  @Delete('/:userId/student')
  deleteStudent (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return this.userService.deleteStudent(userId);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: OrdinaryStudentResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      User with such id is not found
      
    InvalidBodyException:
      First name is not correct (A-Я(укр.)\\-' )
      First name is too short (min 2)
      First name is too long (max 40)
      Last name is not correct (A-Я(укр.)\\-' )
      Last name is too short (min 2)
      Last name is too long (max 40)
      Middle name is not correct (A-Я(укр.)\\-' )
      Middle name is too long (max 40)`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'Id of a user to update',
  })
  @ApiEndpoint({
    summary: 'Request to update a student',
    permissions: PERMISSION.USERS_$USERID_STUDENT_UPDATE,
  })
  @Patch('/:userId/student')
  updateStudent (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: UpdateStudentDTO,
  ) {
    return this.userService.updateStudent(userId, body);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: OrdinaryStudentResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      User with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'Id of a user to get',
  })
  @ApiEndpoint({
    summary: 'Get user by id',
    guards: TelegramGuard,
  })
  @Get('/:userId/telegram')
  getUserForTelegram (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return this.userService.getUser(userId);
  }

  @ApiBasicAuth()
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiOkResponse({
    type: OrdinaryStudentResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      User with such id is not found`,
  })
  @ApiParam({
    name: 'telegramId',
    type: Number,
  })
  @ApiEndpoint({
    summary: 'Get user',
    guards: TelegramGuard,
  })
  @Get('/telegramUser/:telegramId')
  async getUserByTelegramId (
    @Param('telegramId', UserByTelegramIdPipe) telegramId: bigint,
  ) {
    const student = await this.userService.getUserByTelegramId(telegramId);
    return this.studentMapper.getStudent(student);
  }

  @Access(PERMISSION.USERS_$USERID_TELEGRAM_LINK)
  @Post('/:userId/telegram')
  async linkTelegram (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() telegram: TelegramDTO,
  ) {
    await this.userService.linkTelegram(userId, telegram);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: FullUserResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      User with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'Id of a user',
  })
  @ApiEndpoint({
    summary: 'Return user\'s data',
    permissions: PERMISSION.USERS_$USERID_GET,
  })
  @Get('/:userId')
  getMe (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return this.userService.getUser(userId);
  }

  @Access(PERMISSION.USERS_$USERID_UPDATE)
  @ApiBearerAuth()
  @Patch('/:userId/avatar')
  @ApiImplicitFile({
    name: 'avatar',
    required: true,
  })
  @ApiOkResponse({
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      User with such id is not found
      
    DataNotFoundException: 
      Data were not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiUnsupportedMediaTypeResponse({
    description: `\n
    InvalidExtensionException:
      File extension is wrong`,
  })
  @ApiPayloadTooLargeResponse({
    description: `\n
    TooLargeSizeException:
      The file size exceeds 1 MB`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar (
    @Param('userId', UserByIdPipe) userId: string,
    @UploadedFile(AvatarValidationPipe) file: Express.Multer.File,
  ) {
    const user = await this.userService.updateAvatar(file, userId);
    return this.userMapper.getUser(user);
  }

  @Access(PERMISSION.USERS_$USERID_DELETE)
  @ApiBearerAuth()
  @Delete('/:userId/avatar')
  @ApiOkResponse({
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      User with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  async deleteAvatar (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    const user = await this.userService.deleteAvatar(userId);
    return this.userMapper.getUser(user);
  }

  @Access(PERMISSION.USERS_$USERID_SELECTIVE_GET)
  @Get('/:userId/selectiveDisciplines')
  @ApiOkResponse({
    type: RemainingSelectiveResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidEntityIdException:\n 
                  User with such id is not found`,
  })
  @ApiForbiddenResponse({
    description: `NoPermissionException:\n
                  You do not have permission to perform this action`,
  })
  async getRemainingSelective (
    @Param('userId', UserByIdPipe) userId: string,
    @Query() body: RemainingSelectiveDTO,
  ) {
    return await this.userService.getRemainingSelective(userId, body);
  }

  @Access(PERMISSION.USERS_$USERID_SELECTIVE_DISCIPLINES)
  @ApiBearerAuth()
  @Post(':userId/selectiveDisciplines')
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `Exceptions:\n
                  InvalidEntityIdException: User with such id is not found
                  InvalidEntityIdException: Discipline with such id is not found
                  NotSelectiveException: This discipline is not selective
                  AlreadySelectedException: You have already selected this disciplines
                  NotBelongToGroupException: Discipline does not belong to this group
                  ExcessiveSelectiveDisciplinesException: There are excessive selective disciplines in the request`,
  })
  @ApiForbiddenResponse({
    description: `Exceptions:\n
                  NotApprovedException: Student is not approved
                  NoPermissionException: You do not have permission to perform this action`,
  })
  async attachSelectiveDisciplines (
    @Param('userId', UserByIdPipe, StudentPipe) userId: string,
    @Body(SelectiveDisciplinesPipe) body: AttachSelectiveDisciplinesDTO,
  ) {
    return this.userService.selectDisciplines(userId, body);
  }

  @Access(PERMISSION.USERS_GROUPS_SWITCH)
  @Patch('/:userId/group/:groupId')
  @ApiOkResponse({
    type: FullStudentResponse,
  })
  @ApiBadRequestResponse({
    description: `Exceptions:\n
                  InvalidEntityIdException: User with such id is not found
                  InvalidEntityIdException: Group with such id is not found`,
  })
  @ApiForbiddenResponse({
    description: `Exceptions:\n
                  NotApprovedException: Student is not approved
                  NoPermissionException: You do not have permission to perform this action`,
  })
  async changeGroup (
    @Param('userId', UserByIdPipe, StudentPipe) userId: string,
    @Param('groupId', GroupByIdPipe) groupId: string,
  ) {
    const student = await this.userService.changeGroup(userId, groupId);
    return this.studentMapper.updateStudent(student);
  }
}
