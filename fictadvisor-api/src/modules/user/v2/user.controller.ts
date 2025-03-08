import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import {
  ApproveStudentByTelegramDTO,
  CreateContactDTO,
  UpdateContactDTO,
  UpdateUserDTO,
  UpdateStudentDTO,
  GroupRequestDTO,
  TelegramDTO,
  RemainingSelectivesDTO,
  SelectiveDisciplinesDTO,
  QueryAllUsersDTO,
  CreateUserDTO, GiveRoleDTO,
} from '@fictadvisor/utils/requests';
import { PERMISSION } from '@fictadvisor/utils/security';
import { ApiEndpoint } from '../../../common/decorators/api-endpoint.decorator';
import { TelegramGuard } from '../../../common/guards/telegram/telegram.guard';
import { UserByIdPipe } from '../../../common/pipes/user-by-id.pipe';
import { ContactByUserIdPipe } from '../../../common/pipes/contact-by-user-id.pipe';
import { AvatarValidationPipe } from '../../../common/pipes/avatar-validation.pipe';
import { GroupByIdPipe } from '../../../common/pipes/group-by-id.pipe';
import { ApprovedStudentPipe } from '../../../common/pipes/approved-student.pipe';
import { SelectiveDisciplinesPipe } from '../../../common/pipes/selective-disciplines.pipe';
import { UserByTelegramIdPipe } from '../../../common/pipes/user-by-telegram-id.pipe';
import { UserService } from './user.service';
import { StudentByIdPipe } from '../../../common/pipes/student-by-id.pipe';
import { UserDocumentation } from '../../../common/documentation/modules/v2/user';
import { RoleByIdPipe } from '../../../common/pipes/role-by-id.pipe';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { DbUser } from '../../../database/v2/entities/user.entity';
import {
  ContactResponse,
  ContactsResponse, DisciplineIdsResponse,
  FullStudentResponse,
  OrdinaryStudentResponse,
  RemainingSelectivesResponse, SelectivesBySemestersResponse, UserForGetAllResponse, UserResponse, UsersResponse } from '@fictadvisor/utils';
import { DbStudent } from '../../../database/v2/entities/student.entity';

@ApiTags('User')
@Controller({
  version: '2',
  path: '/users',
})
export class UserController {
  constructor (
    private userService: UserService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  @ApiEndpoint({
    summary: 'Create a new user by admin',
    documentation: UserDocumentation.CREATE_USER,
    permissions: PERMISSION.USERS_CREATE,
  })
  @Post()
  async createUser (@Body() body: CreateUserDTO): Promise<UserResponse> {
    const user = await this.userService.createUserByAdmin(body);
    return this.mapper.map(user, DbUser, UserResponse);
  }

  @ApiEndpoint({
    summary: 'Verify user to be a student',
    documentation: UserDocumentation.VERIFY,
    guards: TelegramGuard,
  })
  @Patch('/:userId/verifyStudent')
  async verify (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() { state, isCaptain }: ApproveStudentByTelegramDTO,
  ): Promise<FullStudentResponse> {
    const student = await this.userService.verifyStudent(userId, isCaptain, state);
    return this.mapper.map(student, DbStudent, FullStudentResponse);
  }

  @ApiEndpoint({
    summary: 'Request captain or admin to join the group',
    documentation: UserDocumentation.REQUEST_NEW_GROUP,
    permissions: PERMISSION.USERS_$USERID_GROUP_REQUEST,
  })
  @Patch('/:userId/requestNewGroup')
  requestNewGroup (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: GroupRequestDTO,
  ): Promise<void> {
    return this.userService.requestNewGroup(userId, body);
  }

  @ApiEndpoint({
    summary: 'Get user\'s selective disciplines',
    documentation: UserDocumentation.GET_SELECTIVE_DISCIPLINES,
    permissions: PERMISSION.USERS_$USERID_SELECTIVE_GET,
  })
  @Get('/:userId/selectiveDisciplines')
  async getSelectiveDisciplines (
    @Param('userId', UserByIdPipe) userId: string,
  ): Promise<DisciplineIdsResponse> {
    const dbDisciplines = await this.userService.getSelectiveDisciplines(userId);
    return { disciplines: dbDisciplines.map((d) => d.id) };
  }

  @ApiEndpoint({
    summary: 'Get user\'s selective disciplines by semesters',
    documentation: UserDocumentation.GET_SELECTIVES_BY_SEMESTERS,
    permissions: PERMISSION.USERS_$USERID_SELECTIVE_GET,
  })
  @Get('/:userId/selectiveBySemesters')
  async getSelectivesBySemesters (
    @Param('userId', UserByIdPipe) userId: string,
  ): Promise<SelectivesBySemestersResponse> {
    return this.userService.getSelectivesBySemesters(userId);
  }

  @ApiEndpoint({
    summary: 'Give role to student',
    documentation: UserDocumentation.GIVE_ROLE,
    guards: TelegramGuard,
  })
  @Patch('/:userId/roles')
  async giveRole (
    @Param('userId', UserByIdPipe) userId: string,
    @Body('roleId', RoleByIdPipe) roleId: string,
    @Body() body: GiveRoleDTO,
  ): Promise<void> {
    return this.userService.giveRole(userId, roleId);
  }

  @ApiEndpoint({
    summary: 'Remove student\'s role',
    documentation: UserDocumentation.REMOVE_ROLE,
    guards: TelegramGuard,
  })
  @Delete('/:userId/roles/:roleId')
  removeRole (
    @Param('userId', UserByIdPipe) userId: string,
    @Param('roleId', RoleByIdPipe) roleId: string,
  ): Promise<void> {
    return this.userService.removeRole(userId, roleId);
  }

  @ApiEndpoint({
    summary: 'Get all users for admin',
    documentation: UserDocumentation.GET_ALL,
    permissions: PERMISSION.USERS_GET,
  })
  @Get()
  async getAll (
    @Query() query: QueryAllUsersDTO,
  ): Promise<UsersResponse> {
    const users = await this.userService.getAll(query);
    const data = this.mapper.mapArray(users.data, DbUser, UserForGetAllResponse);

    return {
      data,
      pagination: users.pagination,
    };
  }

  @ApiEndpoint({
    summary: 'Remove user',
    documentation: UserDocumentation.DELETE_USER,
    permissions: PERMISSION.USERS_DELETE,
  })
  @Delete('/:userId')
  deleteUser (
    @Param('userId', UserByIdPipe) userId: string,
  ): Promise<void> {
    return this.userService.deleteUser(userId);
  }

  @ApiEndpoint({
    summary: 'Update user',
    documentation: UserDocumentation.UPDATE_USER,
    permissions: PERMISSION.USERS_UPDATE,
  })
  @Patch('/:userId')
  async updateUser (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: UpdateUserDTO,
  ): Promise<UserResponse> {
    const user = await this.userService.updateUser(userId, body);
    return this.mapper.map(user, DbUser, UserResponse);
  }

  @ApiEndpoint({
    summary: 'Return user\'s contacts',
    documentation: UserDocumentation.GET_CONTACTS,
    permissions: PERMISSION.USERS_$USERID_CONTACTS_GET,
  })
  @Get('/:userId/contacts')
  async getContacts (
    @Param('userId', UserByIdPipe) userId: string,
  ): Promise<ContactsResponse> {
    const contacts = await this.userService.getContacts(userId);
    return { contacts };
  }

  @ApiEndpoint({
    summary: 'Create contact for a user',
    documentation: UserDocumentation.CREATE_CONTACT,
    permissions: PERMISSION.USERS_$USERID_CONTACTS_CREATE,
  })
  @Post('/:userId/contacts')
  createContact (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: CreateContactDTO,
  ): Promise<ContactResponse> {
    return this.userService.createContact(userId, body);
  }

  @ApiEndpoint({
    summary: 'Update user\'s contact by contact\'s id',
    documentation: UserDocumentation.UPDATE_CONTACT,
    permissions: PERMISSION.USERS_$USERID_CONTACTS_UPDATE,
  })
  @Patch('/:userId/contacts/:contactId')
  updateContact (
    @Param(ContactByUserIdPipe) params : { contactId: string },
    @Body() body: UpdateContactDTO,
  ): Promise<ContactResponse> {
    return this.userService.updateContact(params.contactId, body);
  }

  @ApiEndpoint({
    summary: 'Delete user\'s contact by contact\'s id',
    documentation: UserDocumentation.DELETE_CONTACT,
    permissions: PERMISSION.USERS_$USERID_CONTACTS_DELETE,
  })
  @Delete('/:userId/contacts/:contactId')
  deleteContact (
    @Param(ContactByUserIdPipe) params: { contactId: string },
  ): Promise<void> {
    return this.userService.deleteContact(params.contactId);
  }

  @ApiEndpoint({
    summary: 'Update student by user\'s id',
    documentation: UserDocumentation.UPDATE_STUDENT,
    permissions: PERMISSION.USERS_$USERID_STUDENT_UPDATE,
  })
  @Patch('/:userId/student')
  async updateStudent (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: UpdateStudentDTO,
  ): Promise<FullStudentResponse> {
    const student = await this.userService.updateStudent(userId, body);
    return this.mapper.map(student, DbStudent, FullStudentResponse);
  }

  @ApiEndpoint({
    summary: 'Get user by id',
    documentation: UserDocumentation.GET_USER_FOR_TELEGRAM,
    guards: TelegramGuard,
  })
  @Get('/:userId/telegram')
  getUserForTelegram (
    @Param('userId', UserByIdPipe) userId: string,
  ): Promise<OrdinaryStudentResponse> {
    return this.userService.getUser(userId);
  }

  @ApiEndpoint({
    summary: 'Get user',
    documentation: UserDocumentation.GET_USER_BY_TELEGRAM_ID,
    guards: TelegramGuard,
  })
  @Get('/telegramUser/:telegramId')
  async getUserByTelegramId (
    @Param('telegramId', UserByTelegramIdPipe) telegramId: bigint,
  ): Promise<OrdinaryStudentResponse> {
    const student = await this.userService.getUserByTelegramId(telegramId);
    return this.mapper.map(student, DbStudent, OrdinaryStudentResponse);
  }

  @ApiEndpoint({
    summary: 'Adds user\'s telegram',
    documentation: UserDocumentation.LINK_TELEGRAM,
    permissions: PERMISSION.USERS_$USERID_TELEGRAM_LINK,
  })
  @Post('/:userId/telegram')
  async linkTelegram (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() telegram: TelegramDTO,
  ): Promise<void> {
    await this.userService.linkTelegram(userId, telegram);
  }

  @ApiEndpoint({
    summary: 'Return user\'s data',
    documentation: UserDocumentation.GET_ME,
    permissions: PERMISSION.USERS_$USERID_GET,
  })
  @Get('/:userId')
  async getMe (
    @Param('userId', UserByIdPipe) userId: string,
  ): Promise<UserResponse> {
    const user = await this.userService.getSimplifiedUser(userId);
    return this.mapper.map(user, DbUser, UserResponse);
  }

  @ApiEndpoint({
    summary: 'Uploads user\'s avatar',
    documentation: UserDocumentation.UPLOAD_AVATAR,
    permissions: PERMISSION.USERS_$USERID_UPDATE,
  })
  @UseInterceptors(FileInterceptor('avatar'))
  @Patch('/:userId/avatar')
  async uploadAvatar (
    @Param('userId', UserByIdPipe) userId: string,
    @UploadedFile(AvatarValidationPipe) file: Express.Multer.File,
  ): Promise<UserResponse> {
    const user = await this.userService.updateAvatar(file, userId);
    return this.mapper.map(user, DbUser, UserResponse);
  }

  @ApiEndpoint({
    summary: 'Deletes user\'s avatar',
    documentation: UserDocumentation.DELETE_AVATAR,
    permissions: PERMISSION.USERS_$USERID_DELETE,
  })
  @Delete('/:userId/avatar')
  async deleteAvatar (
    @Param('userId', UserByIdPipe) userId: string,
  ): Promise<UserResponse> {
    const user = await this.userService.deleteAvatar(userId);
    return this.mapper.map(user, DbUser, UserResponse);
  }

  @ApiEndpoint({
    summary: 'Get all selective disciplines available to the user from the whole list',
    documentation: UserDocumentation.GET_REMAINING_SELECTIVES,
    permissions: PERMISSION.USERS_$USERID_SELECTIVE_GET,
  })
  @Get('/:userId/remainingSelectives')
  getRemainingSelectives (
    @Param('userId', UserByIdPipe) userId: string,
    @Query() query: RemainingSelectivesDTO,
  ): Promise<RemainingSelectivesResponse | object> {
    return this.userService.getRemainingSelectivesForSemester(userId, query);
  }

  @ApiEndpoint({
    summary: 'Attach selective disciplines to the student',
    documentation: UserDocumentation.ATTACH_SELECTIVE_DISCIPLINES,
    permissions: PERMISSION.USERS_$USERID_SELECTIVE_DISCIPLINES,
  })
  @Post(':userId/selectiveDisciplines')
  async attachSelectiveDisciplines (
    @Param('userId', StudentByIdPipe, ApprovedStudentPipe) userId: string,
    @Body(SelectiveDisciplinesPipe) body: SelectiveDisciplinesDTO,
  ): Promise<void> {
    return this.userService.selectDisciplines(userId, body);
  }

  @ApiEndpoint({
    summary: 'Detach selective disciplines from the student',
    documentation: UserDocumentation.DETACH_SELECTIVE_DISCIPLINES,
    permissions: PERMISSION.USERS_$USERID_SELECTIVE_DISCIPLINES,
  })
  @Delete(':userId/selectiveDisciplines')
  async detachSelectiveDisciplines (
    @Param('userId', UserByIdPipe, ApprovedStudentPipe) userId: string,
    @Body(SelectiveDisciplinesPipe) body: SelectiveDisciplinesDTO,
  ): Promise<void> {
    return this.userService.deselectDisciplines(userId, body);
  }

  @ApiEndpoint({
    summary: 'Changes user\'s group',
    documentation: UserDocumentation.CHANGE_GROUP,
    permissions: PERMISSION.USERS_GROUPS_SWITCH,
  })
  @Patch('/:userId/group/:groupId')
  async changeGroup (
    @Param('userId', UserByIdPipe, ApprovedStudentPipe) userId: string,
    @Param('groupId', GroupByIdPipe) groupId: string,
  ): Promise<FullStudentResponse> {
    const student = await this.userService.changeGroup(userId, groupId);
    return this.mapper.map(student, DbStudent, FullStudentResponse);
  }
}
