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
import { ApiEndpoint } from '../../../common/decorators/ApiEndpoint';
import { TelegramGuard } from '../../../common/guards/telegram/TelegramGuard';
import { UserByIdPipe } from '../../../common/pipes/UserByIdPipe';
import { ContactByUserIdPipe } from '../../../common/pipes/ContactByUserIdPipe';
import { AvatarValidationPipe } from '../../../common/pipes/AvatarValidationPipe';
import { GroupByIdPipe } from '../../../common/pipes/GroupByIdPipe';
import { ApprovedStudentPipe } from '../../../common/pipes/ApprovedStudentPipe';
import { SelectiveDisciplinesPipe } from '../../../common/pipes/SelectiveDisciplinesPipe';
import { UserByTelegramIdPipe } from '../../../common/pipes/UserByTelegramIdPipe';
import { UserMapper } from '../../../common/mappers/UserMapper';
import { StudentMapper } from '../../../common/mappers/StudentMapper';
import { UserService } from './UserService';
import { StudentByIdPipe } from '../../../common/pipes/StudentByIdPipe';
import { UserDocumentation } from '../../../common/documentation/modules/v2/user';
import { RoleByIdPipe } from '../../../common/pipes/RoleByIdPipe';

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

  @ApiEndpoint({
    summary: 'Create a new user by admin',
    documentation: UserDocumentation.CREATE_USER,
    permissions: PERMISSION.USERS_CREATE,
  })
  @Post()
  async createUser (@Body() body: CreateUserDTO) {
    const user = await this.userService.createUserByAdmin(body);
    return this.userMapper.getUser(user);
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
  ) {
    return this.userService.verifyStudent(userId, isCaptain, state);
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
  ) {
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
  ) {
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
  ) {
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
  ) {
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
  ) {
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
  ) {
    const users = await this.userService.getAll(query);
    const data = this.userMapper.getAll(users.data);
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
  ) {
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
  ) {
    const user = await this.userService.updateUser(userId, body);
    return this.userMapper.getUser(user);
  }

  @ApiEndpoint({
    summary: 'Return user\'s contacts',
    documentation: UserDocumentation.GET_CONTACTS,
    permissions: PERMISSION.USERS_$USERID_CONTACTS_GET,
  })
  @Get('/:userId/contacts')
  async getContacts (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
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
  ) {
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
  ) {
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
  ) {
    return this.userService.deleteContact(params.contactId);
  }

  @ApiEndpoint({
    summary: 'Update student by user\'s id',
    documentation: UserDocumentation.UPDATE_STUDENT,
    permissions: PERMISSION.USERS_$USERID_STUDENT_UPDATE,
  })
  @Patch('/:userId/student')
  updateStudent (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: UpdateStudentDTO,
  ) {
    return this.userService.updateStudent(userId, body);
  }

  @ApiEndpoint({
    summary: 'Get user by id',
    documentation: UserDocumentation.GET_USER_FOR_TELEGRAM,
    guards: TelegramGuard,
  })
  @Get('/:userId/telegram')
  getUserForTelegram (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
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
  ) {
    const student = await this.userService.getUserByTelegramId(telegramId);
    return this.studentMapper.getOrdinaryStudent(student);
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
  ) {
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
  ) {
    const user = await this.userService.getSimplifiedUser(userId);
    return this.userMapper.getUser(user);
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
  ) {
    const user = await this.userService.updateAvatar(file, userId);
    return this.userMapper.getUser(user);
  }

  @ApiEndpoint({
    summary: 'Deletes user\'s avatar',
    documentation: UserDocumentation.DELETE_AVATAR,
    permissions: PERMISSION.USERS_$USERID_DELETE,
  })
  @Delete('/:userId/avatar')
  async deleteAvatar (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    const user = await this.userService.deleteAvatar(userId);
    return this.userMapper.getUser(user);
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
  ) {
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
  ) {
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
  ) {
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
  ) {
    const student = await this.userService.changeGroup(userId, groupId);
    return this.studentMapper.updateStudent(student);
  }
}
