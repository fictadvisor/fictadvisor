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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../services/UserService';
import { TelegramGuard } from '../../security/TelegramGuard';
import { ApproveDTO, ApproveStudentByTelegramDTO } from '../dtos/ApproveDTO';
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
import { TelegramDTO } from '../dtos/TelegramDTO';
import { UserMapper } from '../../mappers/UserMapper';
import { AvatarValidationPipe } from '../pipes/AvatarValidationPipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransferRoleDto } from '../dtos/TransferRoleDto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse, ApiPayloadTooLargeResponse,
  ApiTags,
  ApiUnsupportedMediaTypeResponse,
} from '@nestjs/swagger';
import { SelectiveBySemestersResponse } from '../responses/SelectiveBySemestersResponse';
import { RemainingSelectiveDTO } from '../dtos/RemainingSelectiveDTO';
import { RemainingSelectiveResponse } from '../responses/RemainingSelectiveResponse';
import { GroupByIdPipe } from '../pipes/GroupByIdPipe';
import { StudentPipe } from '../pipes/StudentPipe';
import { StudentMapper } from '../../mappers/StudentMapper';
import { StudentResponse } from '../responses/StudentResponse';
import { UserResponse } from '../responses/UserResponse';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { SelectiveDisciplinesPipe } from '../pipes/SelectiveDisciplinesPipe';
import { AttachSelectiveDisciplinesDTO } from '../dtos/AttachSelectiveDisciplinesDTO';


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
  ) {
  }

  @UseGuards(TelegramGuard)
  @Patch('/:userId/verifyStudent')
  async verify (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() { state, isCaptain }: ApproveStudentByTelegramDTO,
  ) {
    return this.userService.verifyStudent(userId, isCaptain, state);
  }

  @UseGuards(TelegramGuard)
  @Patch('/:userId/verifySuperhero')
  verifySuperhero (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: ApproveDTO,
  ) {
    return this.userService.updateSuperhero(userId, body);
  }

  @Access('users.$userId.group.request')
  @Patch('/:userId/requestNewGroup')
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `Exceptions:\n
                  InvalidEntityIdException: User with such id is not found
                  AlreadyRegisteredException: User is already registered
                  InvalidBodyException: Group id can not be empty
                  InvalidBodyException: IsCaptain must be a boolean
                  InvalidBodyException: IsCaptain can not be empty`,
  })
  @ApiForbiddenResponse({
    description: `NoPermissionException:\n
                  You do not have permission to perform this action`,
  })
  requestNewGroup (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: GroupRequestDTO,
  ) {
    return this.userService.requestNewGroup(userId, body);
  }

  @Access('users.$userId.superhero.create')
  @Post('/:userId/superhero')
  async createSuperhero (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: CreateSuperheroDTO,
  ) {
    return this.userService.createSuperhero(userId, body);
  }

  @Access('users.$userId.selective.get')
  @Get('/:userId/selective')
  async getSelective (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    const dbDisciplines = await this.userService.getSelective(userId);
    return { disciplines: dbDisciplines.map((d) => d.id) };
  }

  @Access('users.$userId.selective.get')
  @Get('/:userId/selectiveBySemesters')
  @ApiOkResponse({
    type: SelectiveBySemestersResponse,
  })
  @ApiBadRequestResponse({
    description: `InvalidEntityIdException:\n 
                  User with such id is not found`,
  })
  @ApiForbiddenResponse({
    description: `NoPermissionException:\n
                  You do not have permission to perform this action`,
  })
  async getSelectiveBySemesters (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return { selective: await this.userService.getSelectiveBySemesters(userId) };
  }

  @UseGuards()
  @Post('/:userId/roles')
  giveRole (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() { roleId }: GiveRoleDTO,
  ) {
    return this.userService.giveRole(userId, roleId);
  }

  @Delete('/:userId/roles/:roleId')
  removeRole (
    @Param('userId', UserByIdPipe) userId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.userService.removeRole(userId, roleId);
  }

  @Access('users.delete')
  @Delete('/:userId')
  deleteUser (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return this.userService.deleteUser(userId);
  }

  @Access('users.update')
  @Patch('/:userId')
  async updateUser (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: UpdateUserDTO,
  ) {
    const user = await this.userService.updateUser(userId, body);
    return this.userMapper.updateUser(user);
  }

  @Access('users.$userId.contacts.get')
  @Get('/:userId/contacts')
  async getContacts (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    const contacts = await this.userService.getContacts(userId);
    return { contacts };
  }

  @Access('users.$userId.contacts.create')
  @Post('/:userId/contacts')
  createContact (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: CreateContactDTO,
  ) {
    return this.userService.createContact(userId, body);
  }

  @Access('users.$userId.contacts.update')
  @Patch('/:userId/contacts/:name')
  updateContact (
    @Param(ContactByUserIdPipe) params,
    @Body() body: UpdateContactDTO,
  ) {
    return this.userService.updateContact(params.userId, params.name, body);
  }

  @Access('users.$userId.contacts.delete')
  @Delete('/:userId/contacts/:name')
  deleteContact (
    @Param(ContactByUserIdPipe) params,
  ) {
    return this.userService.deleteContact(params.userId, params.name);
  }

  @Access('students.delete')
  @Delete('/:userId/student')
  deleteStudent (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return this.userService.deleteStudent(userId);
  }

  @Access('users.$userId.student.update')
  @Patch('/:userId/student')
  updateStudent (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: UpdateStudentDTO,
  ) {
    return this.userService.updateStudent(userId, body);
  }

  @UseGuards(TelegramGuard)
  @Get('/:userId/telegram')
  getUserForTelegram (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return this.userService.getUser(userId);
  }

  @Access('users.$userId.telegram.link')
  @Post('/:userId/telegram')
  async linkTelegram (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() telegram: TelegramDTO,
  ) {
    await this.userService.linkTelegram(userId, telegram);
  }

  @Access('users.$userId.get')
  @Get('/:userId')
  getMe (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return this.userService.getUser(userId);
  }

  @Access('users.$userId.update')
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
                  InvalidEntityIdException: User with such id is not found\n
                  DataNotFoundException: Data was not found`,
  })
  @ApiUnsupportedMediaTypeResponse({
    description: `InvalidExtensionException:\n
                  File extension is wrong`,
  })
  @ApiPayloadTooLargeResponse({
    description: `TooLargeSizeException:\n
                  The file size exceeds 1.5 MB`,
  })
  @ApiForbiddenResponse({
    description: `NoPermissionException:\n
                  You do not have permission to perform this action`,
  })
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar (
    @Param('userId', UserByIdPipe) userId: string,
    @UploadedFile(AvatarValidationPipe) file: Express.Multer.File,
  ) {
    const user = await this.userService.updateAvatar(file, userId);
    return this.userMapper.updateUser(user);
  }


  @Access('users.$userId.selective.get')
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

  @Access('users.$userId.selectiveDisciplines')
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

  @Access('admin.switch')
  @Patch('/:userId/group/:groupId')
  @ApiOkResponse({
    type: StudentResponse,
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

  @Access('users.$groupId.transfer')
  @Post('/:studentId/transfer')
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `
                  InvalidEntityIdException: User with such id is not found
                  InvalidBodyException: User id should not be empty
                  InvalidBodyException: User id should be a string`,
  })
  @ApiForbiddenResponse({
    description: `
                  NotApprovedException: Student is not approved
                  NoPermissionException: You do not have permission to perform this action`,
  })
  async transferRole (
    @Param('studentId', UserByIdPipe, StudentPipe) studentId: string,
    @Body() { captainUserId }: TransferRoleDto,
  ) {
    await this.userService.transferRole(captainUserId, studentId);
  }
}
